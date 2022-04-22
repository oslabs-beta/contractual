const chance = require('chance').Chance();

const randomize = {
  // Primitive
  string: () => chance.string({ alpha: true }), // length, pool, alpha, casing, symbols
  letter: () => chance.letter(), // casing: lower
  number: () => chance.integer({ min: 0, max: 30 }),
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
  array: (content, length) =>
    Array.from({ length: length }, randomize[content]),

  // Data Contract Method
};

/**
 * Generate mock response based on data contract
 * @param contracts - data contracts
 * @param condition - key in data contracts
 */

function genMockResponse(contracts, condition) {
  // Check if condition exists in contracts
  if (!(condition in contracts)) return 'Condition not found!';

  // Set the corresponding condition O(n), req@... => res@...
  let reqOrRes = condition[2] === 'q' ? 's' : 'q';
  const resCondition = condition.replace(condition[2], reqOrRes);
  // Retreive the expected data contract from user
  const mockResponseTemplate = contracts[resCondition];
  // Generate mock with homemade randomize obj method
  const mockRes = {};
  for (let key in mockResponseTemplate) {
    const dataType = mockResponseTemplate[key];
    if (dataType.includes('array')) {
      // Handle mock array here!

      const parsedArrType = handleArray(dataType);
      mockRes[key] = randomize.array(parsedArrType[0], parsedArrType[1]);
    } else {
      mockRes[key] = randomize[dataType]();
    }
  }
  return mockRes;
}

// Extract array-type-length format
function handleArray(dataTypeStr) {
  // const 
  const mockArrContent = dataTypeStr.split('-')[1];
  const mockArrLength = dataTypeStr.split('-')[2];
  if (mockArrLength === 'any') {
    return [mockArrContent, randomize.number()];
  } 
  // else if (mockArrLength === 'any') {
  //   return 
  // }
  return [mockArrContent, Number(mockArrLength)];
}

// const dataContract = {
//   'Req@POST@/login': { username: 'string', age: 'number' },
//   'Res@POST@/login': { success: 'boolean' },
//   'Req@POST@/habits': { habitname: 'string', target: 'number' },
//   'Res@POST@/habits': { currentHabits: 'array-boolean-7' },
// };

// console.log(genMockResponse(dataContract, 'Req@POST@/habits'));

exports.mock = randomize;
exports.mockResponse = genMockResponse;

// string 5
