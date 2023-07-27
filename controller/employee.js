const Employee = require("../models/employee");

const findAll = async (req, res) => {
  try {
    // Sort employees by STATUS_YEAR in descending order
    const sortedEmployees = await Employee.aggregate([
      {
        $sort: { STATUS_YEAR: -1 }
      }
    ]);

    // Group employees by EmployeeID and select the first (highest STATUS_YEAR) document for each EmployeeID
    const employees = await Employee.aggregate([
      {
        $sort: { STATUS_YEAR: -1 } // Sort by STATUS_YEAR in descending order
      },
      {
        $group: {
          _id: "$EmployeeID",
          employee: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$employee" } // Replace the document with the original employee document
      }
    ]);

    return res.json(employees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error fetching employees" });
  }
};

const findAllOf = async (req, res) => {
  try {
    const employeeId = req.params.id; // Get the employee ID from the route parameter

    // Find all employees with the specified EmployeeID
    const employees = await Employee.find({ EmployeeID: employeeId });

    if (employees.length === 0) {
      return res.status(404).json({ error: "No employees found with the specified EmployeeID" });
    }

    return res.json(employees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error fetching employees" });
  }
};

const findById = async (req, res) => {
  try {
    const employeeId = req.params.employeeId; // Assuming the employee ID is provided as a route parameter

    // Sort employees by STATUS_YEAR in descending order and select only the first result
    const employee = await Employee.findOne({ id: employeeId })
      .sort({ STATUS_YEAR: -1 })
      .limit(1);

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
      { STATUS: "INACTIVE" },
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
  findAllOf,
  findById,
  update,
  deactivate,
};
