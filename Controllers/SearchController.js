const { rejected, successfull } = require("../Response/Response");
const Job = require("../Models/jobModel");
const SearchJobs = async (req, res) => {
  try {
    let { keyword, type, min, mode } = req.query;
    let filter = {};
    if (keyword) {
      var jobTitle =
        keyword.split(",").map((title) => new RegExp(title, "i")) || [];
      filter.Job_title = { $in: jobTitle };
    }

    if (type) {
      var jobType = type.split(",").map((type) => new RegExp(type, "i")) || [];
      filter.job_type = { $in: jobType };
    }
    if (min) {
      filter["salary.max"] = { $gte: min };
    }

    if (mode) {
      var jobMode = mode.split(",").map((mode) => new RegExp(mode, "i")) || [];
      filter.job_mode = { $in: jobMode };
    }
    console.log(filter);

    const jobs = await Job.find(filter).populate("company_id");

    if (!jobs)
      return res.status(404), json(rejected(404, "no job match found."));
    return res.status(200).json(successfull(200, jobs));
  } catch (err) {
    return res.status(500).json(rejected(500, err.message));
  }
};

const GetAlljobs = async (req, res) => {
  try {
    const { limit } = req.query;
    const jobs = await Job.find().limit(limit).populate("company_id");

    if (!jobs) return res.status(400).json(rejected(400, "no job find"));

    return res.status(200).json(successfull(200, jobs));
  } catch (err) {
    return res.status(500).json(rejected(500, err.message));
  }
};

module.exports = {
  SearchJobs,
  GetAlljobs,
};
