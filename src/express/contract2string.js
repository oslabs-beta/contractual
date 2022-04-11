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
  "Res@POST@/login": {success: "boolean"}
  "Req@POST@/habits": {habitname: "string", target: "number"},
  "Res@POST@/habits": {currentHabits: "array"}
}
*/

function contract2string(contract) {
  return JSON.stringify(contract);
}

function string2constract(str) {
  return JSON.parse(str);
}

function checkInput(input, contracts, condition) {}
