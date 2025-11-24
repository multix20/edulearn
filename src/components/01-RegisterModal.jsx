import React, { useState } from 'react';
import { ValidationUtils } from '../utils';
import { authService } from '../services/api';
import facebookService from '../services/facebook';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin, onRegisterSuccess }) => {
  const [registerForm, setRegisterForm] = useState({ 
    name: '',
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [registerError, setRegisterError] = useState('');

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');

    if (!ValidationUtils.isRequired(registerForm.name)) {
      setRegisterError('El nombre es requerido');
      return;
    }

    if (!ValidationUtils.isRequired(registerForm.email)) {
      setRegisterError('El email es requerido');
      return;
    }

    if (!ValidationUtils.isEmail(registerForm.email)) {
      setRegisterError('Ingresa un email válido');
      return;
    }

    if (!ValidationUtils.isRequired(registerForm.password)) {
      setRegisterError('La contraseña es requerida');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await authService.register({
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
      });

      if (response.success) {
        // Limpiar formulario
        setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });

        // ⭐ Notificar al componente padre que el registro fue exitoso
        if (onRegisterSuccess) {
          onRegisterSuccess(response.user);
        }
      }
    } catch (err) {
      console.error('Error en registro:', err);
      setRegisterError('Error al crear la cuenta. Intenta nuevamente.');
    }
  };

  const handleSocialRegister = async (provider) => {
    if (provider === 'facebook') {
      try {
        console.log('Registrándose con Facebook...');
        const result = await facebookService.login();

        if (result.success) {
          console.log('Datos de Facebook obtenidos:', result.user);
        } else {
          setRegisterError('Error al registrarse con Facebook');
        }
      } catch (error) {
        console.error('Error en registro de Facebook:', error);
        setRegisterError('Error al conectar con Facebook');
      }
    } else if (provider === 'google') {
      console.log('Registrándose con Google...');
      setTimeout(() => {
        onClose();
        console.log('Registro con Google completado. Por favor, confirma tu cuenta.');
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 w-full max-w-sm mx-4 shadow-2xl shadow-black/20 border border-white/20 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-violet-800 bg-clip-text text-transparent">
              Crear Cuenta
            </h2>
            <p className="text-gray-500 mt-1">Ingresa tus datos para registrarte</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80 transition-all duration-200 flex items-center justify-center group"
          >
            <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleRegisterSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={registerForm.name}
            onChange={handleRegisterInputChange}
            className="w-full px-4 py-3 bg-gray-100/80 backdrop-blur-sm border-2 border-transparent rounded-xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 text-sm"
            placeholder="Tu nombre completo"
            required
          />
          
          <input
            type="email"
            name="email"
            value={registerForm.email}
            onChange={handleRegisterInputChange}
            className="w-full px-4 py-3 bg-gray-100/80 backdrop-blur-sm border-2 border-transparent rounded-xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 text-sm"
            placeholder="tu@email.com"
            required
          />

          <input
            type="password"
            name="password"
            value={registerForm.password}
            onChange={handleRegisterInputChange}
            className="w-full px-4 py-3 bg-gray-100/80 backdrop-blur-sm border-2 border-transparent rounded-xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 text-sm"
            placeholder="••••••••"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={registerForm.confirmPassword}
            onChange={handleRegisterInputChange}
            className="w-full px-4 py-3 bg-gray-100/80 backdrop-blur-sm border-2 border-transparent rounded-xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 text-sm"
            placeholder="Confirmar contraseña"
            required
          />

          {registerError && (
            <div className="p-3 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl animate-in slide-in-from-top-1 duration-300">
              <span className="text-red-600 text-xs">{registerError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-violet-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg text-sm"
          >
            Crear Cuenta
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-500 text-xs">¿Ya tienes cuenta? </span>
          <button
            onClick={() => {
              onClose();
              onSwitchToLogin();
            }}
            className="text-violet-600 font-semibold hover:text-violet-700 transition-colors duration-200 hover:underline text-xs"
          >
            Inicia Sesión
          </button>
        </div>

        <div className="mt-3 text-center text-xs text-gray-500">
          <p>Al crear cuenta, acepto los <a href="#" className="text-violet-600 hover:underline">Términos de Uso</a> y <a href="#" className="text-violet-600 hover:underline">Política de Privacidad</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal; 