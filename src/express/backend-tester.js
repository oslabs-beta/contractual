// const { mock, mockResponse } = require("./mockResExport.js");
const { checkInput } = require("./contractOp");

const condition = `Res@${type}@${endpoint}`;
// const mockReq = mockResponse(currentContract, condition);

// send mockReq to the endpoint

// get the response and save it to variable data

const res = checkInput(data, currentContract, condition);
