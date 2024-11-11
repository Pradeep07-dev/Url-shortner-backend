const connectionRequest = require("./database");

async function getUrlTable(url_id) {
  const connection = await connectionRequest();

  const getUrl = `SELECT id, ShortUrl, OrgUrl FROM urls WHERE id = ?`;
  const value = [url_id];
  const [result] = await connection.query(getUrl, value);
  if (result) {
    connection.destroy();
    return result;
  } else {
    console.log("Query unsuccessful:", error.message);
    connection.destroy();
    return;
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

      connection.destroy();
      return rows;
    }
  } else {
    console.log("Query unsuccessful:", error.message);
    connection.destroy();
  }
}

async function deleteUrlTable(url) {
  const connection = await connectionRequest();

  const deleteUrl = ` DELETE FROM urls WHERE orgUrl = ?`;
  const result = await connection.query(deleteUrl, [url]);

  if (result) {
    console.log("Delte Url from Table");
    connection.destroy();
    return;
  } else {
    console.log("Error:", error.message);
    connection.destroy();
    return;
  }
}

module.exports = { getUrlTable, createUrlTable, deleteUrlTable };
