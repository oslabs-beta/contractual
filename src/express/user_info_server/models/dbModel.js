const { Pool } = require('pg');

// Link to ElephantSQL DB
// const PG_URI = process.env.DB_KEY;
const PG_URI =
  'postgres://zzzenrbw:qKcrtsvOIBu_eBn7vP9l83Nk0V_ij_md@heffalump.db.elephantsql.com/zzzenrbw';
// Establish connection to DB
const pool = new Pool({
  connectionString: PG_URI,
});

// Query to DB
module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query', text);
    return pool.query(text, params, callback);
  },
};
