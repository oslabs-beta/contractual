const { Pool } = require("pg");
// Link to ElephantSQL DB
const PG_URI = process.env.DB_KEY;

// Establish connection to DB
const pool = new Pool({
  connectionString: PG_URI,
});

// Query to DB
module.exports = {
  query: (text, params, callback) => {
    console.log("Executed query", text);
    return pool.query(text, params, callback);
  },
};
