// backend/src/controllers/downloadController.js
// Controlador para captura de emails y envío de fichas por correo
import nodemailer from 'nodemailer';
import EmailCapture from '../models/EmailCapture.js';
import Ficha from '../models/Ficha.model.js';

// ========================================
// CONFIGURACIÓN DE NODEMAILER
// ========================================
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

// Verificar configuración del transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error en configuración de email:', error);
  } else {
    console.log('✅ Servidor de email listo para enviar mensajes');
  }
});

// ========================================
// TEMPLATES DE EMAIL HTML
// ========================================

const emailTemplateWelcome = (nombre, ficha) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const nombreUsuario = nombre || 'Profesor/a';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido a EduLearn</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                ¡Bienvenido a EduLearn! 🎉
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Hola <strong>${nombreUsuario}</strong>,
              </p>

              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                ¡Gracias por unirte a EduLearn! Estamos emocionados de tenerte en nuestra comunidad de educadores.
              </p>

              <p style="margin: 0 0 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                Aquí está tu ficha de trabajo: <strong>${ficha.titulo}</strong>
              </p>

              <!-- Ficha Card -->
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #667eea;">
                <h2 style="margin: 0 0 10px; color: #667eea; font-size: 20px;">
                  ${ficha.titulo}
                </h2>
                <p style="margin: 0 0 15px; color: #666666; font-size: 14px;">
                  ${ficha.descripcion}
                </p>
                <div style="display: inline-block;">
                  <span style="background-color: #667eea; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; margin-right: 8px;">
                    ${ficha.asignatura}
                  </span>
                  <span style="background-color: #e0e7ff; color: #667eea; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold;">
                    ${ficha.nivel}
                  </span>
                </div>
              </div>

              <!-- Download Button -->
              <table role="presentation" style="margin: 0 auto 30px; border-collapse: collapse;">
                <tr>
                  <td style="border-radius: 4px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <a href="${ficha.pdfUrl}" target="_blank" style="display: inline-block; padding: 16px 40px; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; border-radius: 4px;">
                      📥 Descargar Ficha
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Benefits -->
              <div style="background-color: #f0f4ff; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 15px; color: #333333; font-size: 18px;">
                  Con EduLearn tienes acceso a:
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #666666;">
                  <li style="margin-bottom: 10px;">🎯 Miles de fichas de trabajo organizadas por nivel y asignatura</li>
                  <li style="margin-bottom: 10px;">📚 Contenido alineado con el currículum nacional chileno</li>
                  <li style="margin-bottom: 10px;">⚡ Fichas gratuitas y premium para todas las necesidades</li>
                  <li style="margin-bottom: 10px;">🔄 Nuevo contenido cada semana</li>
                </ul>
              </div>

              <!-- CTA -->
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6; text-align: center;">
                <a href="${frontendUrl}" style="color: #667eea; text-decoration: none; font-weight: bold;">
                  Explora más fichas en nuestra plataforma →
                </a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
              <p style="margin: 0 0 10px; color: #999999; font-size: 12px; text-align: center;">
                Recibiste este email porque solicitaste descargar una ficha en EduLearn.
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                <a href="${frontendUrl}/unsubscribe" style="color: #999999; text-decoration: underline;">
                  Cancelar suscripción
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

const emailTemplateSimple = (ficha) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tu ficha de trabajo</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                Tu ficha está lista 📄
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                Aquí está tu ficha de trabajo: <strong>${ficha.titulo}</strong>
              </p>

              <!-- Ficha Card -->
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #667eea;">
                <h2 style="margin: 0 0 10px; color: #667eea; font-size: 20px;">
                  ${ficha.titulo}
                </h2>
                <p style="margin: 0 0 15px; color: #666666; font-size: 14px;">
                  ${ficha.descripcion}
                </p>
                <div style="display: inline-block;">
                  <span style="background-color: #667eea; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; margin-right: 8px;">
                    ${ficha.asignatura}
                  </span>
                  <span style="background-color: #e0e7ff; color: #667eea; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold;">
                    ${ficha.nivel}
                  </span>
                </div>
              </div>

              <!-- Download Button -->
              <table role="presentation" style="margin: 0 auto 30px; border-collapse: collapse;">
                <tr>
                  <td style="border-radius: 4px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <a href="${ficha.pdfUrl}" target="_blank" style="display: inline-block; padding: 16px 40px; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; border-radius: 4px;">
                      📥 Descargar Ficha
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.6; text-align: center;">
                <a href="${frontendUrl}" style="color: #667eea; text-decoration: none; font-weight: bold;">
                  Descubre más fichas →
                </a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
              <p style="margin: 0 0 10px; color: #999999; font-size: 12px; text-align: center;">
                Recibiste este email porque solicitaste descargar una ficha en EduLearn.
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                <a href="${frontendUrl}/unsubscribe" style="color: #999999; text-decoration: underline;">
                  Cancelar suscripción
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

// ========================================
// FUNCIÓN PRINCIPAL: CAPTURAR Y ENVIAR FICHA
// ========================================

export const captureAndSendFicha = async (req, res) => {
  try {
    const { email, nombre, fichaId } = req.body;

    // Validar datos requeridos
    if (!email || !fichaId) {
      return res.status(400).json({
        success: false,
        message: 'Email y fichaId son requeridos'
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Formato de email inválido'
      });
    }

    // Verificar que la ficha existe
    const ficha = await Ficha.findById(fichaId);
    if (!ficha) {
      return res.status(404).json({
        success: false,
        message: 'Ficha no encontrada'
      });
    }

    // Verificar que la ficha esté publicada
    if (!ficha.isPublished) {
      return res.status(400).json({
        success: false,
        message: 'Esta ficha no está disponible para descarga'
      });
    }

    // Buscar o crear registro de EmailCapture
    let emailCapture = await EmailCapture.findOne({ email: email.toLowerCase() });
    const isNewUser = !emailCapture;

    if (!emailCapture) {
      // Crear nuevo registro
      emailCapture = new EmailCapture({
        email: email.toLowerCase(),
        nombre: nombre || null,
        source: 'descarga',
        totalDescargas: 1,
        ultimaDescarga: new Date(),
        fichasDescargadas: [{
          fichaId: ficha._id,
          fecha: new Date()
        }]
      });

      // Metadata (opcional)
      if (req.headers['user-agent']) {
        emailCapture.metadata = {
          userAgent: req.headers['user-agent'],
          ip: req.ip || req.connection.remoteAddress,
          referrer: req.headers.referer || null
        };
      }

      await emailCapture.save();
    } else {
      // Usuario existente - registrar descarga si no la tiene
      if (!emailCapture.yaDescargo(fichaId)) {
        await emailCapture.registrarDescarga(fichaId);
      }

      // Actualizar nombre si viene y no tenía
      if (nombre && !emailCapture.nombre) {
        emailCapture.nombre = nombre;
        await emailCapture.save();
      }
    }

    // Incrementar contador de descargas en la ficha
    await ficha.incrementarDescargas();

    // Seleccionar template según si es nuevo usuario
    const emailTemplate = isNewUser
      ? emailTemplateWelcome(emailCapture.nombre, ficha)
      : emailTemplateSimple(ficha);

    const emailSubject = isNewUser
      ? '¡Bienvenido a EduLearn! 🎉 Aquí está tu ficha'
      : `Tu ficha: ${ficha.titulo}`;

    // Enviar email
    const mailOptions = {
      from: `"EduLearn" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: emailSubject,
      html: emailTemplate
    };

    await transporter.sendMail(mailOptions);

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: isNewUser
        ? '¡Bienvenido! Revisa tu email para descargar la ficha'
        : 'Email enviado. Revisa tu bandeja de entrada',
      downloadUrl: ficha.pdfUrl,
      isNewUser,
      fichaInfo: {
        id: ficha._id,
        titulo: ficha.titulo,
        nivel: ficha.nivel,
        asignatura: ficha.asignatura
      }
    });

  } catch (error) {
    console.error('Error en captureAndSendFicha:', error);

    // Error específico de email
    if (error.message && error.message.includes('SMTP')) {
      return res.status(500).json({
        success: false,
        message: 'Error al enviar el email. Intenta nuevamente.'
      });
    }

    // Error general
    res.status(500).json({
      success: false,
      message: 'Error al procesar la solicitud',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ========================================
// ESTADÍSTICAS DE DESCARGAS
// ========================================

export const getDownloadStats = async (req, res) => {
  try {
    const stats = await EmailCapture.obtenerEstadisticas();
    const porSource = await EmailCapture.estadisticasPorSource();

    res.status(200).json({
      success: true,
      stats: {
        ...stats,
        porSource
      }
    });
  } catch (error) {
    console.error('Error en getDownloadStats:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas'
    });
  }
};

// ========================================
// VERIFICAR SI EMAIL YA DESCARGÓ FICHA
// ========================================

export const checkIfDownloaded = async (req, res) => {
  try {
    const { email, fichaId } = req.query;

    if (!email || !fichaId) {
      return res.status(400).json({
        success: false,
        message: 'Email y fichaId son requeridos'
      });
    }

    const emailCapture = await EmailCapture.findOne({ email: email.toLowerCase() });

    if (!emailCapture) {
      return res.status(200).json({
        success: true,
        downloaded: false
      });
    }

    const downloaded = emailCapture.yaDescargo(fichaId);

    res.status(200).json({
      success: true,
      downloaded,
      totalDescargas: emailCapture.totalDescargas
    });

  } catch (error) {
    console.error('Error en checkIfDownloaded:', error);
    res.status(500).json({
      success: false,
      message: 'Error al verificar descarga'
    });
  }
};

export default {
  captureAndSendFicha,
  getDownloadStats,
  checkIfDownloaded
};
