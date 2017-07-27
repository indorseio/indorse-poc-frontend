export const fieldNames = {
  title: 'title',
  description: 'description',
  proof: 'proof'
}

export default {
  [fieldNames.title]: {
    presence: true
  },
  [fieldNames.description]: {
    presence: true
  },
  [fieldNames.proof]: {
    presence: true
  }
}
