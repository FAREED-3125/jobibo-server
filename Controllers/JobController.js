const express = require("express");
const Job = require("../Models/jobModel");
const { successfull, rejected } = require("../Response/Response");

const Createjob = async (req, res) => {
  const company_id = req.params.id;
  const body = req.body;
  try {
    const job = await Job.create({ ...body, company_id });
    return res.status(201).json(successfull(201, job));
  } catch (err) {
    return res.status(500).json(rejected(500, err.message));
  }
};

//get single job

const Getjob = async (req, res) => {
  try {
    const company_id = req.params.id;
    const job = await Job.findById(company_id);
    if (!job) return res.status(404).json(successfull(404, "No job Found."));
    return res.status(200).json(successfull(200, job));
  } catch (err) {
    return res.status(500).json(rejected(500, err.message));
  }
};

//update job
const Updatejob = async (req, res) => {
  try {
    const job_id = req.params.id;
    const job = await Job.findByIdAndUpdate(job_id, req.body, {
      new: true,
    });
    if (!job) return res.status(404).json(successfull(404, "No job Found."));
    return res.status(200).json(successfull(200, job));
  } catch (err) {
    return res.status(500).json(rejected(500, err.message));
  }
};

//delete job
const Deletejob = async (req, res) => {
  try {
    const job_id = req.params.id;
    const job = await Job.findByIdAndDelete(job_id);
    if (!job) return res.status(404).json(successfull(404, "No job Found."));
    return res.status(200).json(successfull(200, job));
  } catch (err) {
    return res.status(500).json(rejected(500, err.message));
  }
};
module.exports = {
  Createjob,
  Getjob,
  Updatejob,
  Deletejob,
};
