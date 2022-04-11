const db = require('../models/dbModel.js');
const bcrypt = require('bcrypt');

const dbController = {};

// Contract Route => Retrieve content based on token in contracts table
dbController.getContent = async (req, res, next) => {
  const { token } = req.params;
  const param = [token.toUpperCase()];
  try {
    const getContent = `
      SELECT * FROM contracts
      WHERE token = $1;
    `;

    const targetContent = await db.query(getContent, param);
    res.locals.content = targetContent.rows[0].content;
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

// Contract Route => Create token and contract and store in contracts Table
dbController.addContract = async (req, res, next) => {
  // console.log("Hitttttt!!!!!");
  const content = req.body.content;
  const userId = req.body.userId;
  // console.log(content, userId);

  // function to generate random token
  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  let token;
  // Check if token exists in DB
  while (true) {
    token = makeid(4);
    const checkTokenQuery = `
      SELECT * FROM contracts
      WHERE token = $1;
      `;
    const checkToken = await db.query(checkTokenQuery, [token]);
    if (checkToken.rows.length == 0) break;
  }

  // Store content in database
  const params = [content, token, userId];
  const addContractQuery = `
    INSERT INTO contracts(content, token, user_id)
    VALUES($1, $2, $3)
    RETURNING *
    ;`;
  const addContract = await db.query(addContractQuery, params);
  res.locals.token = token;
  return next();
};

// Login Route => verify user info with users Table
dbController.checkUser = async (req, res, next) => {
  const { email, password } = res.locals.loginUser;
  const param = [email, password];
  try {
    const getUser = `
      SELECT * FROM users
      WHERE email=$1 AND password=$2;
    `;
    const user = await db.query(getUser, param);
    res.locals.name = user.rows[0].name;
    return next();
  } catch (error) {
    return next({
      log: 'Express error in checkUser middleware',
      status: 400,
      message: {
        err: `dbController.checkUser: ERROR: ${error}`,
      },
    });
  }
};

// Sign up Route => save user info into users Table
dbController.saveUser = async (req, res, next) => {
  const { name, email, password } = res.locals.newUser;
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, async (err, salt) => {
    if (err) {
      throw err;
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        try {
          params = [name, email, hash];
          const saveUserQuery = `
          INSERT INTO users (name, email, password)
          VALUES($1, $2, $3)
          RETURNING *
          `;
          const newUser = await db.query(saveUserQuery, params);
          return next();
        } catch (error) {
          return next({
            log: 'Express error in saveUser middleware',
            status: 400,
            message: {
              err: `dbController.saveUser: ERROR: ${error}`,
            },
          });
        }
      });
    }
  });

  // try {
  //   const saveUserQuery = `
  //       INSERT INTO users (name, email, password)
  //       VALUES($1, $2, $3)
  //       RETURNING *
  //       `;
  //   const newUser = await db.query(saveUserQuery, params);
  //   // res.locals.userId = newUser.rows[0].id;
  //   return next();
  // } catch (error) {
  //   return next({
  //     log: 'Express error in saveUser middleware',
  //     status: 400,
  //     message: {
  //       err: `dbController.saveUser: ERROR: ${error}`,
  //     },
  //   });
  // }
};

module.exports = dbController;
