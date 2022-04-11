const Chance = require('chance');
const chanceObj = new Chance();

const generatePerson = () => {
  return {
    name: chanceObj.name(),
  };
};
