const db = require('../models/dbModel.js');
// const mock = require('../../mockResExport.js');
// const mockResponse = require('../')
const { mock, mockResponse } = require('../../mockResExport.js');

const dbController = {};

dbController.getContent = async (req, res, next) => {
  const { token } = req.params;
  const param = [token.toUpperCase()];
  try {
    const getContent = `
      SELECT * FROM contracts
      WHERE token = $1;
    `;

    const targetContent = await db.query(getContent, param);
    // targetContent returns a JSON object
    currentContract = JSON.parse(targetContent.rows[0].content);
    return next();
  } catch (error) {
    return next({
      log: 'Express error in getContent middleware',
      status: 400,
      message: {
        err: `dbController.getContent: ERROR: ${error}`,
      },
    });
  }
};

/*
const dataContract = {
  'Req@POST@/login': { username: 'string', age: 'number' },
  'Res@POST@/login': { success: 'boolean' },
  'Req@POST@/habits': { habitname: 'string', target: 'number' },
  'Res@POST@/habits': { currentHabits: 'array-boolean-7' },
};
*/

dbController.generateMock = async (req, res, next) => {
  const { method, path } = req;
  const contractKey = `Req@${method}@${path}`;
  console.log(currentContract);
  console.log(contractKey);
  console.log('OUTPUT_____', mockResponse(currentContract, contractKey));
  return next();
};

module.exports = dbController;
