const { mock, mockResponse } = require('./mockResExport.js');

const mockController = {};

/*
const dataContract = {
  'Req@POST@/login': { username: 'string', age: 'number' },
  'Res@POST@/login': { success: 'boolean' },
  'Req@POST@/habits': { habitname: 'string', target: 'number' },
  'Res@POST@/habits': { currentHabits: 'array-boolean-7' },
};
*/

mockController.generateMock = async (req, res, next) => {
  const { method, path } = req;
  const contractKey = `Req@${method}@${path}`;

  try {
    if (!res.locals.report.pass) {
      res.locals.mockRes = 'Type check Failed ❌';
      return next();
    }

    const mockRes = mockResponse(currentContract, contractKey);
    res.locals.mockRes = mockRes;
    return next();
  } catch (error) {
    return next({
      log: 'Express error in generateMock middleware',
      status: 400,
      message: {
        err: `mockController.generateMock: ERROR: ${error}`,
      },
    });
  }
};

module.exports = mockController;
