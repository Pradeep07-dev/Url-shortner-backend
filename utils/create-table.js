const connectionRequest = require("../database/database");

async function createTables() {
  try {
    const connection = await connectionRequest();

    const [result] = await connection.query(`
      CREATE TABLE IF NOT EXISTS urls (
        id          VARCHAR(255) PRIMARY KEY,
        OrgUrl      VARCHAR(255) NOT NULL,
        ShortUrl    VARCHAR(255) NOT NULL,
        Date        DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `);

    await connection.end();
  } catch (error) {
    console.error("Error during table creation:", error);
  }
}

module.exports = { createTables };
