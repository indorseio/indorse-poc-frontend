export const fieldNames = {
  title: 'title',
  description: 'description',
  proof: 'proof'
}

export const skills = [
  'Solidity',
  'NodeJS',
  'ReactJS',
  'Technical Writing',
  'HTML/CSS',
  'VueJs'
];

export default {
  [fieldNames.title]: {
    presence: true,
    inclusion: skills
  },
  [fieldNames.description]: {
    presence: true
  },
  [fieldNames.proof]: {
    presence: {
      allowEmpty: true
    },
    url: {
      schemes: ['http', 'https']
    }
  }
}
