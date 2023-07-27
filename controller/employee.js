const Employee = require("../models/employee");

const findAll = async (req, res) => {
  try {
    const employees = await Employee.find({});
    return res.json(employees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error fetching employees" });
  }
};

const findById = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const employee = await Employee.findOne({ id: employeeId });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.json(employee);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error fetching employee" });
  }
};

const update = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const updatedData = req.body;

    const employee = await Employee.findOneAndUpdate(
      { id: employeeId },
      updatedData,
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.json(employee);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error updating employee" });
  }
};

const deactivate = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const employee = await Employee.findOneAndUpdate(
      { id: employeeId },
      { STATUS: "INACTIVE"},
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.json(employee);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error deactivating employee" });
  }
};


module.exports = {
  findAll,
  findById,
  update,
  deactivate,
};
