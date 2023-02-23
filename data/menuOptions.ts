
const loginOptions = [
  {
    label: 'Registrarse',
    href: '/register'
  }
]

const authenticatedOptions = [
  {
    label: 'Nueva Receta',
    href: '/recipe/new'
  },
  {
    label: 'Cambiar contraseña',
    href: '/change-password'
  },
  {
    label: 'Mis recetas',
    href: '/own-recipes'
  },
  {
    label: 'Favoritas',
    href: '/favorites'
  },
  {
    label: 'Historial',
    href: '/history'
  }
]

export default { loginOptions, authenticatedOptions }
