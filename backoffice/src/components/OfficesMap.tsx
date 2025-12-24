import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { OfficeDto } from '../services/officeService';
import { Text, makeStyles, tokens } from '@fluentui/react-components';
import '../styles/leaflet.css';

// Fix para iconos de Leaflet en React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface OfficesMapProps {
  offices: OfficeDto[];
}

const useStyles = makeStyles({
  mapContainer: {
    height: '500px',
    width: '100%',
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
  },
  popupContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    minWidth: '200px',
  },
  popupTitle: {
    fontWeight: tokens.fontWeightSemibold,
  },
  popupText: {
    fontSize: tokens.fontSizeBase200,
  },
});

// Componente para ajustar el zoom y centrar el mapa según los marcadores
function MapBounds({ offices }: { offices: OfficeDto[] }) {
  const map = useMap();

  useEffect(() => {
    const officesWithCoordinates = offices.filter(
      (office) => office.latitude !== null && office.latitude !== undefined &&
      office.longitude !== null && office.longitude !== undefined
    );

    if (officesWithCoordinates.length === 0) {
      // Si no hay oficinas con coordenadas, centrar en Madrid por defecto
      map.setView([40.4168, -3.7038], 6);
      return;
    }

    if (officesWithCoordinates.length === 1) {
      // Si solo hay una oficina, centrar en ella con zoom 15
      const office = officesWithCoordinates[0];
      map.setView([office.latitude!, office.longitude!], 15);
      return;
    }

    // Si hay múltiples oficinas, ajustar el bounds para mostrar todas
    const bounds = L.latLngBounds(
      officesWithCoordinates.map((office) => [
        office.latitude!,
        office.longitude!,
      ])
    );

    map.fitBounds(bounds, {
      padding: [50, 50], // Padding en píxeles
      maxZoom: 15, // Zoom máximo para evitar acercarse demasiado
    });
  }, [map, offices]);

  return null;
}

export const OfficesMap = ({ offices }: OfficesMapProps) => {
  const styles = useStyles();

  // Filtrar solo las oficinas que tienen coordenadas
  const officesWithCoordinates = offices.filter(
    (office) =>
      office.latitude !== null &&
      office.latitude !== undefined &&
      office.longitude !== null &&
      office.longitude !== undefined
  );

  // Centro por defecto (Madrid, España)
  const defaultCenter: [number, number] = [40.4168, -3.7038];
  const defaultZoom = officesWithCoordinates.length === 0 ? 6 : 10;

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds offices={offices} />
        {officesWithCoordinates.map((office) => (
          <Marker
            key={office.id}
            position={[office.latitude!, office.longitude!]}
          >
            <Popup>
              <div className={styles.popupContent}>
                <Text className={styles.popupTitle}>{office.name}</Text>
                {office.fullAddress && (
                  <Text className={styles.popupText}>{office.fullAddress}</Text>
                )}
                {office.city && office.stateProvince && (
                  <Text className={styles.popupText}>
                    {office.city}, {office.stateProvince}
                  </Text>
                )}
                {office.countryName && (
                  <Text className={styles.popupText}>{office.countryName}</Text>
                )}
                {office.phone && (
                  <Text className={styles.popupText}>Tel: {office.phone}</Text>
                )}
                {office.email && (
                  <Text className={styles.popupText}>Email: {office.email}</Text>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};




