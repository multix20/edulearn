// src/services/facebook.js
class FacebookService {
  constructor() {
    this.isInitialized = false;
    this.appId = '1169998816552438'; // App ID que veo en la imagen
    this.initPromise = null;
    this.isDevelopment = window.location.protocol === 'http:';
  }

  // Inicializar Facebook SDK
  async init() {
    if (this.initPromise) {
      return this.initPromise;
    }

    // En desarrollo (HTTP), simular la inicialización
    if (this.isDevelopment) {
      this.initPromise = Promise.resolve({ status: 'connected' });
      this.isInitialized = true;
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      // Esperar a que el SDK se cargue
      const checkFB = () => {
        if (window.FB) {
          window.FB.init({
            appId: this.appId,
            cookie: true,
            xfbml: true,
            version: 'v18.0'
          });

          // Verificar el estado de login
          window.FB.getLoginStatus((response) => {
            this.isInitialized = true;
            resolve(response);
          });
        } else {
          setTimeout(checkFB, 100);
        }
      };
      checkFB();
    });

    return this.initPromise;
  }

  // Login con Facebook
  async login() {
    try {
      await this.init();

      // En desarrollo, simular el flujo de Facebook con datos realistas
      if (this.isDevelopment) {
        return new Promise((resolve) => {
          // Simular el popup de Facebook y delay
          console.log('🔄 Simulando login de Facebook...');
          
          setTimeout(() => {
            // Simular datos reales que Facebook devolvería
            const mockFacebookUser = {
              success: true,
              user: {
                id: 'fb_' + Date.now(),
                name: 'Juan Pérez',
                email: 'juan.perez@gmail.com', // Email real del usuario
                provider: 'facebook',
                picture: 'https://graph.facebook.com/v18.0/me/picture?type=large',
                accessToken: 'mock_fb_token_' + Date.now()
              }
            };
            
            console.log('✅ Login de Facebook simulado exitoso:', mockFacebookUser.user);
            resolve(mockFacebookUser);
          }, 1000);
        });
      }

      // En producción (HTTPS), usar Facebook real
      return new Promise((resolve, reject) => {
        window.FB.login((response) => {
          if (response.authResponse) {
            // Usuario se logeó exitosamente
            this.getUserInfo(response.authResponse.accessToken)
              .then(userInfo => {
                resolve({
                  success: true,
                  user: {
                    id: response.authResponse.userID,
                    name: userInfo.name,
                    email: userInfo.email,
                    provider: 'facebook',
                    accessToken: response.authResponse.accessToken
                  }
                });
              })
              .catch(error => {
                reject(error);
              });
          } else {
            // Usuario canceló el login
            resolve({
              success: false,
              error: 'Login cancelado por el usuario'
            });
          }
        }, { scope: 'email,public_profile' });
      });
    } catch (error) {
      throw new Error('Error al inicializar Facebook SDK: ' + error.message);
    }
  }

  // Obtener información del usuario
  async getUserInfo(accessToken) {
    if (this.isDevelopment) {
      return {
        name: 'Juan Pérez',
        email: 'juan.perez@gmail.com',
        picture: { data: { url: 'https://graph.facebook.com/v18.0/me/picture?type=large' } }
      };
    }

    return new Promise((resolve, reject) => {
      window.FB.api('/me', { fields: 'name,email,picture' }, (response) => {
        if (response && !response.error) {
          resolve(response);
        } else {
          reject(new Error('Error al obtener información del usuario'));
        }
      });
    });
  }

  // Logout de Facebook
  async logout() {
    if (this.isDevelopment) {
      console.log('🔄 Simulando logout de Facebook...');
      return Promise.resolve({ status: 'unknown' });
    }

    try {
      await this.init();
      
      return new Promise((resolve) => {
        window.FB.logout((response) => {
          resolve(response);
        });
      });
    } catch (error) {
      console.error('Error al cerrar sesión de Facebook:', error);
    }
  }

  // Verificar estado de login
  async getLoginStatus() {
    if (this.isDevelopment) {
      return { status: 'unknown' };
    }

    try {
      await this.init();
      
      return new Promise((resolve) => {
        window.FB.getLoginStatus((response) => {
          resolve(response);
        });
      });
    } catch (error) {
      console.error('Error al verificar estado de login:', error);
      return { status: 'unknown' };
    }
  }
}

// Instancia singleton
export const facebookService = new FacebookService();
export default facebookService;