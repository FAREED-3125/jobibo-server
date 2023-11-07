const mongoose = require("mongoose");
const { Schema } = mongoose;
const companySchema = new Schema(
  {
    Job_title: {
      type: String,
      required: true,
    },
    job_type: {
      type: String,
      required: true,
    },
    job_mode: {
      type: String,
      required: true,
    },
    no_of_applicants: {
      type: Number,
      required: true,
    },
    about_job: {
      type: String,
      required: true,
    },
    salary: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
    skill_required: {
      type: [String],
      required: true,
    },
    no_of_openings: {
      type: Number,
      required: true,
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },
  },
  { timestamps: true }
);

const companyModel = mongoose.model("job", companySchema);

module.exports = companyModel;
