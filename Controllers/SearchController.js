const { rejected, successfull } = require("../Response/Response");
const Job = require("../Models/jobModel");
const SearchJobs = async (req, res) => {
  try {
    let { keyword, type, min, mode, location } = req.body;
    let filter = {};
    if (keyword.length > 0) {
      var jobTitle = keyword.map((title) => new RegExp(title, "i")) || [];
      filter.Job_title = { $in: jobTitle };
    }
    if (location.length > 0) {
      var locationarr = location.map((city) => new RegExp(city, "i")) || [];
      filter.location = { $in: locationarr };
    }

    if (type.length > 0) {
      var jobType = type.map((type) => new RegExp(type, "i")) || [];
      filter.job_type = { $in: jobType };
    }
    if (min) {
      filter["salary.max"] = { $gte: min };
    }

    if (mode.length > 0) {
      var jobMode = mode.map((mode) => new RegExp(mode, "i")) || [];
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
