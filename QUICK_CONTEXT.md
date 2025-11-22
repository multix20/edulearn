# 🚀 EduLearn - Contexto Rápido para Claude Web

> Copia y pega este texto cuando inicies una conversación en Claude web

---

Hola! Estoy trabajando en **EduLearn**, una plataforma educativa con MERN stack.

## 📌 Stack
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Node.js + Express + MongoDB + Mongoose
- **Auth:** JWT + OAuth (Facebook)

## 📂 Estructura Principal
```
edulearn-platform/
├── backend/src/
│   ├── controllers/auth.controller.js    # Autenticación
│   ├── middleware/auth.middleware.js     # JWT + RBAC
│   ├── models/
│   │   ├── User.model.js                 # Usuarios
│   │   └── Worksheet.model.js            # Fichas educativas
│   ├── routes/                           # API endpoints
│   └── server.js
├── src/components/                       # Componentes React
└── src/services/api.js                   # Cliente HTTP
```

## 🎯 Funcionalidades Actuales
✅ Autenticación JWT con refresh tokens
✅ 4 roles de usuario: student, teacher, parent, admin
✅ CRUD completo de worksheets (fichas educativas)
✅ Sistema de favoritos y colecciones
✅ Gamificación (puntos, niveles, estadísticas)
✅ Búsqueda y filtros avanzados
✅ Sistema de ratings y comentarios

## 🔑 Modelos Clave

**User:**
- name, email, password (bcrypt)
- role: student | teacher | parent | admin
- stats: worksheetsCompleted, points, level
- favorites[], collections[]

**Worksheet:**
- title, description, subject, grade, difficulty
- fileUrl (PDF), thumbnailUrl
- author (ref: User)
- stats: downloads, views, likes, avgRating
- ratings[], comments[]

## 📍 Estado Actual
- ✅ Backend API completo y funcional
- ✅ Frontend con componentes base
- ⚠️ Pendiente: Upload de archivos real (usa placeholders)
- ⚠️ Pendiente: Email verification (SMTP no configurado)
- ⚠️ Pendiente: OAuth completamente configurado

## 🎯 Mi Consulta
[Aquí describe tu pregunta o problema específico]

---

**Documentación completa:** Ver CLAUDE_CONTEXT.md en el repo
**Repositorio GitHub:** [Tu URL después de push]
