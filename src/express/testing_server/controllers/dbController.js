const db = require("../models/dbModel.js");

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
    console.log(currentContract);
    return next();
  } catch (error) {
    return next({
      log: `Express error in getContent middleware ${error}`,
      status: 400,
      message: {
        err: `dbController.getContent: ERROR: ${error}`,
      },
    });
  }
};

module.exports = dbController;
