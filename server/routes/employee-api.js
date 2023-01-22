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
 * @swagger
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
/**
 * findAllTasks
 * @swagger
 * /api/employees/{empId}/tasks:
 *   get:
 *     tags:
 *       - Employees
 *     description:  API for returning all tasks by empId
 *     summary: returns all tasks by employeeId
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Employee document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee tasks
 *       '401':
 *         description: Invalid empId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */
// API to findAllTasks of an employee
router.get("/:empId/tasks", async (req, res) => {
  try {
    // returns all employee tasks or appropriate error message
    Employee.findOne({ empId: req.params.empId }, "empId todo done", function (err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          err: "MongoDB server error: " + err.message,
        });
      } else {
        console.log(emp);
        res.json(emp);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      err: "Internal server error: " + err.message,
    });
  }
});
/**
 * createTask
 * @swagger
 * /api/employees/{employeeId}/tasks:
 *   post:
 *     tags:
 *       - Employees
 *     name: createTask
 *     description:  API for creating a task by employeeId
 *     summary: creates a new task by employeeId
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         required: true
 *         description: Employee document id
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Task creation successful
 *       '401':
 *         description: Invalid employeeId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */

// createTask API specifications
router.post("/:empId/tasks", async (req, res) => {
  try {
    // creates a task for the employee or returns error messages
    Employee.findOne({ empId: req.params.empId }, function (err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          err: "MongoDB server error: " + err.message,
        });
      } else {
        console.log(empId);
        const newTask = {
          text: req.body.text,
        };

        emp.todo.push(newTask);

        emp.save(function (err, updatedEmp) {
          if (err) {
            console.log(err);
            res.status(501).send({
              err: "MongoDB server error: " + err.message,
            });
          } else {
            console.log(updatedEmp);
            res.json(updatedEmp);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      err: "Internal server error: " + err.message,
    });
  }
});
module.exports = router;
