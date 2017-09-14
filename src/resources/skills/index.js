const badgesPath = './badges';

const skills = [
  {
    id: 'Solidity',
    name: 'Solidity',
    badge: require(`${badgesPath}/solidity.png`)
  },
  {
    id: 'NodeJS',
    name: 'NodeJS',
    badge: require(`${badgesPath}/node-js.png`)
  },
  {
    id: 'ReactJS',
    name: 'ReactJS',
    badge: require(`${badgesPath}/react-js.png`)
  },
  {
    id: 'Technical Writing',
    name: 'Technical Writing',
    badge: require(`${badgesPath}/tech-writing.png`)
  },
  {
    id: 'HTML/CSS',
    name: 'HTML/CSS',
    badge: require(`${badgesPath}/html-css.png`)
  },
  {
    id: 'VueJs',
    name: 'VueJS',
    badge: require(`${badgesPath}/vue-js.png`)
  }
];

function buildMiscSkill(id) {
  return {
    id: id,
    name: id,
    badge: require(`${badgesPath}/misc.png`)
  }
}

export function findSkillById(id) {
  const filtered = skills.filter(s => s.id === id);
  return filtered.length > 0 ? filtered[0] : buildMiscSkill(id);
}

export default skills;
