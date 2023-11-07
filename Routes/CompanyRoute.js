const express = require("express");
const { Verify_recruiter, Verify_User } = require("../jwt/jwt");
const { successfull } = require("../Response/Response");
const { LoginUser } = require("../Controllers/userController");
const {
  CreateCompany,
  GetCompany,
  UpdateCompany,
  DeleteCompany,
} = require("../Controllers/CompanyController");
const router = express.Router();

//create User Routes
router.post("/createcompany/:id", Verify_recruiter, CreateCompany);

//get companies
router.get("/getcompany/:id", Verify_recruiter, GetCompany);

//update company
router.put("/updatecompany/:id", Verify_recruiter, UpdateCompany);

//delete Company
router.delete("/deletecompany/:id", Verify_recruiter, DeleteCompany);

module.exports = router;
