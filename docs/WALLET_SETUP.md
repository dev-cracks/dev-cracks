# Configuración de Apple Wallet Pass

Para que los passes de Apple Wallet funcionen correctamente en iPhone, necesitas configurar los certificados de Apple Developer.

## Requisitos

1. **Cuenta de Apple Developer** (requiere membresía anual)
2. **Pass Type ID** registrado en Apple Developer Portal
3. **Team Identifier** de tu cuenta de Apple Developer
4. **Certificado** (.pem) para el Pass Type ID

## Pasos para obtener los certificados

### 1. Registrar un Pass Type ID

1. Ve a [Apple Developer Portal](https://developer.apple.com/account/)
2. Navega a **Certificates, Identifiers & Profiles**
3. Selecciona **Identifiers** → **+** (nuevo)
4. Elige **Pass Type IDs**
5. Crea un nuevo Pass Type ID (ej: `pass.com.devcracks.contact`)
6. Guarda el **Team Identifier** (aparece en la parte superior de la página)

### 2. Crear y descargar el certificado

1. En **Identifiers**, selecciona tu Pass Type ID
2. Haz clic en **Edit**
3. En la sección **Pass Type ID Certificate**, haz clic en **Create Certificate**
4. Sigue las instrucciones para crear un CSR (Certificate Signing Request)
5. Descarga el certificado (.cer)

### 3. Exportar el certificado como .pem

#### Opción A: Usando Keychain Access (macOS)

1. Abre **Keychain Access**
2. Importa el certificado .cer descargado
3. Busca el certificado en **My Certificates**
4. Haz clic derecho → **Export**
5. Exporta como **.p12** (necesitarás crear una contraseña)
6. Convierte a .pem usando:

```bash
openssl pkcs12 -in certificado.p12 -clcerts -out pass.pem -nodes
```

#### Opción B: Usando openssl directamente

```bash
openssl x509 -inform DER -in certificado.cer -out pass.pem
```

### 4. Configurar en el proyecto

1. Crea una carpeta `wallet-keys` en la raíz del proyecto
2. Coloca el archivo `pass.pem` en `wallet-keys/pass.pem`
3. Configura las variables de entorno:

```bash
# .env o variables de entorno del servidor
APPLE_PASS_TYPE_ID=pass.com.devcracks.contact
APPLE_TEAM_ID=TU_TEAM_IDENTIFIER
APPLE_CERT_PASSWORD=contraseña_si_el_certificado_la_requiere
```

## Estructura de carpetas

```
dev-cracks/
├── wallet-keys/
│   └── pass.pem          # Certificado de Apple Wallet
├── server.js              # Servidor con endpoint /api/wallet-pass
└── ...
```

## Verificación

Una vez configurado, el endpoint `/api/wallet-pass` debería:
- Generar passes firmados correctamente
- Funcionar en iPhone sin errores
- Agregarse directamente a Apple Wallet

## Notas importantes

- **Nunca subas los certificados a Git**: Agrega `wallet-keys/` al `.gitignore`
- **Mantén los certificados seguros**: Son credenciales sensibles
- **Los certificados expiran**: Necesitarás renovarlos periódicamente
- **Solo funciona con certificados válidos**: Los passes sin firmar no funcionan en iPhone

## Solución de problemas

### Error: "Wallet certificates not configured"
- Verifica que el archivo `wallet-keys/pass.pem` existe
- Verifica que el archivo tiene permisos de lectura

### Error: "Invalid certificate"
- Verifica que el certificado no ha expirado
- Verifica que el Pass Type ID coincide con el certificado
- Verifica que el Team Identifier es correcto

### El pass no se agrega en iPhone
- Verifica que el certificado está correctamente formateado
- Verifica que el Pass Type ID está registrado y activo
- Revisa los logs del servidor para ver errores específicos

