
const { google } = require('googleapis');
const accountTransport = require('./account-transporter.json');
const OAuth2 = google.auth.OAuth2;

const mail = async (callback, mailOptions) => {
  const oauth2Client = new OAuth2(
    accountTransport.auth.clientId,
    accountTransport.auth.clientSecret,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: accountTransport.auth.refreshToken,
    tls: {
      rejectUnauthorized: false
    }
  });

  // Verificar si el refresh token ha expirado
  const isTokenExpired = oauth2Client.isTokenExpiring();

  if (isTokenExpired) {
    // Generar un nuevo token de acceso y un nuevo refresh token
    const tokens = await oauth2Client.refreshAccessToken();
    const newAccessToken = tokens.credentials.access_token;
    const newRefreshToken = tokens.credentials.refresh_token;

    // Actualizar los tokens en el objeto accountTransport
    accountTransport.auth.accessToken = newAccessToken;
    accountTransport.auth.refreshToken = newRefreshToken;
  }

  // Llamar a la función de devolución de llamada con el objeto accountTransport actualizado
  callback(accountTransport);
};


module.exports = mail;
