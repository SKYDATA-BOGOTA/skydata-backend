# Guía de Instalación - Backend SKYDATA

**Base Normativa:** ISO/IEC 25010:2011 8.8.2 (Installability)

---

## Requisitos del Sistema

### Requisitos Mínimos

- **Node.js**: Versión 18.x o superior
- **npm**: Versión 9.x o superior
- **RAM**: Mínimo 2GB
- **Espacio en disco**: 200MB libres

### Requisitos Recomendados

- **Node.js**: Versión 20.x LTS
- **RAM**: 4GB o superior
- **Espacio en disco**: 1GB libres

---

## Instalación Local

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/SKYDATA-BOGOTA/skydata-backend.git
cd skydata-backend
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Configurar Variables de Entorno

Copiar `.env.example` a `.env`:

```bash
cp .env.example .env
```

Editar `.env` con la configuración necesaria:

```env
PORT=3001
CORS_ORIGIN=http://localhost:3000
DATA_FILE=./data/mock-data.json
NODE_ENV=development
```

### Paso 4: Verificar Archivo de Datos

Asegurar que el archivo de datos existe:

```bash
ls -la data/mock-data.json
```

Si no existe, crearlo o copiarlo desde el repositorio.

### Paso 5: Ejecutar en Modo Desarrollo

```bash
npm start
```

El backend estará disponible en `http://localhost:3001`

### Paso 6: Verificar Instalación

```bash
curl http://localhost:3001/health
curl http://localhost:3001/api/datos
```

---

## Instalación con Docker

### Requisitos

- Docker 20.x o superior
- Docker Compose 2.x o superior

### Paso 1: Crear Red Docker (si no existe)

```bash
docker network create skydata-network
```

### Paso 2: Construir Imagen Docker

```bash
docker build -t skydata-backend .
```

### Paso 3: Ejecutar con Docker Compose

```bash
docker-compose up -d
```

### Paso 4: Verificar Instalación

```bash
docker-compose ps
docker-compose logs backend
curl http://localhost:3001/health
```

---

## Compatibilidad con Sistemas Operativos

El backend ha sido probado y funciona en:

- ✅ **Windows 10/11** (con Node.js 18.x/20.x)
- ✅ **Linux** (Ubuntu 20.04+, Debian 11+, CentOS 8+)
- ✅ **macOS** (10.15+, con Node.js 18.x/20.x)

---

## Troubleshooting

### Error: Puerto 3001 ya está en uso

```bash
# Windows
netstat -ano | findstr :3001
# Linux/macOS
lsof -i :3001
```

Cambiar el puerto en `.env` o detener el proceso que usa el puerto.

### Error: No se encuentra el archivo de datos

Verificar que `data/mock-data.json` existe y tiene permisos de lectura.

### Error: Dependencias no se instalan

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Verificación de Instalación según ISO 25010:2011 8.8.2

- ✅ Node.js versión compatible instalado
- ✅ Dependencias instaladas correctamente
- ✅ Variables de entorno configuradas
- ✅ Archivo de datos accesible
- ✅ Servidor inicia correctamente
- ✅ Health check responde
- ✅ Endpoint de datos funciona

---

**Última Actualización**: 2025-01-XX
**Mantenido por**: Proyecto SKYDATA según ISO 25000

