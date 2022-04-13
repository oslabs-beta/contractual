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
    // targetContent returns a JSON object
    const parsedContent = JSON.parse(targetContent.rows[0].content);
    res.locals.content = { content: parsedContent };
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
  const { title, content, userId } = req.body;
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
  const params = [title, content, token, userId];
  const addContractQuery = `
    INSERT INTO contracts(title, content, token, user_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    ;`;
  const addContract = await db.query(addContractQuery, params);
  // res.locals.contractid = addContract.rows[0].contract_id;
  res.locals.token = token;
  // console.log('test', res.locals.contractid, res.locals.token);
  return next();
};

// dbController.linkUserContract = async (req, res, next) => {

// }

// Login Route => verify user info with users Table
dbController.checkUser = async (req, res, next) => {
  const { email, password } = res.locals.loginUser;
  const param = [email];
  try {
    const verifyQuery = `
      SELECT * FROM users
      WHERE email = $1;
    `;
    const userInfo = await db.query(verifyQuery, param);
    // Verify if email already exists
    if (userInfo.rows[0] === undefined) {
      return res
        .status(404)
        .json({ success: false, message: 'Incorrect Email!' });
    }
    bcrypt.compare(password, userInfo.rows[0].password, (err, result) => {
      if (err) return err;
      // Result return false if plain pw doesn't match hashed pw
      if (!result)
        return res
          .status(404)
          .json({ success: false, message: 'Incorrect Password!' });
      const loginRes = {
        success: true,
        userId: userInfo.rows[0].user_id,
        userName: userInfo.rows[0].name,
        // tokens:
        // owns:
      };
      res.locals.loginData = loginRes;
      return next();
    });
  } catch (error) {
    return next({
      log: 'Express error in checkUser middleware',
      status: 400,
      message: {
        err: `dbController.checkUser: ERROR: ${error}`,
      },
    });
  }
  // Without b-crypt
  // const { email, password } = res.locals.loginUser;
  // const param = [email, password];
  // try {
  //   const getUser = `
  //     SELECT * FROM users
  //     WHERE email=$1 AND password=$2;
  //   `;
  //   const user = await db.query(getUser, param);
  //   res.locals.name = user.rows[0].name;
  //   return next();
  // } catch (error) {
  //   return next({
  //     log: 'Express error in checkUser middleware',
  //     status: 400,
  //     message: {
  //       err: `dbController.checkUser: ERROR: ${error}`,
  //     },
  //   });
  // }
};

// Sign up Route => save user info into users Table
dbController.saveUser = async (req, res, next) => {
  const { name, email, password } = res.locals.newUser;
  const saltRounds = 10;

  // bcrypt magic, generates hashed password
  bcrypt.genSalt(saltRounds, async (err, salt) => {
    if (err) {
      throw err;
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) return err;
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
  // Without b-crypt
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
