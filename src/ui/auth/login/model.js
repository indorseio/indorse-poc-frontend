export const fieldNames = {
  email: 'email',
  password: 'password',
}

export default {
  [fieldNames.email]: {
    presence: true,
    email: true
  },
  [fieldNames.password]: {
    presence: true,
  }
}
