export const fieldNames = {
  email: 'email',
}

export default {
  [fieldNames.email]: {
    presence: true,
    email: true
  }
}
