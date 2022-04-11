const Chance = require('chance');
const chanceObj = new Chance();
const Person = new Chance();

const generatePerson = () => {
  return {
    name: chanceObj.name(),
  };
};

Person.name();
console.log(Person.name());
console.log(Person.name());

console.log(generatePerson());
