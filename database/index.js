const connectionRequest = require("./database");

async function getUrlTable(url_id) {
  const connection = await connectionRequest();

  const getUrl = `SELECT id, ShortUrl, OrgUrl FROM urls WHERE id = ?`;
  const value = [url_id];
  const [result] = await connection.query(getUrl, value);
  if (result) {
    console.log("Query successful:", result);
    return result;
  } else {
    console.log("Query unsuccessful:", error.message);
    connection.destroy();
  }
}

async function createUrlTable(url_id, shortUrl, orgUrl) {
  const connection = await connectionRequest();

  const createUrl = ` INSERT INTO urls(id, ShortUrl, OrgUrl) VALUES (?, ?, ?) `;
  const value = [url_id, shortUrl, orgUrl];
  const [result] = await connection.query(createUrl, value);

  if (result.affectedRows > 0) {
    if (result.affectedRows > 0) {
      const [rows] = await connection.query(
        `SELECT ShortUrl FROM urls WHERE id = ?`,
        [url_id]
      );

      console.log("Inserted record:", rows);
      connection.destroy();
      return rows;
    }
  } else {
    console.log("Query unsuccessful:", error.message);
    connection.destroy();
  }
}

module.exports = { getUrlTable, createUrlTable };
