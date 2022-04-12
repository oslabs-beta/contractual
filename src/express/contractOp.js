// ======== Contract to String ==========
/*
Frontend saves all the contracts for a given application in an object. 

In this object, each key-value pair is a contract. 

1. The key is a string, containing the essential info about where this constract should be applied to.
The key is in the format of "<Req|Res>@<POST|GET>@<endpoint>", e.g. "Req@POST@/login"

2. The value is about the content of this contract, which is an object stores all the name-type pairs.
e.g. {username: "string", age: "number"}

The final contracts saved in the state looks like :
{
  "Req@POST@/login": {username: "string", age: "number"},
  "Res@POST@/login": {success: "boolean"},
  "Req@POST@/habits": {habitname: "string", target: "number"},
  "Res@POST@/habits": {currentHabits: "array"}
}
To extract a specific contract from the whole contracts, just do `contracts["Res@POST@/habits"] `
*/

function checkInput(input, contracts, condition) {
  /* 
@return value:
{
  pass: true | false，
  error:[]
}
*/
  const typeCheck = {
    number: (x) => typeof x === "number",
    string: (x) => typeof x === "string",
    boolean: (x) => typeof x === "boolean",
    array: (x) => Array.isArray(x),
    object: (x) => typeof x === "object" && !Array.isArray(x) && x !== null,
  };

  // input has to be an object
  if (!typeCheck["object"](input))
    return { pass: false, error: ["The input is not an object!"] };

  // condition must have been in the contracts
  if (contracts[condition] == undefined)
    return {
      pass: false,
      error: ["The endpoint or the fetch method do not exist!"],
    };

  const res = {
    pass: true,
    error: [],
  };

  // check each field
  const contract = contracts[condition];
  for (let key in contract) {
    // key name doesn't match, record this error and continue
    if (input[key] === undefined) {
      res.pass = false;
      res.error.push(`${key} not found in the input!`);
      continue;
    }
    // key name matches, then check the value type
    const targetType = contract[key];
    const value = input[key];
    const match = typeCheck[targetType](value);
    if (!match) {
      res.pass = false;
      res.error.push(`type of "${key}" do not match! It should be ${targetType}!`);
    }
  }
  return res;
}

function contract2string(contract) {
  return JSON.stringify(contract);
}

function string2constract(str) {
  return JSON.parse(str);
}

module.exports = { contract2string, string2constract, checkInput };
