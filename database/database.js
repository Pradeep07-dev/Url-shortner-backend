const mysql = require("mysql2/promise");
const cron = require("node-cron");
require("dotenv").config();

async function connectionRequest() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  console.log("Connected to MySQL Database!");
  return connection;
}

async function deleteUrls() {
  const connection = await connectionRequest();

  const deleteUrl = ` DELETE FROM urls WHERE created_at < NOW() - INTERVAL 24 HOUR `;

  const [result] = await connection.query(deleteUrl);

  if (result) {
    console.log("Deleted the expired urls");
    connection.destroy();
    return;
  } else {
    console.log("Error:", error.message);
    connection.destroy();
  }
}

cron.schedule("0 * * * *", () => {
  console.log("Running cleanup for expired URL's..... ");
  deleteUrls();
});

module.exports = connectionRequest;
