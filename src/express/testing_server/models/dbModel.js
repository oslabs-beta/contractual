const { Pool } = require("pg");
// Link to ElephantSQL DB
const PG_URI =
  "postgres://prtanubs:dWU6razsSRkatrpNGRK4BSwE3h5DvPoA@heffalump.db.elephantsql.com/prtanubs";

// Establish connection to DB
const pool = new Pool({
  connectionString: PG_URI,
});

// Query to DB
module.exports = {
  query: (text, params, callback) => {
    // console.log("Executed query", text);
    return pool.query(text, params, callback);
  },
};
