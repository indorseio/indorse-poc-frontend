export const fieldNames = {
  oldPassword: 'oldPassword',
  newPassword: 'newPassword',
  newPasswordConfirmation: 'newPasswordConfirmation'
}

export default {
  [fieldNames.oldPassword]: {
    presence: true,
  },
  [fieldNames.newPassword]: {
    presence: true,
    length: {
      minimum: 6
    }
  },
  [fieldNames.newPasswordConfirmation]: {
    presence: true,
    equality: fieldNames.newPassword
  },
}
