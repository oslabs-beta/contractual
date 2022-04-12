const chance = require('chance').Chance();

const content = {
  // Primitive
  string: () => chance.string(), // length, pool, alpha, casing, symbols
  letter: () => chance.letter(), // casing: lower
  integer: () => chance.integer({ min: 0, max: 100 }),
  floating: () => chance.floating({ min: 0, max: 100 }), // min, max, fixed
  boolean: () => chance.bool(),
  falsy: () => chance.falsy(),

  // Text
  word: () => chance.word(), // syllables, length
  sentence: () => chance.sentence(), // words

  // Person
  fN: () => chance.first(), // gender
  lN: () => chance.last(),
  fullName: () => chance.name(),
  email: () => chance.email({ domain: 'email.com' }),
  address: () => chance.address(),
  city: () => chance.city(),
  country: () => chance.country({ full: true }),
  phone: () => chance.phone(),
  zip: () => chance.zip(),

  // Animal
  animal: () => chance.animal(), // type

  // Time
  date: () => chance.date({ string: true, year: 2022, month: 0 }),
  weekday: () => chance.weekday(),
  timestamp: () => chance.timestamp(),

  // Array Generator
  arrGen: (content) => Array.from({ length: 3 }, content),
};

module.exports = content;
