// src/components/EmailCaptureModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Download, Mail, CheckCircle, User } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const EmailCaptureModal = ({ ficha, isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Verificar si hay email guardado en localStorage
  useEffect(() => {
    if (isOpen && ficha) {
      const savedEmail = localStorage.getItem('userEmail');
      if (savedEmail) {
        setEmail(savedEmail);
        // Auto-descarga si ya tiene email guardado
        handleAutoDownload(savedEmail);
      }
    }
  }, [isOpen, ficha]);

  // Auto-descarga con email guardado
  const handleAutoDownload = async (savedEmail) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/download/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: savedEmail,
          fichaId: ficha._id || ficha.id
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Abrir PDF en nueva pestaña
        if (data.downloadUrl || ficha.pdfUrl) {
          window.open(data.downloadUrl || ficha.pdfUrl, '_blank');
        }
        // Cerrar modal después de 1.5 segundos
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 1500);
      } else {
        setError(data.message || 'Error al procesar la descarga');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('El email es requerido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/download/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          nombre: nombre || undefined,
          fichaId: ficha._id || ficha.id
        })
      });

      const data = await response.json();

      if (data.success) {
        // Guardar email en localStorage
        localStorage.setItem('userEmail', email);

        setSuccess(true);

        // Abrir PDF en nueva pestaña
        if (data.downloadUrl || ficha.pdfUrl) {
          window.open(data.downloadUrl || ficha.pdfUrl, '_blank');
        }

        // Cerrar modal después de 2 segundos
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setEmail('');
          setNombre('');
        }, 2000);
      } else {
        setError(data.message || 'Error al procesar la descarga');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // No renderizar si no está abierto
  if (!isOpen || !ficha) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 text-white">
            <Download className="w-8 h-8" />
            <div>
              <h2 className="text-xl font-bold">Descargar Ficha</h2>
              <p className="text-blue-100 text-sm">Recibe la ficha en tu email</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            // Mensaje de éxito
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">¡Descarga Iniciada!</h3>
              <p className="text-gray-600">
                La ficha se ha enviado a tu correo y se abrirá en una nueva pestaña.
              </p>
            </div>
          ) : (
            <>
              {/* Preview de la ficha */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  {ficha.thumbnailUrl ? (
                    <img
                      src={ficha.thumbnailUrl}
                      alt={ficha.titulo || ficha.title}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-3xl flex-shrink-0">
                      {ficha.icon || '📄'}
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                      {ficha.titulo || ficha.title}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {ficha.nivel && (
                        <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                          {ficha.nivel}
                        </span>
                      )}
                      {ficha.asignatura && (
                        <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                          {ficha.asignatura}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                {/* Nombre (opcional) */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre <span className="text-gray-400 text-xs">(opcional)</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Botón */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Descargar Ficha</span>
                    </>
                  )}
                </button>

                {/* Texto legal */}
                <p className="text-xs text-gray-500 text-center">
                  Al descargar, aceptas recibir emails educativos. Puedes darte de baja en cualquier momento.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailCaptureModal;
