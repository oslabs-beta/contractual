const chance = require('chance').Chance();

const randomize = {
  // Primitive
  string: () => chance.string({ alpha: true }), // length, pool, alpha, casing, symbols
  letter: () => chance.letter(), // casing: lower
  number: () => chance.integer({ min: 0, max: 100 }),
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
  array: (content) => Array.from({ length: 3 }, content),
};

/**
 * Generate mock response based on data contract
 * @param contracts - data contracts
 * @param condition - key in data contracts
 */

function mockResponse(contracts, condition) {
  // Check if condition exists in contracts
  if (!(condition in contracts)) return 'Condition not found!';

  // Set the corresponding condition O(n), req@... => res@...
  let reqOrRes = condition[2] === 'q' ? 's' : 'q';
  const resCondition = condition.replace(condition[2], reqOrRes);

  // Retreive the expected data contract from user
  const mockResponse = contracts[resCondition];

  // Generate mock with homemade randomize obj method
  for (let key in mockResponse) {
    const dataType = mockResponse[key];
    if (dataType === 'array') {
      mockResponse[key] = randomize[dataType](randomize.string);
    } else {
      mockResponse[key] = randomize[dataType]();
    }
  }
  return mockResponse;
}

const dataCon = {
  'Req@POST@/login': { username: 'string', age: 'number' },
  'Res@POST@/login': { success: 'boolean' },
  'Req@POST@/habits': { habitname: 'string', target: 'number' },
  'Res@POST@/habits': { currentHabits: 'array' },
};

console.log(mockResponse(dataCon, 'Res@POST@/login'));

module.exports = randomize;
