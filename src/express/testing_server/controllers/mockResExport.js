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
      const mockArray = handleArray(dataType);
      mockRes[key] = mockArray;
    } else {
      mockRes[key] = randomize[dataType]();
    }
  }
  return mockRes;
}

/**
 * Generate mock response based on data contract
 * @param dataTypeStr - extract contract key 'array-content-length'
 */
function handleArray(dataTypeStr) {
  // chancePrimitives handles random data type you want in your random generated array
  const chancePrimitives = [
    // 'fN',
    // 'country',
    // 'word',
    // 'animal',
    // 'number',
    // 'boolean',
    // 'date',
    'number',
  ];
  const mockArray = [];
  const mockArrContent = dataTypeStr.split('-')[1];
  const mockArrLength = dataTypeStr.split('-')[2];
  const randomLength = randomize.number();

  if (mockArrContent === 'any') {
    const length = mockArrLength === 'any' ? randomLength : mockArrLength;
    for (let i = 0; i < length; i += 1) {
      const randomNum = Math.floor(Math.random() * chancePrimitives.length);
      const dataType = chancePrimitives[randomNum];
      const randomContent = randomize[dataType]();
      mockArray.push(randomContent);
    }
    return mockArray;
  } else if (mockArrLength === 'any') {
    return randomize.array(mockArrContent, randomLength);
  }
}

const dataContract = {
  'Req@POST@/login': { username: 'string', age: 'number' },
  'Res@POST@/login': { success: 'boolean' },
  'Req@POST@/habits': { habitname: 'string', target: 'number' },
  'Res@POST@/habits': { currentHabits: 'array-any-any' },
};


exports.mock = randomize;
exports.mockResponse = genMockResponse;
