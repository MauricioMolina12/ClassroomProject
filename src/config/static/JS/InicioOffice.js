

function iniciarSesion() {
    // Credenciales de la aplicación registrada en Azure Portal
    const clientId = 'TU_CLIENT_ID';
    const redirectUri = '';
  
    // URL de autorización de Microsoft
    const authorizationEndpoint = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
  
    // Parámetros de la solicitud de autorización
    const params = {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'token',
      scope: 'openid profile user.read',
    };
  
    // Construir la URL de autorización
    const authUrl = `${authorizationEndpoint}?client_id=${params.client_id}&redirect_uri=${params.redirect_uri}&response_type=${params.response_type}&scope=${params.scope}`;
  
    // Redirigir al usuario a la página de inicio de sesión de Microsoft
    window.location.href = authUrl;
  }