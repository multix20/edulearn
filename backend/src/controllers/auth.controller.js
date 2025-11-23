// backend/src/controllers/auth.controller.js
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';

// Generar JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Enviar token en cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  
  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  };
  
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: user.toPublicJSON()
    });
};

// @desc    Registrar nuevo usuario
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 REGISTER ATTEMPT');
    console.log('📦 Request Body:', JSON.stringify(req.body, null, 2));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor completa todos los campos obligatorios'
      });
    }
    
    const userExists = await User.findOne({ email: email.toLowerCase() });
    
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Este email ya está registrado'
      });
    }
    
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'teacher'
    });
    
    sendTokenResponse(user, 201, res);
    
  } catch (error) {
    console.error('Error en registro:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario'
    });
  }
};

// @desc    Login de usuario
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔐 LOGIN ATTEMPT');
    console.log('📦 Request Body:', JSON.stringify(req.body, null, 2));
    console.log('📧 Email:', req.body.email);
    console.log('🔑 Password exists:', !!req.body.password);
    console.log('🔑 Password length:', req.body.password?.length);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Por favor proporciona email y contraseña'
      });
    }
    
    // Buscar usuario e incluir password (que está select: false)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    console.log('👤 User found:', !!user);
    
    if (!user) {
      console.log('❌ User not found for email:', email);
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
    
    // Verificar contraseña
    const isPasswordCorrect = await user.comparePassword(password);
    console.log('🔐 Password correct:', isPasswordCorrect);
    
    if (!isPasswordCorrect) {
      console.log('❌ Password incorrect');
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
    
    // Actualizar último login
    user.lastLogin = new Date();
    await user.save();
    
    console.log('✅ Login successful');
    
    // Enviar respuesta con token
    sendTokenResponse(user, 200, res);
    
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión'
    });
  }
};

// @desc    Logout de usuario
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
      })
      .json({
        success: true,
        message: 'Sesión cerrada exitosamente'
      });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({
      success: false,
      message: 'Error al cerrar sesión'
    });
  }
};

// @desc    Obtener usuario actual
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      user: user.toPublicJSON()
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener información del usuario'
    });
  }
};

// @desc    Actualizar detalles del usuario
// @route   PUT /api/auth/updatedetails
// @access  Private
export const updateDetails = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email
    };
    
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      user: user.toPublicJSON()
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Este email ya está en uso'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al actualizar información'
    });
  }
};

// @desc    Actualizar contraseña
// @route   PUT /api/auth/updatepassword
// @access  Private
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Por favor proporciona la contraseña actual y la nueva'
      });
    }
    
    const user = await User.findById(req.user.id).select('+password');
    
    const isPasswordValid = await user.comparePassword(currentPassword);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña actual incorrecta'
      });
    }
    
    user.password = newPassword;
    await user.save();
    
    sendTokenResponse(user, 200, res);
    
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar contraseña'
    });
  }
};