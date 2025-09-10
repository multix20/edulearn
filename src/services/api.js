// src/services/api.js
import { EDULEARN_CONFIG, isDevelopment } from '../config/index.js';

// Clase base para todas las APIs
class BaseAPI {
  constructor() {
    this.baseURL = EDULEARN_CONFIG.API.BASE_URL;
    this.endpoints = EDULEARN_CONFIG.API.ENDPOINTS;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('edulearn_token');
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    };

    const config = { ...defaultOptions, ...options };

    try {
      if (isDevelopment()) {
        console.log(`🔄 API Request: ${options.method || 'GET'} ${url}`, config);
      }

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (isDevelopment()) {
        console.log(`✅ API Response:`, data);
      }

      return data;
    } catch (error) {
      console.error('❌ API Request failed:', error);
      throw error;
    }
  }

  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Servicio de Búsqueda
export class SearchService extends BaseAPI {
  constructor() {
    super();
    this.cache = new Map();
    this.searchTimeout = null;
  }

  // Búsqueda con debounce y cache
  async search(query, options = {}) {
    return new Promise((resolve, reject) => {
      // Cancelar búsqueda anterior
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      // Implementar debounce
      this.searchTimeout = setTimeout(async () => {
        try {
          const result = await this.performSearch(query, options);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, EDULEARN_CONFIG.SEARCH.DEBOUNCE_DELAY);
    });
  }

  async performSearch(query, options = {}) {
    if (!query || query.length < EDULEARN_CONFIG.SEARCH.MIN_CHARS) {
      return { query, results: [], total: 0 };
    }

    // Verificar cache
    const cacheKey = `${query}_${JSON.stringify(options)}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // En desarrollo, usar datos mock
    if (isDevelopment()) {
      const mockData = this.getMockSearchResults(query, options);
      this.cache.set(cacheKey, mockData);
      return mockData;
    }

    // En producción, hacer llamada real
    const params = {
      q: query,
      limit: EDULEARN_CONFIG.SEARCH.MAX_RESULTS,
      ...options
    };

    const result = await this.get(this.endpoints.search, params);
    this.cache.set(cacheKey, result);
    return result;
  }

  getMockSearchResults(query) {
    // Simular delay de red
    const delay = Math.random() * 500 + 200;
    
    return new Promise(resolve => {
      setTimeout(() => {
        const mockResults = [
          {
            id: 1,
            title: `Hoja de Trabajo: ${query}`,
            type: 'worksheet',
            subject: 'math',
            grade: 'g3',
            description: `Ejercicios interactivos sobre ${query} para 3er grado`,
            thumbnail: '/images/worksheet-math.jpg',
            difficulty: 'intermediate'
          },
          {
            id: 2,
            title: `Juego Educativo: ${query}`,
            type: 'game',
            subject: 'science',
            grade: 'g4',
            description: `Juego divertido para aprender sobre ${query}`,
            thumbnail: '/images/game-science.jpg',
            difficulty: 'beginner'
          },
          {
            id: 3,
            title: `Evaluación: ${query}`,
            type: 'assessment',
            subject: 'language',
            grade: 'g2',
            description: `Evaluación comprehensiva de ${query}`,
            thumbnail: '/images/assessment-language.jpg',
            difficulty: 'beginner'
          }
        ];

        resolve({
          query,
          results: mockResults,
          total: mockResults.length,
          page: 1,
          hasMore: false,
          searchTime: delay
        });
      }, delay);
    });
  }

  // Limpiar cache
  clearCache() {
    this.cache.clear();
  }
}

// Servicio de Contenido
export class ContentService extends BaseAPI {
  async getSubjects() {
    if (isDevelopment()) {
      return {
        subjects: [
          { id: 'math', name: 'Matemáticas', icon: '🔢', color: 'blue', worksheets: 1250, games: 340 },
          { id: 'science', name: 'Ciencias', icon: '🔬', color: 'green', worksheets: 890, games: 275 },
          { id: 'language', name: 'Lenguaje', icon: '📚', color: 'purple', worksheets: 1450, games: 180 },
          { id: 'social', name: 'Estudios Sociales', icon: '🌍', color: 'orange', worksheets: 670, games: 120 }
        ]
      };
    }
    
    return this.get(this.endpoints.subjects);
  }

  async getGrades() {
    if (isDevelopment()) {
      return {
        grades: [
          { id: 'k', name: 'Kinder', order: 0, students: 15000 },
          { id: 'g1', name: '1° Grado', order: 1, students: 18500 },
          { id: 'g2', name: '2° Grado', order: 2, students: 17800 },
          { id: 'g3', name: '3° Grado', order: 3, students: 19200 },
          { id: 'g4', name: '4° Grado', order: 4, students: 16700 },
          { id: 'g5', name: '5° Grado', order: 5, students: 15900 }
        ]
      };
    }
    
    return this.get(this.endpoints.grades);
  }

  async getWorksheets(filters = {}) {
    if (isDevelopment()) {
      return {
        worksheets: [
          {
            id: 1,
            title: 'Suma y Resta Básica',
            subject: 'math',
            grade: 'g2',
            difficulty: 'beginner',
            thumbnail: '/images/math-addition.jpg',
            description: 'Ejercicios básicos de suma y resta',
            duration: 15,
            questions: 20
          },
          {
            id: 2,
            title: 'Estados de la Materia',
            subject: 'science',
            grade: 'g3',
            difficulty: 'intermediate',
            thumbnail: '/images/science-matter.jpg',
            description: 'Explora sólidos, líquidos y gases',
            duration: 25,
            questions: 15
          },
          {
            id: 3,
            title: 'Comprensión Lectora',
            subject: 'language',
            grade: 'g4',
            difficulty: 'intermediate',
            thumbnail: '/images/language-reading.jpg',
            description: 'Mejora tu comprensión de textos',
            duration: 30,
            questions: 12
          }
        ],
        total: 1250,
        page: 1,
        totalPages: 42
      };
    }
    
    return this.get(this.endpoints.worksheets, filters);
  }

  async getGames(filters = {}) {
    if (isDevelopment()) {
      return {
        games: [
          {
            id: 1,
            title: 'Aventura Matemática',
            subject: 'math',
            grade: 'g3',
            type: 'adventure',
            thumbnail: '/images/math-adventure.jpg',
            description: 'Resuelve problemas matemáticos en una aventura épica',
            players: 1,
            duration: 20
          },
          {
            id: 2,
            title: 'Laboratorio Virtual',
            subject: 'science',
            grade: 'g4',
            type: 'simulation',
            thumbnail: '/images/science-lab.jpg',
            description: 'Experimenta de forma segura en un laboratorio virtual',
            players: 1,
            duration: 35
          }
        ]
      };
    }
    
    return this.get(this.endpoints.games, filters);
  }

  async getContent(id, type) {
    const endpoint = type === 'worksheet' 
      ? `${this.endpoints.worksheets}/${id}` 
      : `${this.endpoints.games}/${id}`;
    
    if (isDevelopment()) {
      return {
        id,
        type,
        title: `Contenido ${type} #${id}`,
        content: `Contenido detallado del ${type}`,
        createdAt: new Date().toISOString()
      };
    }
    
    return this.get(endpoint);
  }
}

// Servicio de Autenticación
export class AuthService extends BaseAPI {
  async login(email, password) {
    if (isDevelopment()) {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular error ocasional
      if (email === 'error@test.com') {
        throw new Error('Credenciales incorrectas');
      }
      
      const mockResponse = {
        success: true,
        token: 'mock_token_123456789',
        user: {
          id: 1,
          name: email === 'teacher@test.com' ? 'Profesor Demo' : 'Estudiante Demo',
          email: email,
          role: email === 'teacher@test.com' ? 'teacher' : 'student',
          avatar: '/images/avatar-default.jpg',
          stats: {
            worksheetsCompleted: 45,
            gamesPlayed: 23,
            points: 1250,
            level: 5
          }
        }
      };
      
      localStorage.setItem('edulearn_token', mockResponse.token);
      localStorage.setItem('edulearn_user', JSON.stringify(mockResponse.user));
      
      return mockResponse;
    }
    
    const response = await this.post(`${this.endpoints.auth}/login`, {
      email,
      password
    });
    
    if (response.token) {
      localStorage.setItem('edulearn_token', response.token);
      localStorage.setItem('edulearn_user', JSON.stringify(response.user));
    }
    
    return response;
  }

  async signup(userData) {
    if (isDevelopment()) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      return {
        success: true,
        message: 'Usuario registrado exitosamente',
        user: {
          id: Math.random(),
          name: userData.name,
          email: userData.email,
          role: userData.role || 'student'
        }
      };
    }
    
    return this.post(`${this.endpoints.auth}/signup`, userData);
  }

  async logout() {
    if (!isDevelopment()) {
      await this.post(`${this.endpoints.auth}/logout`);
    }
    
    localStorage.removeItem('edulearn_token');
    localStorage.removeItem('edulearn_user');
    
    return { success: true };
  }

  getCurrentUser() {
    const userJson = localStorage.getItem('edulearn_user');
    return userJson ? JSON.parse(userJson) : null;
  }

  isAuthenticated() {
    return !!localStorage.getItem('edulearn_token');
  }
}

// Instancias singleton de los servicios
export const searchService = new SearchService();
export const contentService = new ContentService();
export const authService = new AuthService();

// Export default con todos los servicios
export default {
  search: searchService,
  content: contentService,
  auth: authService
};