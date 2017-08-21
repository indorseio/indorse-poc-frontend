export const fieldNames = {
  email: 'email',
}

export default {
  [fieldNames.email]: {
    presence: {
      allowEmpty: true
    },
    email: true
  }
}
