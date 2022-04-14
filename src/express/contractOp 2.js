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
  "Res@POST@/habits": {currentHabits: "array-any-any"}
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

  const contract = contracts[condition];

  // check each field
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
    // if is an array
    if (targetType.slice(0, 3) == "arr") {
      // make sure it is an array
      if (!Array.isArray(value)) {
        res.pass = false;
        res.error.push(`type of "${key}" do not match! It should be an array!`);
        continue;
      }
      [elementType, targetLength] = targetType.split("-").slice(1);
      // test element type
      if (elementType !== "any") {
        for (let el of value) {
          const match = typeCheck[elementType](el);
          if (!match) {
            res.pass = false;
            res.error.push(
              `type of array elements for "${key}" do not match! It should only contain "${elementType}"!`
            );
          }
          break;
        }
      }
      // test length
      if (targetLength !== "any") {
        if (value.length != targetLength) {
          res.pass = false;
          res.error.push(
            `array length for "${key}" do not match! It should be ${targetLength}!`
          );
        }
      }
    }
    // not an array
    else {
      const match = typeCheck[targetType](value);
      if (!match) {
        res.pass = false;
        res.error.push(
          `type of "${key}" do not match! It should be ${targetType}!`
        );
      }
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
