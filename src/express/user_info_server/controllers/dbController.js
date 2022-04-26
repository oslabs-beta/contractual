const db = require("../models/dbModel.js");
const bcrypt = require("bcrypt");

const dbController = {};

// Contract Route => Retrieve content based on token in contracts table
dbController.getContent = async (req, res, next) => {
  // the user imports someone else's contract
  if (req.body.import) {
    const { name, token, userId } = req.body;

    const param = [name, token.toUpperCase()];
    // get contract details for him
    try {
      const getContent = `
      SELECT * FROM contracts
      WHERE token = $2 AND title = $1;
    `;

      const targetContent = await db.query(getContent, param);
      // targetContent returns a JSON object
      const parsedContent = JSON.parse(targetContent.rows[0].content);
      res.locals.content = { content: parsedContent };
    } catch (error) {
      return next({
        // log: 'Express error in getContent middleware',
        log: `dbController.getContent: ERROR: ${error}`,

        status: 400,
        message: {
          err: `dbController.getContent: ERROR: ${error}`,
        },
      });
    }

    // add this contract to history
    try {
      const getContentId = `
      SELECT contract_id FROM contracts
      WHERE token = $1;
    `;

      const contractIdRes = await db.query(getContentId, [token.toUpperCase()]);
      // targetContent returns a JSON object
      const contractId = JSON.parse(contractIdRes.rows[0].contract_id);
      const param2 = [userId, contractId, false];
      console.log("222222", param2);

      const addHistoryQuery = `
    INSERT INTO users_contracts(user_id, contract_id, permission)
    VALUES($1, $2, $3)
    RETURNING *
    ;`;
      await db.query(addHistoryQuery, param2);
      return next();
    } catch (error) {
      return next({
        log: "Express error in adding to history in getContent middleware",
        status: 400,
        message: {
          err: `dbController.getContent: ERROR: ${error}`,
        },
      });
    }
  }

  // user selects his contract, and frontend needs detailed content of the contract
  else {
    const { token } = req.body;
    try {
      const getContent = `
      SELECT * FROM contracts
      WHERE token = $1;
    `;

      const targetContent = await db.query(getContent, [token.toUpperCase()]);
      const parsedContent = JSON.parse(targetContent.rows[0].content);
      res.locals.content = { content: parsedContent };
      return next();
    } catch (error) {
      return next({
        log: `dbController.getContent: ERROR: ${error}`,
        status: 400,
        message: {
          err: `dbController.getContent: ERROR: ${error}`,
        },
      });
    }
  }
};

// Contract Route => Update content based on token in contracts table
dbController.updateContent = async (req, res, next) => {
  const { content, token } = req.body;
  const param = [JSON.stringify(content), token.toUpperCase()];
  console.log("update Content req::::", req);
  try {
    const updateContent = `
    UPDATE contracts SET content = $1 WHERE token = $2;
    `;
    await db.query(updateContent, param);
    return next();
  } catch (error) {
    return next({
      log: `dbController.updateContent: ERROR: ${error}`,
      // log: 'Express error in updateContent middleware',
      status: 400,
      message: {
        err: `dbController.updateContent: ERROR: ${error}`,
      },
    });
  }
};

// Contract Route => Delete the entire contract
// const deleteContractQuery = ` DELETE FROM contracts WHERE token = $1; `

// Contract Route => Create token and contract and store in contracts Table
dbController.addContract = async (req, res, next) => {
  const { title, userId } = req.body;
  // function to generate random token
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

  let contractId;
  const content = {};
  // Store contract in contract table
  try {
    const param1 = [title, content, token, userId];
    const addContractQuery = `
    INSERT INTO contracts(title, content, token, user_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    ;`;
    const addContract = await db.query(addContractQuery, param1);
    // console.log(addContract);
    contractId = addContract["rows"][0]["contract_id"];

    res.locals.token = token;
  } catch (error) {
    // res.locals.token = false;
    // return next();
    return next({
      log: `Express error in addContract middleware: ${error}`,
      status: 400,
      message: {
        err: `dbController.addContract: ERROR: ${error}`,
      },
    });
  }

  // Store contract in user-contract table
  try {
    console.log("CHECKPOINT----------------");
    const param2 = [userId, contractId, true];
    const addHistoryQuery = `
    INSERT INTO users_contracts(user_id, contract_id, permission)
    VALUES($1, $2, $3)
    RETURNING *
    ;`;
    await db.query(addHistoryQuery, param2);
  } catch (error) {
    return next({
      log: `Express error in addContract middleware: ${error}`,
      status: 400,
      message: {
        err: `dbController.addContract: ERROR: ${error}`,
      },
    });
  }
  return next();
};

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
        .json({ success: false, message: "Incorrect Email!" });
    }
    bcrypt.compare(password, userInfo.rows[0].password, (err, result) => {
      if (err) return err;
      // Result return false if plain pw doesn't match hashed pw
      if (!result)
        return res
          .status(404)
          .json({ success: false, message: "Incorrect Password!" });
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
      log: `Express error in checkUser middleware: ${error}`,
      status: 400,
      message: {
        err: `dbController.checkUser: ERROR: ${error}`,
      },
    });
  }
};

dbController.getAccessList = async (req, res, next) => {
  const { userId } = res.locals.loginData;
  const param = [userId];
  try {
    const tokenListQuery = `
    SELECT c.title, c.token, uc.permission
    FROM users_contracts uc INNER JOIN contracts c
    ON uc.contract_id = c.contract_id
    WHERE uc.user_id = $1
    `;

    const accessList = await db.query(tokenListQuery, param);
    // Save accessible tokens and permission into res.locals.loginData
    res.locals.loginData.tokens = {};
    res.locals.loginData.owns = [];
    accessList.rows.forEach((userAccess) => {
      const { title, token, permission } = userAccess;
      res.locals.loginData.tokens[title] = token;
      if (permission) res.locals.loginData.owns.push(token);
    });
    // console.log(accessList.rows);
    // console.log(res.locals.loginData);
    return next();
  } catch (error) {
    return next({
      log: `Express error in getAccessList middleware: ${error}`,
      status: 400,
      message: {
        err: `dbController.getAccessList: ERROR: ${error}`,
      },
    });
  }
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
          const params = [name, email, hash];
          const saveUserQuery = `
          INSERT INTO users (name, email, password)
          VALUES($1, $2, $3)
          RETURNING *
          `;
          const newUser = await db.query(saveUserQuery, params);
          const userId = newUser.rows[0].user_id;
          res.locals.userInfo = {
            success: true,
            userId: userId,
            userName: name,
            tokens: {},
            owns: [],
          };
          return next();
        } catch (error) {
          return next({
            log: `Express error in saveUser middleware: ${error}`,
            status: 400,
            message: {
              err: `dbController.saveUser: ERROR: ${error}`,
            },
          });
        }
      });
    }
  });
};

module.exports = dbController;
