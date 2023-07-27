const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  EmployeeID: { type: Number },
  recorddate_key: { type: String },
  birthdate_key: { type: String },
  orighiredate_key: { type: String },
  terminationdate_key: { type: String },
  age: { type: Number },
  length_of_service: { type: Number },
  city_name: { type: String },
  department_name: { type: String },
  job_title: { type: String },
  store_name: { type: Number },
  gender_short: { type: String },
  gender_full: { type: String },
  termreason_desc: { type: String },
  termtype_desc: { type: String },
  STATUS_YEAR: { type: Number },
  STATUS: { type: String },
  BUSINESS_UNIT: { type: String },
});

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
