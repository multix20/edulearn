# 📚 EduLearn Platform

> Plataforma educativa interactiva para crear, compartir y gestionar recursos educativos

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🚀 Características

- ✨ Sistema completo de autenticación (local + OAuth)
- 📝 CRUD de fichas de trabajo educativas
- 👥 Roles de usuario (estudiante, profesor, padre, admin)
- 🎮 Gamificación con puntos y niveles
- ⭐ Sistema de favoritos y colecciones
- 🔍 Búsqueda avanzada con filtros
- 📊 Estadísticas de uso y progreso
- 💬 Sistema de comentarios y valoraciones
- 🎨 Interfaz moderna con Tailwind CSS

## 🛠️ Stack Tecnológico

### Frontend
- **React 18.2** - Framework UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos utility-first
- **Lucide React** - Iconos
- **Facebook SDK** - OAuth

### Backend
- **Node.js + Express** - REST API
- **MongoDB + Mongoose** - Base de datos
- **JWT** - Autenticación
- **Bcrypt** - Hashing de contraseñas

## 📋 Requisitos Previos

- Node.js >= 18.x
- MongoDB >= 6.x
- npm o yarn

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/TU_USUARIO/edulearn-platform.git
cd edulearn-platform
```

2. **Instalar dependencias del frontend**
```bash
npm install
```

3. **Instalar dependencias del backend**
```bash
cd backend
npm install
```

4. **Configurar variables de entorno**
```bash
cd backend
cp .env.example .env
```

Edita `backend/.env` con tus valores:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/edulearn
JWT_SECRET=tu_secreto_super_seguro_aqui
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=otro_secreto_para_refresh
JWT_REFRESH_EXPIRE=30d
```

5. **Iniciar MongoDB**
```bash
# Si usas MongoDB local
mongod

# O usa MongoDB Atlas (cloud)
# Actualiza MONGO_URI en .env con tu connection string
```

## 🚀 Ejecución

### Modo Desarrollo

**Terminal 1 - Frontend:**
```bash
npm run dev
# Abre http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
# API en http://localhost:5000
```

### Modo Producción

**Frontend:**
```bash
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
npm start
```

## 📁 Estructura del Proyecto

```
edulearn-platform/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── middleware/      # Middlewares (auth, etc)
│   │   ├── models/          # Modelos de MongoDB
│   │   ├── routes/          # Definición de rutas
│   │   └── server.js        # Entry point
│   └── package.json
├── src/
│   ├── components/          # Componentes React
│   ├── services/            # Servicios (API, etc)
│   ├── hooks/               # Custom hooks
│   ├── config/              # Configuración
│   └── utils/               # Utilidades
├── CLAUDE_CONTEXT.md        # Documentación para Claude
└── package.json
```

## 🔑 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Usuario actual
- `POST /api/auth/logout` - Logout

### Usuarios
- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener usuario
- `PUT /api/users/:id` - Actualizar usuario
- `POST /api/users/:id/favorites` - Agregar favorito

### Worksheets
- `GET /api/worksheets` - Listar fichas
- `POST /api/worksheets` - Crear ficha
- `GET /api/worksheets/:id` - Obtener ficha
- `PUT /api/worksheets/:id` - Actualizar ficha
- `DELETE /api/worksheets/:id` - Eliminar ficha
- `POST /api/worksheets/:id/rate` - Calificar

Ver documentación completa en [CLAUDE_CONTEXT.md](CLAUDE_CONTEXT.md)

## 🧪 Testing

```bash
# Frontend
npm test

# Backend
cd backend
npm test
```

## 📦 Deploy

### Frontend (Vercel/Netlify)
```bash
npm run build
# Sube la carpeta dist/
```

### Backend (Railway/Render)
```bash
cd backend
# Configura las variables de entorno en tu plataforma
# Deploy desde el directorio backend/
```

### MongoDB (Atlas)
1. Crea un cluster en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Obtén tu connection string
3. Actualiza `MONGO_URI` en las variables de entorno

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial*

## 🙏 Agradecimientos

- Desarrollado con asistencia de [Claude](https://claude.ai) (Anthropic)
- Iconos por [Lucide](https://lucide.dev/)
- Estilos por [Tailwind CSS](https://tailwindcss.com/)

## 📞 Soporte

Si tienes preguntas o problemas:
- Abre un [Issue](https://github.com/TU_USUARIO/edulearn-platform/issues)
- Revisa la [Documentación Completa](CLAUDE_CONTEXT.md)

---

⭐ Si este proyecto te es útil, considera darle una estrella!
