// src/hooks/index.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { searchService, authService, contentService } from '../services/api.js';
import { EDULEARN_CONFIG } from '../config/index.js';

// Hook para búsqueda con debounce
export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchTimeoutRef = useRef(null);

  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.length < EDULEARN_CONFIG.SEARCH.MIN_CHARS) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchService.search(searchQuery);
      setResults(response.results || []);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Efecto para búsqueda con debounce
  useEffect(() => {
    // Limpiar timeout anterior
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Solo buscar si hay query
    if (query.trim()) {
      setLoading(true);
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(query);
      }, EDULEARN_CONFIG.SEARCH.DEBOUNCE_DELAY);
    } else {
      setResults([]);
      setLoading(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, performSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
    searchService.clearCache();
  }, []);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    performSearch,
    clearSearch
  };
};

// Hook para autenticación
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar usuario al inicializar
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(email, password);
      if (response.success) {
        setUser(response.user);
        return response;
      }
    } catch (err) {
      const errorMessage = err.message || getMessage('messages.error');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.signup(userData);
      return response;
    } catch (err) {
      const errorMessage = err.message || getMessage('messages.error');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const isAuthenticated = useCallback(() => {
    return authService.isAuthenticated();
  }, []);

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated,
    setError
  };
};

// Hook para cargar contenido
export const useContent = () => {
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [worksheets, setWorksheets] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSubjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await contentService.getSubjects();
      setSubjects(response.subjects || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadGrades = useCallback(async () => {
    setLoading(true);
    try {
      const response = await contentService.getGrades();
      setGrades(response.grades || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadWorksheets = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const response = await contentService.getWorksheets(filters);
      setWorksheets(response.worksheets || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadGames = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const response = await contentService.getGames(filters);
      setGames(response.games || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    subjects,
    grades,
    worksheets,
    games,
    loading,
    error,
    loadSubjects,
    loadGrades,
    loadWorksheets,
    loadGames
  };
};

// Hook para notificaciones/mensajes
export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      message,
      type,
      timestamp: new Date()
    };

    setNotifications(prev => [...prev, notification]);

    // Auto-remover después del duration especificado
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Funciones helper para diferentes tipos de notificaciones
  const showSuccess = useCallback((message, duration) => 
    addNotification(message, 'success', duration), [addNotification]);

  const showError = useCallback((message, duration) => 
    addNotification(message, 'error', duration), [addNotification]);

  const showWarning = useCallback((message, duration) => 
    addNotification(message, 'warning', duration), [addNotification]);

  const showInfo = useCallback((message, duration) => 
    addNotification(message, 'info', duration), [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

// Hook para localStorage con React state sincronizado
export const useLocalStorage = (key, initialValue) => {
  // Obtener valor inicial del localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar el valor
  const setValue = useCallback((value) => {
    try {
      // Permitir que el valor sea una función como useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Guardar en state
      setStoredValue(valueToStore);
      
      // Guardar en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// Hook para detectar responsive breakpoints
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize.width < EDULEARN_CONFIG.BREAKPOINTS.MOBILE;
  const isTablet = screenSize.width >= EDULEARN_CONFIG.BREAKPOINTS.MOBILE && 
                   screenSize.width < EDULEARN_CONFIG.BREAKPOINTS.DESKTOP;
  const isDesktop = screenSize.width >= EDULEARN_CONFIG.BREAKPOINTS.DESKTOP;

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop
  };
};

// Hook para validación de formularios
// export const useForm = () => { /* implementación aquí */ }