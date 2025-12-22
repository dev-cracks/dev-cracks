import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import L from 'leaflet';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Input,
  Field,
  Spinner,
  MessageBar,
  MessageBarBody,
  Combobox,
  Option,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { geocodeAddress, reverseGeocode, searchAddresses, AddressSuggestion } from '../services/geocodingService';
import '../styles/leaflet.css';

// Fix para iconos de Leaflet en React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface OfficeLocationMapProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (latitude: number | null, longitude: number | null, fullAddress: string | null) => Promise<void>;
  initialLatitude?: number | null;
  initialLongitude?: number | null;
  initialFullAddress?: string | null;
  officeName?: string;
}

const useStyles = makeStyles({
  mapContainer: {
    height: '400px',
    width: '100%',
    marginTop: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
  },
  coordinatesContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: tokens.spacingVerticalXXL,
  },
});

// Componente para manejar clics en el mapa
function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export const OfficeLocationMap = ({
  isOpen,
  onClose,
  onSave,
  initialLatitude,
  initialLongitude,
  initialFullAddress,
  officeName,
}: OfficeLocationMapProps) => {
  const styles = useStyles();
  
  const [latitude, setLatitude] = useState<number | null>(initialLatitude ?? null);
  const [longitude, setLongitude] = useState<number | null>(initialLongitude ?? null);
  const [fullAddress, setFullAddress] = useState<string>(initialFullAddress ?? '');
  const [addressSearch, setAddressSearch] = useState<string>('');
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isSearchingAddresses, setIsSearchingAddresses] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Inicializar con coordenadas por defecto si no hay iniciales (Madrid, España)
  const defaultCenter: [number, number] = latitude && longitude 
    ? [latitude, longitude] 
    : [40.4168, -3.7038];

  // Resetear estado cuando se abre/cierra el diálogo
  useEffect(() => {
    if (isOpen) {
      setLatitude(initialLatitude ?? null);
      setLongitude(initialLongitude ?? null);
      setFullAddress(initialFullAddress ?? '');
      // Inicializar el campo de búsqueda con la dirección completa si existe
      setAddressSearch(initialFullAddress ?? '');
      setAddressSuggestions([]);
      setError(null);
    }
  }, [isOpen, initialLatitude, initialLongitude, initialFullAddress]);

  // Buscar direcciones cuando el usuario escribe
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (addressSearch.trim().length < 3) {
      setAddressSuggestions([]);
      return;
    }

    // Reducir el tiempo de debounce para mejor respuesta
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearchingAddresses(true);
      try {
        const suggestions = await searchAddresses(addressSearch);
        setAddressSuggestions(suggestions);
      } catch (err) {
        console.error('[OfficeLocationMap] Error buscando direcciones:', err);
        setAddressSuggestions([]);
      } finally {
        setIsSearchingAddresses(false);
      }
    }, 300); // Reducido de 500ms a 300ms para mejor respuesta

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [addressSearch]);

  // Actualizar mapa cuando cambian las coordenadas
  useEffect(() => {
    if (mapRef.current && latitude !== null && longitude !== null) {
      mapRef.current.setView([latitude, longitude], 15);
    }
  }, [latitude, longitude]);

  const handleAddressSelect = useCallback(async (suggestion: AddressSuggestion) => {
    setAddressSearch(suggestion.displayName);
    setAddressSuggestions([]);
    setLatitude(suggestion.lat);
    setLongitude(suggestion.lng);
    setFullAddress(suggestion.fullAddress);
    setError(null);
  }, []);

  const handleGeocodeAddress = useCallback(async () => {
    if (!addressSearch.trim()) {
      setError('Por favor ingresa una dirección');
      return;
    }

    setIsGeocoding(true);
    setError(null);

    try {
      const result = await geocodeAddress(addressSearch);
      if (result) {
        setLatitude(result.lat);
        setLongitude(result.lng);
        setFullAddress(result.fullAddress);
        setAddressSearch(result.displayName);
        setError(null);
      } else {
        setError('No se encontró la dirección. Intenta con una dirección más específica.');
      }
    } catch (err: any) {
      setError(err.message || 'Error al geocodificar la dirección');
    } finally {
      setIsGeocoding(false);
    }
  }, [addressSearch]);

  const handleMapClick = useCallback(async (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
    setError(null);
    setIsGeocoding(true);

    try {
      const result = await reverseGeocode(lat, lng);
      if (result) {
        setFullAddress(result.fullAddress);
        setAddressSearch(result.displayName);
      } else {
        setFullAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        setAddressSearch(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }
    } catch (err: any) {
      setError(err.message || 'Error al obtener la dirección de las coordenadas');
      setFullAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    } finally {
      setIsGeocoding(false);
    }
  }, []);

  const handleLatitudeChange = useCallback(async (value: string) => {
    const lat = parseFloat(value);
    if (!isNaN(lat) && lat >= -90 && lat <= 90) {
      setLatitude(lat);
      setError(null);
      
      // Si también hay longitud, hacer reverse geocode
      if (longitude !== null) {
        setIsGeocoding(true);
        try {
          const result = await reverseGeocode(lat, longitude);
          if (result) {
            setFullAddress(result.fullAddress);
            setAddressSearch(result.displayName);
          }
        } catch (err: any) {
          console.error('[OfficeLocationMap] Error en reverse geocode:', err);
        } finally {
          setIsGeocoding(false);
        }
      }
    } else if (value === '') {
      setLatitude(null);
    }
  }, [longitude]);

  const handleLongitudeChange = useCallback(async (value: string) => {
    const lng = parseFloat(value);
    if (!isNaN(lng) && lng >= -180 && lng <= 180) {
      setLongitude(lng);
      setError(null);
      
      // Si también hay latitud, hacer reverse geocode
      if (latitude !== null) {
        setIsGeocoding(true);
        try {
          const result = await reverseGeocode(latitude, lng);
          if (result) {
            setFullAddress(result.fullAddress);
            setAddressSearch(result.displayName);
          }
        } catch (err: any) {
          console.error('[OfficeLocationMap] Error en reverse geocode:', err);
        } finally {
          setIsGeocoding(false);
        }
      }
    } else if (value === '') {
      setLongitude(null);
    }
  }, [latitude]);

  const handleSave = useCallback(async () => {
    if (latitude === null || longitude === null) {
      setError('Por favor selecciona una ubicación en el mapa, ingresa coordenadas o busca una dirección');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await onSave(latitude, longitude, fullAddress || null);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al guardar la ubicación');
    } finally {
      setIsSaving(false);
    }
  }, [latitude, longitude, fullAddress, onSave, onClose]);

  const handleCancel = useCallback(() => {
    setError(null);
    onClose();
  }, [onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={(_, data) => !data.open && handleCancel()}>
      <DialogSurface style={{ maxWidth: '800px', width: '90vw' }}>
        <DialogTitle>
          {officeName ? `Ubicación de ${officeName}` : 'Seleccionar Ubicación'}
        </DialogTitle>
        <DialogBody>
          <DialogContent>
            <div className={styles.inputContainer}>
              <Field label="Buscar dirección" hint="Escribe una dirección y selecciona de las sugerencias">
                <Combobox
                  freeform
                  value={addressSearch}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    setAddressSearch(target.value);
                  }}
                  onOptionSelect={(_, data) => {
                    if (data.optionValue) {
                      const suggestion = addressSuggestions.find(s => s.displayName === data.optionValue);
                      if (suggestion) {
                        handleAddressSelect(suggestion);
                      }
                    }
                  }}
                  placeholder="Escribe una dirección (mínimo 3 caracteres)..."
                >
                  {isSearchingAddresses && addressSearch.trim().length >= 3 ? (
                    <Option disabled value="loading">
                      Buscando direcciones...
                    </Option>
                  ) : addressSuggestions.length > 0 ? (
                    addressSuggestions.map((suggestion, index) => (
                      <Option key={index} value={suggestion.displayName}>
                        {suggestion.displayName}
                      </Option>
                    ))
                  ) : addressSearch.trim().length >= 3 && !isSearchingAddresses ? (
                    <Option disabled value="no-results">
                      No se encontraron direcciones
                    </Option>
                  ) : null}
                </Combobox>
              </Field>

              <Button
                appearance="secondary"
                onClick={handleGeocodeAddress}
                disabled={isGeocoding || !addressSearch.trim()}
                loading={isGeocoding}
              >
                Buscar en mapa
              </Button>

              <div className={styles.coordinatesContainer}>
                <Field label="Latitud" hint="Rango: -90 a 90">
                  <Input
                    type="number"
                    value={latitude !== null ? latitude.toString() : ''}
                    onChange={(_, data) => handleLatitudeChange(data.value)}
                    placeholder="Ej: 40.4168"
                    step="0.000001"
                    min="-90"
                    max="90"
                  />
                </Field>
                <Field label="Longitud" hint="Rango: -180 a 180">
                  <Input
                    type="number"
                    value={longitude !== null ? longitude.toString() : ''}
                    onChange={(_, data) => handleLongitudeChange(data.value)}
                    placeholder="Ej: -3.7038"
                    step="0.000001"
                    min="-180"
                    max="180"
                  />
                </Field>
              </div>

              {fullAddress && (
                <Field label="Dirección completa">
                  <Text>{fullAddress}</Text>
                </Field>
              )}

              {error && (
                <MessageBar intent="error">
                  <MessageBarBody>{error}</MessageBarBody>
                </MessageBar>
              )}

              {isGeocoding && (
                <div className={styles.loadingContainer}>
                  <Spinner size="small" label="Obteniendo información..." />
                </div>
              )}

              <div className={styles.mapContainer}>
                <MapContainer
                  center={defaultCenter}
                  zoom={latitude && longitude ? 15 : 6}
                  style={{ height: '100%', width: '100%' }}
                  whenCreated={(map) => {
                    mapRef.current = map;
                  }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {latitude !== null && longitude !== null && (
                    <Marker
                      position={[latitude, longitude]}
                      draggable={true}
                      eventHandlers={{
                        dragend: (e) => {
                          const marker = e.target;
                          const position = marker.getLatLng();
                          handleMapClick(position.lat, position.lng);
                        },
                      }}
                    >
                      <Popup>
                        <Text weight="semibold">Ubicación seleccionada</Text>
                        <Text>{fullAddress || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`}</Text>
                      </Popup>
                    </Marker>
                  )}
                  <MapClickHandler onMapClick={handleMapClick} />
                </MapContainer>
              </div>

              <Text size={300} style={{ marginTop: tokens.spacingVerticalS }}>
                💡 Puedes hacer clic en el mapa, arrastrar el marcador, buscar una dirección o ingresar coordenadas manualmente
              </Text>
            </div>
          </DialogContent>
        </DialogBody>
        <DialogActions>
          <Button appearance="secondary" onClick={handleCancel} disabled={isSaving}>
            Cancelar
          </Button>
          <Button appearance="primary" onClick={handleSave} disabled={isSaving || latitude === null || longitude === null} loading={isSaving}>
            Guardar Ubicación
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

