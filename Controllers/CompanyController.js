const express = require("express");
const Company = require("../Models/CompanyModel");
const { successfull, rejected } = require("../Response/Response");

const CreateCompany = async (req, res) => {
  const user_id = req.params.id;
  const body = req.body;
  try {
    const company = await Company.create({ ...body, user_id });
    return res.status(201).json(successfull(201, company));
  } catch (err) {
    return res.status(500).json(rejected(500, err.message));
  }
};

//get single company

const GetCompany = async (req, res) => {
  try {
    const user_id = req.params.id;
    const company = await Company.find({ user_id });
    if (!company)
      return res.status(404).json(successfull(404, "No company Found."));
    return res.status(200).json(successfull(200, company));
  } catch (err) {
    return res.status(500).json(rejected(500, err.message));
  }
};

//update company
const UpdateCompany = async (req, res) => {
  try {
    const company_id = req.params.id;
    const company = await Company.findByIdAndUpdate(company_id, req.body, {
      new: true,
    });
    if (!company)
      return res.status(404).json(successfull(404, "No company Found."));
    return res.status(200).json(successfull(200, company));
  } catch (err) {
    return res.status(500).json(rejected(500, err.message));
  }
};

//delete company
const DeleteCompany = async (req, res) => {
  try {
    const company_id = req.params.id;
    const company = await Company.findByIdAndDelete(company_id);
    if (!company)
      return res.status(404).json(successfull(404, "No company Found."));
    return res.status(200).json(successfull(200, company));
  } catch (err) {
    return res.status(500).json(rejected(500, err.message));
  }
};
module.exports = {
  CreateCompany,
  GetCompany,
  UpdateCompany,
  DeleteCompany,
};
