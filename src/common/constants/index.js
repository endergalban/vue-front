const constants = {
  appName: 'Mi Super App',
  error: {
    '-1': 'No se pudo establecer la conexión con el servidor.',
    400: 'Solicitud mal formada.',
    401: 'Token expirado. Por favor, inicie sesión nuevamente.',
    403: 'Acceso denegado.',
    404: 'Registro no encontrado.',
    406: 'La solicitud no es permitida y no se puede procesar.',
    500: 'Error interno del servidor.',
    504: 'Tiempo de espera agotado.',
    delete: 'Error al eliminar el registro.',
    geolocation: 'El navegador utilizado no soporta geolocalización.',
    post: 'Error al crear el registro.',
    put: 'Error al actualizar el registro.',
    unknown: 'Error desconocido.',
  },
  langs: {
    en: {
      logout: 'Login',
      close: 'Close',
    },
    es: {
      logout: 'Salir',
      close: 'Cerrar',
    },
  },
  snackbarTime: 6000,
};

export default constants;
