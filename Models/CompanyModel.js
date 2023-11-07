const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    company_opportunity: {
      type: Number,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const companyModel = mongoose.model("company", companySchema);

module.exports = companyModel;
