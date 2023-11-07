const express = require("express");
const { CreateUser, LoginUser } = require("../Controllers/userController");
const { Verify_token, Verify_recruiter, Verify_User } = require("../jwt/jwt");
const { successfull } = require("../Response/Response");
const router = express.Router();

//create User Routes
router.post("/create", CreateUser);

//Login user Route
router.get("/login", LoginUser);

router.get("/sample", Verify_User, (req, res) => {
  console.log(req.user);
  res.status(200).json(successfull(200, "token is verified."));
});

module.exports = router;
