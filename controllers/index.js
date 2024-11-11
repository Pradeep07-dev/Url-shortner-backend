const randomstring = require("randomstring");
const { getUrlTable, createUrlTable, deleteUrlTable } = require("../database");
const urlValidator = require("../utils/validator");
require("dotenv").config();
const base = process.env.BASE;

const getUrl = async (req, res) => {
  const id = req.params.hashvalue;

  if (id) {
    const isUrl = await getUrlTable(id);
    const OrgUrl = isUrl[0]?.OrgUrl;
    return res.status(200).json({ message: "Successful URL", OrgUrl });
  } else {
    return res.status(400).json({ message: "Please provide the required URL" });
  }
};

const createUrl = async (req, res) => {
  const { orgUrl } = req.body;

  if (orgUrl) {
    const urlValid = urlValidator(orgUrl);

    if (urlValid) {
      const url_id = randomstring.generate(5);
      const shortUrl = `${base}/${url_id}`;
      const newUrl = await createUrlTable(url_id, shortUrl, orgUrl);

      return res.status(200).json({ message: "Successful Url", newUrl });
    } else {
      return res.status(400).json({ message: "Invalid URL" });
    }
  } else {
    return res.status(400).json({ message: "Please provide the required URL" });
  }
};

const deleteUrl = async (req, res) => {
  const { orgUrl } = req.body;

  if (orgUrl) {
    const result = await deleteUrlTable(orgUrl);

    return res
      .status(200)
      .json({ message: "Delete Url from table successful", result });
  } else {
    return res.status(400).json({ message: "Please speicfy condition." });
  }
};

module.exports = { getUrl, createUrl, deleteUrl };
