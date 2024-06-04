const {Pool} = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ukarFood',
  password: 'harena',
  port: 5432,
})
module.exports = pool;