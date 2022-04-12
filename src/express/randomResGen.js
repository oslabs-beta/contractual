const chance = require('chance').Chance();

// Basic Usage
const string = () => chance.string(); // length, pool, alpha, casing, symbols
const letter = () => chance.letter(); // casing: lower
const integer = () => chance.integer({ min: 0, max: 100 });
const floating = () => chance.floating({ min: 0, max: 100 }); // min, max, fixed
const boolean = () => chance.bool();
const falsy = () => chance.falsy();

const word = () => chance.word(); // syllables, length
const sentence = () => chance.sentence(); // words

// Person
const fN = () => chance.first(); // gender
const lN = () => chance.last();
const fullName = () => chance.name();
const email = () => chance.email({ domain: 'email.com' });
const address = () => chance.address();
const city = () => chance.city();
const country = () => chance.country({ full: true });
const phone = () => chance.phone();
const zip = () => chance.zip();

// Animal
const animal = () => chance.animal(); // type

// Time
const date = () => chance.date({ string: true, year: 2022, month: 0 });
const weekday = () => chance.weekday();
const timestamp = () => chance.timestamp();

// Array Generator
const arrGen = (content) => Array.from({ length: 3 }, content);

const mockResponse = {
  name: fullName(),
  isHuman: boolean(),
  email: email(),
  age: integer(),
  country: country(),
  favoriteAnimal: arrGen(animal),
  quote: sentence(),
};

// console.log(mockResponse);
