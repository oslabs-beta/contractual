const dbController = {};
const db = require("../models/dbModel.js");

dbController.addContract = async (req, res, next) => {
  console.log("Hitttttt!!!!!");
  const content = req.body.content;
  const userId = req.body.userId;
  console.log(content, userId);
  // generate a token
  function makeid(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  let token;

  while (true) {
    token = makeid(4);
    const checkTokenQuery = `
      SELECT * FROM contracts
      WHERE token = $1;
      `;
    const checkToken = await db.query(checkTokenQuery, [token]);
    if (checkToken.rows.length == 0) break;
  }

  // query database to get habits for target date
  const params = [content, token, userId];
  console.log(params);
  const addContractQuery = `
    INSERT INTO contracts(content, token, user_id)
    VALUES($1, $2, $3)
    RETURNING *
    ;`;
  const addContract = await db.query(addContractQuery, params);
  return next();
};

module.exports = dbController;
