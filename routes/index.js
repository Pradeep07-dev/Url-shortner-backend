const express = require("express");
const { getUrl, createUrl, deleteUrl } = require("../controllers");

const router = express.Router();

router.get("/:hashvalue", getUrl);
router.post("/create", createUrl);
router.delete("/delete", deleteUrl);

module.exports = router;
