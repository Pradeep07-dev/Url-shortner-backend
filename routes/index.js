const express = require("express");
const { getUrl, createUrl } = require("../controllers");

const router = express.Router();

router.get("/:hashvalue", getUrl);
router.post("/create", createUrl);

module.exports = router;
