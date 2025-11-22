// backend/src/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Cargar variables de entorno
dotenv.config();

// Importar rutas
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import worksheetRoutes from './routes/worksheet.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// ========================================
// MIDDLEWARES
// ========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS - Permitir requests desde el frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// ========================================
// RUTAS
// ========================================
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/worksheets', worksheetRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'EduLearn API funcionando correctamente',
    timestamp: new Date()
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Ruta no encontrada' 
  });
});

// ========================================
// CONEXIÓN A MONGODB
// ========================================
const connectDB = async () => {
  try {
    console.log('🔄 Intentando conectar a MongoDB Atlas...');
    
    // Validar que existe la URI
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI no está definida en .env');
    }
    
    // Mostrar URI sin password (para debugging)
    const safeUri = process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@');
    console.log('📍 URI:', safeUri);
    
    // Conectar sin opciones deprecadas
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB conectado exitosamente!`);
    console.log(`📊 Host: ${conn.connection.host}`);
    console.log(`🗄️  Base de datos: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error de conexión a MongoDB:`);
    console.error(`   Mensaje: ${error.message}`);
    
    if (error.message.includes('ENOTFOUND')) {
      console.error('\n💡 Posibles soluciones:');
      console.error('   1. Verifica tu conexión a internet');
      console.error('   2. Verifica que el connection string sea correcto');
      console.error('   3. En MongoDB Atlas → Network Access → Permitir tu IP');
      console.error('   4. Espera 1-2 minutos si acabas de crear el cluster\n');
    }
    
    if (error.message.includes('Authentication failed')) {
      console.error('\n💡 El usuario o contraseña son incorrectos');
      console.error('   Ve a Database Access en MongoDB Atlas y verifica las credenciales\n');
    }
    
    process.exit(1);
  }
};

// ========================================
// INICIAR SERVIDOR
// ========================================
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📚 EduLearn API lista para usar`);
    console.log(`${'='.repeat(50)}\n`);
  });
};

startServer();

export default app;