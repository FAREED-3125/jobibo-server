const express = require("express");
const { SearchJobs, GetAlljobs } = require("../Controllers/SearchController");
const router = express.Router();

//search job Routes
router.get("/", SearchJobs);

//get all search
router.get("/getalljobs", GetAlljobs);

module.exports = router;
