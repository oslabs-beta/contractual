// ======== Contract to String ==========
/*
Input from frontend should be an object. It contains the following properties:
1. request: boolean   if true, then this is a request; otherwise, this is a response
2. type: string "POST"|"GET"  clarifying the type of the request
3. endpoint: string  clarifying the endpoint of the request
4. data: object  the data object stores all the name-type pairs

An example of a request:
{
  request:true,
  type: "POST",
  endpoint: "/login",
  data: {username: "string", age: "number"}
}

An example of a response:
{
  request:false,
  type: "POST",
  endpoint: "/login",
  data: {success: "boolean"}
}

*/

function contract2string(contract) {
  return JSON.stringify(contract);
}

function string2constract(str) {
  return JSON.parse(str);
}

