export const fieldNames = {
  name: 'name',
  email: 'email',
  password: 'password',
  passwordConfirmation: 'passwordConfirmation'
}

export default {
  [fieldNames.name]: {
    presence: true,
  },
  [fieldNames.email]: {
    presence: true,
    email: true
  },
  [fieldNames.password]: {
    presence: true,
    length: {
      minimum: 6
    }
  },
  [fieldNames.passwordConfirmation]: {
    presence: true,
    equality: fieldNames.password
  },
}
