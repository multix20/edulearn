import React, { useState, useRef, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { getMessage } from '../config';
import { authService } from '../services/api';
import { ValidationUtils } from '../utils';
import facebookService from '../services/facebook';
import RegisterModal from './RegisterModal';

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isFacebookDataModalOpen, setIsFacebookDataModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [facebookDataForm, setFacebookDataForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loginError, setLoginError] = useState('');
  const [facebookDataError, setFacebookDataError] = useState('');
  const [user, setUser] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [facebookUserData, setFacebookUserData] = useState(null);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  
  // Hook personalizado para búsqueda
  const { query, setQuery, results, loading, error } = useSearch();

  // Cerrar menú de usuario al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Manejar búsqueda
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Buscando:', query);
    }
  };

  // Manejar login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!ValidationUtils.isRequired(loginForm.email)) {
      setLoginError('El email es requerido');
      return;
    }

    if (!ValidationUtils.isEmail(loginForm.email)) {
      setLoginError('Ingresa un email válido');
      return;
    }

    if (!ValidationUtils.isRequired(loginForm.password)) {
      setLoginError('La contraseña es requerida');
      return;
    }

    try {
      const response = await authService.login(loginForm.email, loginForm.password);
      
      if (response.success) {
        setUser(response.user);
        setIsLoginModalOpen(false);
        setLoginForm({ email: '', password: '' });
      }
    } catch (err) {
      setLoginError('Error al iniciar sesión. Intenta nuevamente.');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setShowUserMenu(false);
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFacebookDataInputChange = (e) => {
    const { name, value } = e.target;
    setFacebookDataForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFacebookDataSubmit = async (e) => {
    e.preventDefault();
    setFacebookDataError('');

    if (!ValidationUtils.isRequired(facebookDataForm.email)) {
      setFacebookDataError('El email es requerido');
      return;
    }

    if (!ValidationUtils.isEmail(facebookDataForm.email)) {
      setFacebookDataError('Ingresa un email válido');
      return;
    }

    if (!ValidationUtils.isRequired(facebookDataForm.password)) {
      setFacebookDataError('La contraseña es requerida');
      return;
    }

    if (facebookDataForm.password !== facebookDataForm.confirmPassword) {
      setFacebookDataError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Crear usuario final combinando datos de Facebook con los del formulario
      const finalUser = {
        id: facebookUserData.id,
        name: facebookDataForm.name,
        email: facebookDataForm.email,
        provider: 'facebook',
        facebookData: facebookUserData
      };

      // Aquí podrías enviar los datos al servidor para crear la cuenta
      console.log('Creando cuenta con datos:', finalUser);

      // Simular registro exitoso
      setUser(finalUser);
      setIsFacebookDataModalOpen(false);
      setFacebookDataForm({ name: '', email: '', password: '', confirmPassword: '' });
      setFacebookUserData(null);

    } catch (err) {
      setFacebookDataError('Error al crear la cuenta. Intenta nuevamente.');
    }
  };

  const handleSocialLogin = async (provider) => {
    if (provider === 'facebook') {
      try {
        console.log('Iniciando sesión con Facebook...');
        const result = await facebookService.login();
        
        if (result.success) {
          setUser(result.user);
          setIsLoginModalOpen(false);
          console.log('Login con Facebook exitoso:', result.user);
        } else {
          setLoginError('Error al iniciar sesión con Facebook');
        }
      } catch (error) {
        console.error('Error en login de Facebook:', error);
        setLoginError('Error al conectar con Facebook');
      }
    } else if (provider === 'google') {
      // Simulamos un login exitoso con Google
      console.log('Iniciando sesión con Google...');
      
      // Crear un usuario simulado
      const googleUser = {
        id: 'google_' + Date.now(),
        name: 'Usuario Google',
        email: 'usuario@gmail.com',
        provider: 'google'
      };
      
      // Simular un delay de autenticación
      setTimeout(() => {
        setUser(googleUser);
        setIsLoginModalOpen(false);
        console.log('Login con Google exitoso:', googleUser);
      }, 1500);
    }
  };

  const handleSocialRegister = async (provider) => {
    if (provider === 'facebook') {
      try {
        console.log('Registrándose con Facebook...');
        const result = await facebookService.login();
        
        if (result.success) {
          // Guardar datos de Facebook y abrir modal para completar registro
          setFacebookUserData(result.user);
          setFacebookDataForm({
            name: result.user.name,
            email: result.user.email,
            password: '',
            confirmPassword: ''
          });
          setIsRegisterModalOpen(false);
          setIsFacebookDataModalOpen(true);
          console.log('Datos de Facebook obtenidos:', result.user);
        } else {
          setRegisterError('Error al registrarse con Facebook');
        }
      } catch (error) {
        console.error('Error en registro de Facebook:', error);
        setRegisterError('Error al conectar con Facebook');
      }
    } else if (provider === 'google') {
      // Simulamos un registro con Google (sin login automático)
      console.log('Registrándose con Google...');
      
      // Simular un delay de registro
      setTimeout(() => {
        setIsRegisterModalOpen(false);
        console.log('Registro con Google completado. Por favor, confirma tu cuenta.');
      }, 1500);
    }
  };

  return (
    <>
      {/* Header con glassmorphismo avanzado */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-2xl shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">

            {/* Logo moderno con gradiente */}
            <div className="flex items-center group cursor-pointer flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-xl group-hover:shadow-violet-500/40 transition-all duration-500 group-hover:scale-105">
                  <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7 text-white filter drop-shadow-sm" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl sm:rounded-2xl"></div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
              </div>
              <div className="ml-2 sm:ml-4">
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-violet-800 to-blue-800 bg-clip-text text-transparent">
                  EduLearn
                </h1>
                <p className="text-xs text-gray-500 font-medium hidden sm:block">Aprende jugando</p>
              </div>
            </div>

            {/* Barra de búsqueda mejorada */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-12 relative">
              <form onSubmit={handleSearchSubmit}>
                <div className={`relative group transition-all duration-500 ${
                  isSearchFocused ? 'scale-[1.02]' : ''
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative">
                    <input
                      ref={searchRef}
                      type="text"
                      value={query}
                      onChange={handleSearchChange}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                      placeholder={getMessage('search.placeholder') || "Buscar cursos, ejercicios, juegos..."}
                      className="w-full h-14 pl-14 pr-12 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl text-base placeholder-gray-400 transition-all duration-300 focus:outline-none focus:border-violet-400 focus:bg-white focus:shadow-2xl focus:shadow-violet-500/10 hover:border-gray-300"
                    />
                    <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-violet-600 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    
                    {/* Indicador de carga mejorado */}
                    {loading && (
                      <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                        <div className="relative w-5 h-5">
                          <div className="absolute inset-0 border-2 border-violet-200 rounded-full"></div>
                          <div className="absolute inset-0 border-2 border-violet-600 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>

              {/* Resultados de búsqueda con animaciones */}
              {query.length > 1 && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl shadow-black/10 max-h-96 overflow-y-auto z-50 animate-in slide-in-from-top-2 duration-300">
                  {results.map((result, index) => (
                    <div
                      key={result.id}
                      className={`p-4 hover:bg-gradient-to-r hover:from-violet-50/50 hover:to-purple-50/50 cursor-pointer transition-all duration-200 ${
                        index !== results.length - 1 ? 'border-b border-gray-100/50' : ''
                      } hover:scale-[1.01] group`}
                      onClick={() => {
                        console.log('Seleccionado:', result);
                        setQuery('');
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <span className="text-lg">
                            {result.type === 'worksheet' ? '📄' : '🎮'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 group-hover:text-violet-700 transition-colors duration-200">
                            {result.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate mt-1">
                            {result.description}
                          </div>
                          <div className="text-xs text-violet-600 mt-1 font-medium">
                            {result.type === 'worksheet' ? 'Hoja de Trabajo' : 'Juego Interactivo'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Error de búsqueda mejorado */}
              {error && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-red-50/90 backdrop-blur-sm border border-red-200/50 rounded-2xl shadow-lg p-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2 text-red-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Botones de autenticación modernos */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-semibold text-xs sm:text-sm shadow-lg">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden sm:inline font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                      {user.name}
                    </span>
                    <svg className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Menú desplegable del usuario */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl shadow-black/10 py-2 animate-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100/50">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <button className="w-full px-4 py-3 text-left hover:bg-gray-50/50 transition-colors duration-200 flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-gray-700">Mi perfil</span>
                      </button>
                      <button className="w-full px-4 py-3 text-left hover:bg-gray-50/50 transition-colors duration-200 flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-700">Configuración</span>
                      </button>
                      <div className="border-t border-gray-100/50 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 text-left hover:bg-red-50/50 transition-colors duration-200 flex items-center gap-3 text-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>{getMessage('auth.logout') || 'Cerrar sesión'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="relative px-3 sm:px-6 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border-2 border-violet-200 text-violet-700 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-white hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-0.5 group overflow-hidden"
                  >
                    <span className="relative z-10">{getMessage('auth.login') || 'Iniciar Sesión'}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  <button
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="relative px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/25 group overflow-hidden"
                  >
                    <span className="relative z-10">{getMessage('auth.signup') || 'Registrarse'}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-700 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Espaciador para el header fijo */}
      <div className="h-16 sm:h-20"></div>

      {/* Modal de Login mejorado */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl shadow-black/20 border border-white/20 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-violet-800 bg-clip-text text-transparent">
                  {getMessage('auth.login') || 'Iniciar Sesión'}
                </h2>
                <p className="text-gray-500 mt-1">Accede a tu cuenta para continuar</p>
              </div>
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="w-10 h-10 rounded-2xl bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80 transition-all duration-200 flex items-center justify-center group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-3">
                  Correo electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 hover:border-gray-300"
                    placeholder="tu@email.com"
                    required
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-3">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 hover:border-gray-300"
                    placeholder="••••••••"
                    required
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {loginError && (
                <div className="p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl animate-in slide-in-from-top-1 duration-300">
                  <div className="flex items-center gap-3 text-red-600">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{loginError}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:from-violet-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/25 hover:-translate-y-0.5 relative overflow-hidden group"
              >
                <span className="relative z-10">{getMessage('auth.login') || 'Iniciar Sesión'}</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
              </button>
            </form>

            <div className="mt-8 text-center">
              <span className="text-gray-500">¿No tienes cuenta? </span>
              <button className="text-violet-600 font-semibold hover:text-violet-700 transition-colors duration-200 hover:underline">
                {getMessage('auth.signup') || 'Regístrate aquí'}
              </button>
            </div>

            <div className="mt-6 text-center">
              <button className="text-sm text-gray-400 hover:text-violet-600 transition-colors duration-200">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Registro */}
      <RegisterModal
  isOpen={isRegisterModalOpen}
  onClose={() => setIsRegisterModalOpen(false)}
  onSwitchToLogin={() => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  }}
  onRegisterSuccess={(userData) => {
    setUser(userData);  // ⭐ Igual que en handleLoginSubmit
    setIsRegisterModalOpen(false);
  }}
/>

      {/* Modal de Datos de Facebook */}
      {isFacebookDataModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl shadow-black/20 border border-white/20 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-violet-800 bg-clip-text text-transparent">
                  Completar Registro
                </h2>
                <p className="text-gray-500 mt-1">Confirma tus datos para crear tu cuenta</p>
              </div>
              <button
                onClick={() => {
                  setIsFacebookDataModalOpen(false);
                  setFacebookDataForm({ name: '', email: '', password: '', confirmPassword: '' });
                  setFacebookUserData(null);
                }}
                className="w-10 h-10 rounded-2xl bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80 transition-all duration-200 flex items-center justify-center group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleFacebookDataSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={facebookDataForm.name}
                  onChange={handleFacebookDataInputChange}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 hover:border-gray-300"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={facebookDataForm.email}
                  onChange={handleFacebookDataInputChange}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 hover:border-gray-300"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={facebookDataForm.password}
                  onChange={handleFacebookDataInputChange}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 hover:border-gray-300"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={facebookDataForm.confirmPassword}
                  onChange={handleFacebookDataInputChange}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 hover:border-gray-300"
                  placeholder="••••••••"
                  required
                />
              </div>

              {facebookDataError && (
                <div className="p-3 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl animate-in slide-in-from-top-1 duration-300">
                  <div className="flex items-center gap-3 text-red-600">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{facebookDataError}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-violet-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 relative overflow-hidden group"
              >
                <span className="relative z-10">Crear Cuenta</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-gray-500">
              <p>Al crear tu cuenta, tus datos de Facebook se vincularán con esta cuenta local.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;