const badgesPath = './badges';

const skills = [
  {
    id: 'Solidity',
    name: 'Solidity',
    badge: require(`${badgesPath}/solidity.png`),
    description: 'Solidity is a contract-oriented, high-level language whose syntax is similar to that of JavaScript and it is designed to target the Ethereum Virtual Machine (EVM).',
    links: [{
      name: 'Official Website',
      url: 'https://solidity.readthedocs.io/en/develop/'
    }]
  },
  {
    id: 'NodeJS',
    name: 'NodeJS',
    badge: require(`${badgesPath}/node-js.png`),
    description: "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.",
    links: [{
      name: 'Official Website',
      url: 'https://nodejs.org'
    }]
  },
  {
    id: 'ReactJS',
    name: 'ReactJS',
    badge: require(`${badgesPath}/react-js.png`),
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    links: [{
      name: 'Official Website',
      url: 'https://facebook.github.io/react/'
    }]
  },
  {
    id: 'Technical Writing',
    name: 'Technical Writing',
    badge: require(`${badgesPath}/tech-writing.png`),
    description: 'Technical writing is any written form of writing or drafting technical communication used in a variety of technical and occupational fields, such as computer hardware and software, engineering, chemistry, aeronautics, robotics, finance, medical, consumer electronics, and biotechnology.',
    links: [{
      name: 'Wiki',
      url: 'https://wikipedia.org/wiki/Technical_writing'
    }]
  },
  {
    id: 'HTML/CSS',
    name: 'HTML/CSS',
    badge: require(`${badgesPath}/html-css.png`),
    description: [
      'HTML is the standard markup language used to create web pages and its elements form the building blocks of all websites.',
      'Cascading Style Sheets (CSS) is a simple mechanism for adding style (e.g., fonts, colors, spacing) to Web documents.'
    ],
    links: [{
      name: 'HTML Official Website',
      url: 'https://www.w3.org/html/'
    },  {
      name: 'CSS Official Website',
      url: 'https://www.w3.org/Style/CSS/Overview.en.html'
    }]
  },
  {
    id: 'VueJs',
    name: 'VueJS',
    badge: require(`${badgesPath}/vue-js.png`),
    description: 'A progressive, incrementally-adoptable JavaScript framework for building UI on the web',
    links: [{
      name: 'Official Website',
      url: 'http://vuejs.org'
    }]
  }
];

function buildMiscSkill(id) {
  return {
    id: id,
    name: id,
    badge: require(`${badgesPath}/misc.png`),
    description: null,
    links: []
  }
}

export function findSkillById(id) {
  const filtered = skills.filter(s => s.id === id);
  return filtered.length > 0 ? filtered[0] : buildMiscSkill(id);
}

export default skills;
