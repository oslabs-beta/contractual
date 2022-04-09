const dbController = {};
const db = require("../models/dbModels");

dbController.getMoreDay = async (req, res, next) => {
  // create variable target date set equal to current date less difference dates
  const userId = req.body.userId;

  // get target date
  const currentDate = new Date();
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const normCurrentDate = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const targetDay = new Date(normCurrentDate - (req.body.difference * _MS_PER_DAY)).toISOString().split('T')[0];
  res.locals.date = targetDay;

  // query database to get habits for target date
  const params = [userId, targetDay];
  const getMoreDayQuery = `
    SELECT habit_name, fullfilled_percent FROM user_habit_records
    WHERE user_id=$1 AND date=$2
    ;`;
  const getMoreDay = await db.query(getMoreDayQuery, params);
  res.locals.thatDaysHabits = getMoreDay.rows;
  return next();
}

dbController.deleteUser = async (req, res, next) => {
  //need email and password.
  const { email, password } = req.body;
  // console.log("req body: ", req.body);
  params = [email, password];
  try {
    const deleteUserQuery = `DELETE FROM users WHERE email = $1 AND password = $2;`;
    const deletedUser = await db.query(deleteUserQuery, params);
    res.locals.success = true;
    return next();
  } catch (error) {
    return next({
      log: "Express error in deleteUser middleware",
      status: 400,
      message: {
        err: `dbController.deleteUser: ERROR: ${error}`,
      },
    });
  }
};

// Store new user's account info into Databse
dbController.saveUser = async (req, res, next) => {
  const { firstName, lastName, username, email, password } = res.locals.newUser;
  params = [firstName, lastName, username, email, password];
  try {
    const saveUserQuery = `
        INSERT INTO users (first_name, last_name, username, email, password)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
        `;
    const newUser = await db.query(saveUserQuery, params);
    //res.locals.userId = newUser.rows[0].id;
    //  console.log("newUser BODYYYYY: ", newUser);
    // res.locals.userId; // look at newUser body
    // res.locals.username; // look at newUser body
    // res.locals.success = true;
    res.locals.loginUser = { 
      email: email, 
      password: password 
    }
    return next();
  } catch (error) {
    return next({
      log: "Express error in saveUser middleware",
      status: 400,
      message: {
        err: `dbController.saveUser: ERROR: ${error}`,
      },
    });
  }
};

// Validate matching user info from frontend and database
dbController.checkUser = async (req, res, next) => {
  // res.locals.loginUser
  const { email, password } = res.locals.loginUser;
  params = [email, password];
  try {
    const checkUserQuery = `
    SELECT id AS userId, username
    FROM users
    WHERE email = $1 AND password = $2
    `;
    // SELECT id AS userId FROM users
    // WHERE email = $1 AND password = $2

    // SELECT id AS userId, username
    // FROM users
    // WHERE email = $1 AND password = $2
    const result = await db.query(checkUserQuery, params);
    if (result.rows.length) {
      res.locals.result = result.rows[0];
      res.locals.result['success'] = true;
      // res.locals.result.userID = result.row[0] // gives userID
      // res.locals.result.username = result.row[3] // gives username
      return next();
    }
    return next({
      log: "No such user or pw dont match",
      status: 400,
      message: {
        err: `dbController.checkUser: no such user or pw dont match`,
      },
    });
  } catch (error) {
    return next({
      log: "Express error in checkUser middleware",
      status: 400,
      message: {
        err: `dbController.checkUser: ERROR: ${error}`,
      },
    });
  }
};

// return past history and today's record
dbController.getUserInfo = async (req, res, next) => {
  const userId = res.locals.userId;
  //const todaysDate = new Date().toISOString().split('T')[0];
  //console.log(todaysDate)
  console.log(userId);
  // check if the current day already exists in the database for the specific user
  const doesDateExistQuery = `
  SELECT * FROM user_habit_records
  WHERE user_id=$1 AND date=CURRENT_DATE
  ;`;

  const doesDateExist = await db.query(doesDateExistQuery, [userId]);
  //console.log(doesDateExist.rows);

  if (!doesDateExist.rows.length) {
    console.log("no date found, making a new one");
    const activeHabitQuery = `
    SELECT * FROM user_habits
    WHERE user_id=$1 AND active='true';
    `;
    const activeHabits = await db.query(activeHabitQuery, [userId]);
    //console.log(activeHabits.rows);

    // insert habit into user habit record for each active habit the user has
    for (let habit of activeHabits.rows) {
      console.log(activeHabits.rows, habit["habit_name"]);
      const params = [userId, habit["habit_name"], 0];
      const insertUHRQuery = `
      INSERT INTO user_habit_records (user_id, habit_name, date, fullfilled_percent)
      VALUES ($1, $2, CURRENT_DATE, $3)
      ;`;
      const UHRquery = await db.query(insertUHRQuery, params);
    }
    const params2 = [userId, 0];
    const insertDailyAvgsQuery = `
    INSERT INTO daily_avgs (user_id, date, avg_percent)
    VALUES ($1, CURRENT_DATE, $2)
    ;`;
    const dailyAvgsQuery = await db.query(insertDailyAvgsQuery, params2);
  }
  // INSERT INTO user_habits (user_id, habit_name, target_num, active)
  // VALUES ($1, $2, $3, 'true');
  //   `;
  //generate a new day.
  //create query to check if
  //check to see if todays date exists in the database.
  //create an insert query to the appropriate tables where userId and active is true.
  //select habit_name from user-habit where user_id=$1 and active = true;
  // save that to a variable.
  //insert into user-habit record the user_id, habit_name, the current date, and then a fulfilled of 0.
  //insert into daily-avg user_id, date, avg_percent of 0.
  //date.toISOString();

  // Get Calendar current date and its the past 42 days
  const calendarQuery = `
      SELECT avg_percent, date FROM daily_avgs
      WHERE user_id=$1 AND date BETWEEN (SELECT CURRENT_DATE)-integer'41' AND (SELECT CURRENT_DATE)
      ORDER BY date;
        `;
  // Populate calendarArray with 42 days // date2.getTime() - date1.getTime(), check if difference is 1. If so, push in the info. If greater than, then push in 0 until it is 1.
  const habitRecord = await db.query(calendarQuery, [userId]);
  res.locals.calendarRecord = []; //
  console.log("here is the habit record.rows ", habitRecord.rows.length);

  // generate all 0 array
  for (let i = 0; i < 42; i++) {
    res.locals.calendarRecord.push(0);
  }
  // get current date
  const currentDateQuery = `SELECT CURRENT_DATE;`;
  const currentDate = await db.query(currentDateQuery);
  const today = currentDate.rows[0].current_date;

  // helper function to calculate the date difference
  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  const habitRecordRows = habitRecord.rows;
  for (let row of habitRecordRows) {
    const thatDate = new Date(row.date);
    const diff = dateDiffInDays(thatDate, today);
    res.locals.calendarRecord[41 - diff] = Number(row.avg_percent);
  }
  // for (let j = 0; j < habitRecordRows.length - 1; j++){
  //   let dateDiff = (habitRecordRows[j + 1].date - habitRecordRows[j].date) / (1000 * 3600 * 24);
  //   console.log(habitRecordRows[j+ 1].date, dateDiff);
  //   if (dateDiff === 1){
  //     res.locals.calendarRecord.push(Number(habitRecordRows[j].avg_percent))
  //   } else {
  //     while (dateDiff > 1){
  //       res.locals.calendarRecord.push(0);
  //       dateDiff--;
  //     }
  //     res.locals.calendarRecord.push(Number(habitRecordRows[j].avg_percent))
  //   }
  // }

  //uhr
  // Retrieve today's habit progress
  const todayRecordQuery = `
        SELECT user_id, habit_name, fullfilled_percent
        FROM user_habit_records
        WHERE date=(SELECT CURRENT_DATE) AND user_habit_records.user_id=$1;`;
  const todayRecord = await db.query(todayRecordQuery, [userId]);
  res.locals.todayHabit = [];

  // Extract data from database and store into habit
  for (let row of todayRecord.rows) {
    const habit = {};
    habit.habitName = row.habit_name;

    // find target number
    const targetQuery = `
    SELECT target_num FROM user_habits
    WHERE user_id=$1 AND habit_name=$2;
    `;
    const targetNum = await db.query(targetQuery, [
      row.user_id,
      row.habit_name,
    ]);
    habit.targetNum = targetNum.rows[0].target_num;

    habit.fulfilledPercent = row.fullfilled_percent;
    res.locals.todayHabit.push(habit);
  }
  return next();
};



// add a new user-habit pair
dbController.assignHabit = async (req, res, next) => {
  // add to user-habits table

  const user_id = res.locals.user_id;
  const habit_name = res.locals.habit_name;
  const target_num = res.locals.target_num;

  const insertUserHabitQuery = `
      INSERT INTO user_habits (user_id, habit_name, target_num, active)
      VALUES ($1, $2, $3, 'true');
        `;

  const insertUserHabit = await db.query(insertUserHabitQuery, [
    user_id,
    habit_name,
    target_num,
  ]);

  // add a new user-habit-record row
  const insertUHRQuery = `
      INSERT INTO user_habit_records (user_id, habit_name, date, fullfilled_percent)
      VALUES ($1, $2, (SELECT CURRENT_DATE), 0);
      `;
  const insertUHR = await db.query(insertUHRQuery, [user_id, habit_name]);

  // update the corresponding row in daily-count (update or create)
  const checkDailyExistQuery = `SELECT * FROM daily_avgs
  WHERE user_id=$1 AND date=(SELECT CURRENT_DATE);`;
  const checkExist = await db.query(checkDailyExistQuery, [userId]);

  const exist = checkExist.rows.length !== 0;

  const dayAvgQuery = `
    SELECT AVG (fullfilled_percent)
    FROM user_habit_records
    WHERE user_id=$1 AND date=(SELECT CURRENT_DATE);
  `;

  const dayAvg = await db.query(dayAvgQuery, [userId]);
  // console.log("dayAvg: ", dayAvg);
  const average = dayAvg.rows[0].avg;

  const insertDaysTotalAverageQuery = `
  INSERT INTO daily_avgs (user_id, date, avg_percent)
  VALUES ($1, (SELECT CURRENT_DATE), 0);`

  const updateDaysTotalAverageQuery = `
    UPDATE daily_avgs
    SET avg_percent = $1
    WHERE user_id=$2 AND date=(SELECT CURRENT_DATE)
  `;
if (exist){
  const update = await db.query(updateDaysTotalAverageQuery, [
    average,
    user_id,
  ]);
}
else{
  const insert = await db.query(insertDaysTotalAverageQuery,[user_id]);
}

  return next();
};

// update today's record
dbController.updateRecord = async (req, res, next) => {
  // update user-habit-records
  const userId = res.locals.userId;
  const habitName = res.locals.habitName;
  const newNum = res.locals.newNum;

  // find target number
  const targetQuery = `
    SELECT target_num FROM user_habits
    WHERE user_id=$1 AND habit_name=$2;
    `;
  const targetNum = await db.query(targetQuery, [userId, habitName]);
  // console.log("dbController.updateRecord, targetNum query: ", targetNum)
  const target = targetNum.rows[0].target_num;
  //console.log(target, typeof target);
  let newPercent = 0;
  
  newPercent = Math.min(newNum / target, 1)// prevent newNum from being > target?
  
  // sends query to update user_habit_records fulfilled_percent
  const updateUHRQuery = `
      UPDATE user_habit_records
      SET fullfilled_percent=$1
      WHERE user_id=$2 AND habit_name=$3 AND date=(SELECT CURRENT_DATE)
      `;
  const updateUHR = await db.query(updateUHRQuery, [
    newPercent,
    userId,
    habitName,
  ]);

  // ---------------- CALCULATE AVERAGE FOR DAY FROM UHR -----------------

  const dayAvgQuery = `
    SELECT AVG (fullfilled_percent)
    FROM user_habit_records
    WHERE user_id=$1 AND date=(SELECT CURRENT_DATE);
  `;

  const dayAvg = await db.query(dayAvgQuery, [userId]);
  // console.log("dayAvg: ", dayAvg);
  const average = dayAvg.rows[0].avg;
  // console.log("average: ", average)
  res.locals.result = { Success: true, newAvg: average };

  // ---------------- UPDATE AVG_PERCENT in DAILY_AVGS -------------
 
  const updateDaysTotalAverageQuery = `
  UPDATE daily_avgs
  SET avg_percent = $1
  WHERE user_id=$2 AND date=(SELECT CURRENT_DATE)
  `;
  
  const update = await db.query(updateDaysTotalAverageQuery, [
    average,
    userId,
  ]);

  return next();
};

module.exports = dbController;

// Get today's habit progress

//[[habit_name, targetNum, fullfilled_percent]]
// [["water", 5, 0.5], ["Make bed",NULL, 0]]

// -----------BUG--------
//
//       SELECT h.habit_name, uh.target_num, uhr.fullfilled_percent
//       FROM user_habit_records uhr
//       LEFT OUTER JOIN habits h ON uhr.habit_id = h.id
//       LEFT OUTER JOIN user_habits uh ON uh.habit_id = uhr.habit_id
//       WHERE user_id=$1 AND date=(SELECT CURRENT_DATE);
//       `;

// let newDailyPercent = (Sum all fullfilled_percent from UHR) / number of habits on selected date
// const getAllPercent

// const updateDailyPercentQuery = `
//   UPDATE daily_avgs
//   SET avg_percent = $1
//   WHERE user_id = $2 AND date=(SELECT CURRENT_DATE)
// `
// const updateDailyPercent = await db.query(updateDailyPercentQuery, [newDailyPercent, userId])
