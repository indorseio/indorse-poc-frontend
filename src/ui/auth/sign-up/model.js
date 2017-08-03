export const fieldNames = {
  name: 'name',
  email: 'email',
  ethereumAddress: 'ethereumAddress',
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
  [fieldNames.ethereumAddress]: {
    presence: true,
    ethereumAddress: true
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
