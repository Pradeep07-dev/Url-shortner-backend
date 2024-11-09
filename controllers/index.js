const randomstring = require("randomstring");
const { getUrlTable, createUrlTable } = require("../database");
const urlValidator = require("../utils/validator");
require("dotenv").config();
const base = process.env.BASE;

const getUrl = async (req, res) => {
  const id = req.params.hashvalue;
  console.log("Params URL:", id);

  if (id) {
    const isUrl = await getUrlTable(id);
    const OrgUrl = isUrl[0]?.OrgUrl;
    console.log("UURRLL:", OrgUrl);
    return res.status(200).json({ message: "Successful URL", OrgUrl });
  } else {
    return res.status(400).json({ message: "Please provide the required URL" });
  }
};

const createUrl = async (req, res) => {
  const { orgUrl } = req.body;
  console.log("orgUrl:", orgUrl);

  if (orgUrl) {
    const urlValid = urlValidator(orgUrl);
    console.log("urlValid:", urlValid);

    if (urlValid) {
      const url_id = randomstring.generate(5);
      const shortUrl = `${base}/${url_id}`;

      console.log(
        `Url_id: ${url_id}, ShortUrl: ${shortUrl}, OrgUrl: ${orgUrl}`
      );

      const newUrl = await createUrlTable(url_id, shortUrl, orgUrl);

      return res.status(200).json({ message: "Successful Url", newUrl });
    } else {
      return res.status(400).json({ message: "Invalid URL" });
    }
  } else {
    return res.status(400).json({ message: "Please provide the required URL" });
  }
};

module.exports = { getUrl, createUrl };
