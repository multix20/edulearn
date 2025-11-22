# EduLearn Backend API 🚀

Backend para la plataforma educativa EduLearn construido con Node.js, Express y MongoDB.

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- MongoDB instalado localmente O cuenta en MongoDB Atlas
- npm o yarn

## 🛠️ Instalación

### 1. Instalar MongoDB Local (Opción A - Desarrollo)

**Ubuntu/Linux:**
```bash
# Instalar MongoDB
sudo apt-get install -y mongodb

# Iniciar servicio
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Verificar que esté corriendo
sudo systemctl status mongodb
```

**macOS:**
```bash
# Con Homebrew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
Descarga el instalador desde: https://www.mongodb.com/try/download/community

### 2. Configurar MongoDB Atlas (Opción B - Producción)

1. Ir a https://www.mongodb.com/cloud/atlas
2. Crear cuenta gratuita
3. Crear nuevo cluster
4. Obtener connection string
5. Actualizar MONGODB_URI en .env

### 3. Instalar Dependencias del Backend

```bash
cd backend
npm install
```

### 4. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tus configuraciones
nano .env  # o usa tu editor favorito
```

**Configuración mínima para empezar:**
```env
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/edulearn
JWT_SECRET=cambia_esto_por_algo_seguro_123456
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
```

### 5. Iniciar el Servidor

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

Deberías ver:
```
✅ MongoDB conectado: localhost
🚀 Servidor corriendo en http://localhost:4000
📚 EduLearn API lista para usar
```

## 🧪 Probar la API

### Ruta de salud:
```bash
curl http://localhost:4000/api/health
```

Deberías recibir:
```json
{
  "status": "OK",
  "message": "EduLearn API funcionando correctamente",
  "timestamp": "2024-..."
}
```

## 📚 Endpoints Disponibles

### Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Registrar nuevo usuario | ❌ |
| POST | `/login` | Iniciar sesión | ❌ |
| POST | `/logout` | Cerrar sesión | ✅ |
| GET | `/me` | Obtener usuario actual | ✅ |
| PUT | `/updatedetails` | Actualizar perfil | ✅ |
| PUT | `/updatepassword` | Cambiar contraseña | ✅ |

### Usuarios (`/api/users`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/` | Obtener todos los usuarios | ✅ Admin |
| GET | `/:id` | Obtener usuario por ID | ✅ |
| PUT | `/:id` | Actualizar usuario | ✅ Admin |
| DELETE | `/:id` | Eliminar usuario | ✅ Admin |

### Hojas de Trabajo (`/api/worksheets`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/` | Listar worksheets | ❌ |
| GET | `/popular` | Worksheets populares | ❌ |
| GET | `/recent` | Worksheets recientes | ❌ |
| GET | `/:id` | Obtener worksheet | ❌ |
| POST | `/` | Crear worksheet | ✅ Teacher/Admin |
| PUT | `/:id` | Actualizar worksheet | ✅ Owner/Admin |
| DELETE | `/:id` | Eliminar worksheet | ✅ Owner/Admin |
| PUT | `/:id/publish` | Publicar/despublicar | ✅ Owner/Admin |
| POST | `/:id/download` | Registrar descarga | ❌ |

## 🔐 Autenticación

La API usa **JWT (JSON Web Tokens)** para autenticación.

### Registrarse:
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "password": "123456",
    "role": "student"
  }'
```

### Iniciar sesión:
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@ejemplo.com",
    "password": "123456"
  }'
```

Respuesta:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "role": "student"
  }
}
```

### Usar el token en requests:
```bash
curl http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── controllers/       # Lógica de negocio
│   │   └── auth.controller.js
│   ├── models/           # Modelos de MongoDB
│   │   ├── User.model.js
│   │   └── Worksheet.model.js
│   ├── routes/           # Rutas de la API
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   └── worksheet.routes.js
│   ├── middleware/       # Middlewares
│   │   └── auth.middleware.js
│   └── server.js         # Punto de entrada
├── .env                  # Variables de entorno (NO subir a git)
├── .env.example          # Ejemplo de variables
├── .gitignore
├── package.json
└── README.md
```

## 🎭 Roles de Usuario

- **student**: Usuario estudiante (default)
- **parent**: Padre de familia
- **teacher**: Profesor (puede crear contenido)
- **admin**: Administrador (acceso total)

## 🚀 Próximos Pasos

1. ✅ Configurar MongoDB (local o Atlas)
2. ✅ Instalar dependencias
3. ✅ Configurar .env
4. ✅ Iniciar servidor
5. 🔄 Conectar frontend con backend
6. 🔄 Implementar subida de archivos
7. 🔄 Agregar favoritos y colecciones

## 🐛 Solución de Problemas

### Error: MongoDB no se conecta
```bash
# Verificar que MongoDB esté corriendo
sudo systemctl status mongodb

# Si no está corriendo
sudo systemctl start mongodb
```

### Error: Port 4000 already in use
Cambia el puerto en `.env`:
```env
PORT=5000
```

### Error: JWT_SECRET no definido
Asegúrate de tener `.env` configurado correctamente.

## 📞 Soporte

Si tienes problemas, revisa:
1. Que MongoDB esté corriendo
2. Que el archivo .env esté configurado
3. Que las dependencias estén instaladas
4. Los logs del servidor

---

**¡Listo para empezar!** 🎉