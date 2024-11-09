const mysql = require("mysql2/promise");
require("dotenv").config();

async function connectionRequest() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  console.log("Connected to MySQL Database!");
  return connection; // Return the connection
}

module.exports = connectionRequest;
