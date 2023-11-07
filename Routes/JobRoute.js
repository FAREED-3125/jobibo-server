const express = require("express");
const { Verify_recruiter, Verify_User } = require("../jwt/jwt");
const { successfull } = require("../Response/Response");
const { LoginUser } = require("../Controllers/userController");
const {
  Createjob,
  Getjob,
  Updatejob,
  Deletejob,
} = require("../Controllers/JobController");
const router = express.Router();

//create User Routes
router.post("/createjob/:id", Createjob);

//get companies
router.get("/getjob/:id", Getjob);

//update job
router.put("/updatejob/:id", Updatejob);

//delete job
router.delete("/deletejob/:id", Deletejob);
module.exports = router;
