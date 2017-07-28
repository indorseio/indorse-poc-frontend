export const fieldNames = {
  email: 'email',
  password: 'password',
  passwordConfirmation: 'passwordConfirmation',
  passwordToken: 'passwordToken'
}

export default {
  [fieldNames.email]: {},
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
  [fieldNames.passwordToken]: {},
}
