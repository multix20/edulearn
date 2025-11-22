# 📚 EduLearn Platform - Contexto para Claude Web

## 🎯 Descripción del Proyecto

**EduLearn** es una plataforma educativa interactiva diseñada para crear, compartir y gestionar fichas de trabajo (worksheets) educativas. Combina funcionalidades de red social educativa con gamificación para estudiantes, profesores y padres.

## 🏗️ Arquitectura del Proyecto

### **Stack Tecnológico**

**Frontend:**
- React 18.2.0 con Vite
- Tailwind CSS para estilos
- Lucide React para iconos
- Facebook SDK para autenticación OAuth

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose (ODM)
- JWT para autenticación
- Bcrypt para seguridad de contraseñas

---

## 📁 Estructura de Archivos

```
edulearn-main/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── auth.controller.js      # Lógica de autenticación
│   │   ├── middleware/
│   │   │   └── auth.middleware.js      # JWT validation & RBAC
│   │   ├── models/
│   │   │   ├── User.model.js           # Schema de usuarios
│   │   │   └── Worksheet.model.js      # Schema de fichas
│   │   ├── routes/
│   │   │   ├── auth.routes.js          # Rutas de autenticación
│   │   │   ├── user.routes.js          # Rutas de usuarios
│   │   │   └── worksheet.routes.js     # CRUD de worksheets
│   │   └── server.js                   # Punto de entrada del servidor
│   ├── .env.example                    # Variables de entorno ejemplo
│   └── package.json
│
├── src/
│   ├── components/
│   │   ├── Header.jsx                  # Navbar con auth
│   │   ├── Hero.jsx                    # Landing page hero
│   │   ├── Footer.jsx                  # Footer global
│   │   ├── Navigation.jsx              # Navegación principal
│   │   ├── RegisterModal.jsx           # Modal de registro/login
│   │   ├── biblioteca.jsx              # Biblioteca de recursos
│   │   ├── GetAccess.jsx               # CTA de acceso
│   │   └── unete.jsx                   # CTA de unirse
│   ├── services/
│   │   ├── api.js                      # Cliente HTTP (fetch wrapper)
│   │   └── facebook.js                 # Integración Facebook SDK
│   ├── hooks/
│   │   └── useSearch.js                # Hook de búsqueda
│   ├── config/
│   │   └── index.js                    # Configuración global
│   ├── utils/
│   │   └── index.js                    # Utilidades generales
│   ├── App.jsx                         # Componente principal
│   └── main.jsx                        # Punto de entrada React
│
├── .gitignore
├── package.json
└── tailwind.config.js
```

---

## 🔑 Funcionalidades Principales

### 1. **Sistema de Autenticación**
- Registro e inicio de sesión local (email/password)
- OAuth con Facebook (preparado para Google)
- JWT con tokens de acceso y refresh
- Middleware de protección de rutas
- Control de acceso basado en roles (RBAC)

### 2. **Roles de Usuario**
- **student**: Estudiante (default)
- **teacher**: Profesor (puede crear contenido)
- **parent**: Padre (puede ver progreso de hijos)
- **admin**: Administrador (control total)

### 3. **Gestión de Worksheets**
Cada ficha tiene:
- Título, descripción, materia, grado
- Tipo (worksheet, quiz, activity, project)
- Dificultad (beginner, intermediate, advanced)
- Archivo PDF asociado
- Sistema de puntos y ratings
- Etiquetas (tags) para categorización
- Estadísticas de uso

### 4. **Sistema de Usuario**
- Perfil con avatar personalizable
- Estadísticas gamificadas:
  - Fichas completadas
  - Juegos jugados
  - Puntos acumulados
  - Nivel actual
- Favoritos organizados por tipo de recurso
- Colecciones personales

---

## 🔐 Seguridad Implementada

1. **Contraseñas:**
   - Hash con bcrypt (10 rounds)
   - Validación de longitud mínima (6 caracteres)
   - No se incluyen en queries por defecto (select: false)

2. **JWT:**
   - Tokens firmados con secreto
   - Expiración configurable
   - Refresh tokens para renovación

3. **Validación:**
   - Email formato válido
   - Sanitización de inputs
   - Validación de tipos con Mongoose

4. **RBAC:**
   - Middleware `requireRole(['teacher', 'admin'])`
   - Verificación de permisos antes de acciones sensibles

---

## 🚀 Configuración del Entorno

### Variables de Entorno (backend/.env)

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/edulearn
JWT_SECRET=tu_secreto_super_seguro_aqui
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=otro_secreto_para_refresh
JWT_REFRESH_EXPIRE=30d
```

### Instalación

```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### Ejecución

```bash
# Frontend (puerto 5173)
npm run dev

# Backend (puerto 5000)
cd backend
npm run dev
```

---

## 📊 Modelos de Datos

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum['student', 'teacher', 'parent', 'admin'],
  avatar: String,
  provider: Enum['local', 'google', 'facebook'],
  isEmailVerified: Boolean,
  stats: {
    worksheetsCompleted: Number,
    gamesPlayed: Number,
    points: Number,
    level: Number
  },
  favorites: [{
    resourceId: ObjectId,
    resourceType: String,
    addedAt: Date
  }],
  collections: [{
    name: String,
    description: String,
    resources: [...]
  }],
  lastLogin: Date,
  isActive: Boolean
}
```

### Worksheet Model
```javascript
{
  title: String,
  description: String,
  subject: Enum['math', 'spanish', 'science', ...],
  grade: Enum['preescolar', 'primero', ...],
  type: Enum['worksheet', 'quiz', 'activity', 'project'],
  difficulty: Enum['beginner', 'intermediate', 'advanced'],
  fileUrl: String,
  fileType: String,
  fileSize: Number,
  thumbnailUrl: String,
  tags: [String],
  author: ObjectId (ref: User),
  isPublic: Boolean,
  isPremium: Boolean,
  points: Number,
  stats: {
    downloads: Number,
    views: Number,
    likes: Number,
    avgRating: Number,
    totalRatings: Number
  },
  ratings: [{
    user: ObjectId,
    rating: Number,
    comment: String,
    date: Date
  }],
  comments: [...]
}
```

---

## 🛣️ API Endpoints Principales

### Autenticación (`/api/auth`)
- `POST /register` - Registro de usuario
- `POST /login` - Inicio de sesión
- `POST /refresh-token` - Renovar token
- `POST /logout` - Cerrar sesión
- `GET /me` - Obtener usuario actual
- `POST /verify-email/:token` - Verificar email
- `POST /forgot-password` - Recuperar contraseña
- `POST /reset-password/:token` - Resetear contraseña

### Usuarios (`/api/users`)
- `GET /` - Listar usuarios (admin)
- `GET /:id` - Obtener usuario por ID
- `PUT /:id` - Actualizar usuario
- `DELETE /:id` - Eliminar usuario (admin)
- `GET /stats/:id` - Estadísticas de usuario
- `PUT /:id/change-password` - Cambiar contraseña
- `POST /:id/favorites` - Agregar favorito
- `DELETE /:id/favorites/:favoriteId` - Quitar favorito

### Worksheets (`/api/worksheets`)
- `GET /` - Listar fichas (con filtros)
- `POST /` - Crear ficha (teacher/admin)
- `GET /:id` - Obtener ficha por ID
- `PUT /:id` - Actualizar ficha (autor/admin)
- `DELETE /:id` - Eliminar ficha (autor/admin)
- `GET /my-worksheets` - Fichas del usuario actual
- `POST /:id/like` - Dar like
- `POST /:id/rate` - Calificar
- `POST /:id/comment` - Comentar
- `GET /search` - Búsqueda avanzada

---

## 🎨 Componentes Frontend

### Header.jsx
Navbar completo con:
- Logo y navegación
- Barra de búsqueda
- Autenticación (login/register modals)
- Menú de usuario (profile, favorites, logout)
- Responsive design

### RegisterModal.jsx
Modal dual para:
- Registro de nuevos usuarios
- Login de usuarios existentes
- OAuth con Facebook
- Validación de formularios
- Manejo de errores

### biblioteca.jsx
Componente de biblioteca con:
- Grid de recursos educativos
- Filtros por categoría
- Sistema de favoritos
- Paginación
- Diseño responsive

---

## 🔄 Hooks Personalizados

### useSearch.js
Hook de búsqueda con:
- Debounce automático
- Filtros múltiples
- Caché de resultados
- Loading states
- Manejo de errores

---

## 📝 Próximos Pasos Sugeridos

1. **Base de datos:**
   - Instalar MongoDB local o usar MongoDB Atlas
   - Crear base de datos `edulearn`
   - Configurar conexión en `.env`

2. **OAuth completo:**
   - Configurar Facebook App ID
   - Implementar Google OAuth
   - Agregar Apple Sign In

3. **Upload de archivos:**
   - Implementar Multer para subida de PDFs
   - Integrar Cloudinary/S3 para almacenamiento
   - Generar thumbnails automáticos

4. **Features adicionales:**
   - Sistema de notificaciones
   - Chat entre usuarios
   - Gamificación (badges, achievements)
   - Dashboard de profesor
   - Analytics de progreso

5. **Testing:**
   - Tests unitarios (Jest)
   - Tests de integración (Supertest)
   - Tests E2E (Cypress/Playwright)

6. **Deploy:**
   - Frontend: Vercel/Netlify
   - Backend: Railway/Render/Heroku
   - Base de datos: MongoDB Atlas

---

## 🐛 Issues Conocidos

1. **Autenticación OAuth:** Necesita Facebook App ID configurado
2. **Upload de archivos:** No implementado aún (fileUrl es placeholder)
3. **Email verification:** Servicio SMTP no configurado
4. **Password reset:** Requiere servicio de email

---

## 💡 Consejos para Trabajar con Claude Web

1. **Compartir código específico:** Copia archivos completos cuando necesites ayuda con un módulo específico

2. **Contexto de errores:** Siempre incluye el error completo y el código relacionado

3. **Preguntas útiles:**
   - "¿Cómo implemento upload de archivos en [worksheet.routes.js](backend/src/routes/worksheet.routes.js)?"
   - "¿Cómo agrego validación de email en [auth.controller.js](backend/src/controllers/auth.controller.js)?"
   - "¿Cómo optimizo las queries de MongoDB en [Worksheet.model.js](backend/src/models/Worksheet.model.js)?"
   - "¿Cómo implemento paginación en el endpoint GET /api/worksheets?"

4. **Formato de consultas:**
   ```
   Estoy trabajando en EduLearn (plataforma educativa con MERN stack).

   Necesito: [descripción del problema/feature]

   Archivo actual: [nombre del archivo]
   Código relevante: [pegar código]

   Error (si aplica): [mensaje de error completo]
   ```

---

## 📚 Recursos del Proyecto

- **Repositorio GitHub:** [Pendiente de configurar]
- **Documentación Backend:** Ver [backend/README.md](backend/README.md)
- **Variables de entorno:** Ver [backend/.env.example](backend/.env.example)

---

## 🤝 Información de Desarrollo

**Última actualización:** 2025-11-22
**Estado:** En desarrollo activo
**Versión:** 1.0.0

Este proyecto fue desarrollado con asistencia de Claude (Anthropic).
