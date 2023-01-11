// Title: NodeBucket
// Author: Professor Krasso
// Date: Jan 11 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
//https://www.youtube.com/watch?v=WDrU305J1yw
// In-Class tutorials

// Importing dependencies
const express = require("express");
const router = express.Router();
//Importing mongoDB collection Schema from employee models to use in our API
const Employee = require("../models/employee");

// Swagger written in YAML code to describe the findEmployeeById API
/**
 * findEmployeeById
 * @openapi
 * /api/employees/{empId}:
 *   get:
 *     tags:
 *       - Employees
 *     description:  API for returning employees by employeeId
 *     summary: returns employee by employeeId
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Employees ID
 *         schema:
 *           type: Number
 *     responses:
 *       '200':
 *         description: Employee document
 *       '401':
 *         description: Invalid employeeId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */
// API to find one employee by ID this will concatinate to the app.use("/api/employees", EmployeeApi) we specify in index.js
router.get("/:empId", async (req, res) => {
  try {
    // finds the employee by employee ID, or returns an error message
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        res.status(501).send({
          err: "MongoDb Server Error: " + err.message,
        });
      } else {
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      err: "Internal server error!",
    });
  }
});
module.exports = router;
