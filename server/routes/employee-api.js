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
const BaseResponse = require("../models/base-response");
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
/**
 * findAllTasks
 * @openapi
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
      err: "Internal server error: " + e.message,
    });
  }
});
/**
 * createTask
 * @openapi
 * /api/employees/{empId}/tasks:
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
        console.log(emp);
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
      err: "Internal server error: " + e.message,
    });
  }
});
/**
 * updateTasks
 * @openapi
 * /api/employees/{empId}/tasks:
 *   put:
 *     tags:
 *       - Employees
 *     name: updateTasks
 *     description: API to update a task
 *     summary: updates a task
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - todo
 *               - done
 *             properties:
 *               todo:
 *                 type: array
 *               done:
 *                 type: array
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.put("/:empId/tasks", async (req, res) => {
  try {
    // API updates the task todo/ done arrays if not an error message is returned
    Employee.findOne({ empId: req.params.empId }, function (err, emp) {
      if (err) {
        const updateTasksMongoDbError = new BaseError("501", "MongoDB server error", err);
        console.log(updateTasksMongoDbError.toObject());
        res.status(501).send(updateTasksMongoDbError.toObject());
      } else {
        console.log(emp);
        emp.set({
          todo: req.body.todo,
          done: req.body.done,
        });
        // employee object saved
        emp.save(function (err, updatedEmp) {
          if (err) {
            // basereponse used for error message and httpCode
            const updatedEmpMongoError = new BaseResponse("501", "MongoDb server error", err);
            console.log(updatedEmpMongoError.toObject());
            res.status(501).send(updatedEmpMongoError.toObject());
          } else {
            const updatedEmpResponse = new BaseResponse("200", "Query successful", updatedEmp);
            console.log(updatedEmpResponse.toObject());
            res.status(200).send(updatedEmpResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const updateTasksCatchError = new BaseResponse("500", "Internal server error", e);
    res.status(500).send(updateTasksCatchError.toObject());
  }
});
/**
 * deleteTask
 * @openapi
 * /api/employees/{empId}/tasks/{taskId}:
 *   delete:
 *     tags:
 *       - Employees
 *     name: deleteTask
 *     description: API to delete a task by id
 *     summary: deletes a task by id
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         required: true
 *         scheme:
 *           type: string
 *       - name: taskId
 *         in: path
 *         required: true
 *         scheme:
 *           type: string
 *     responses:
 *       '200':
 *         description: Query successful
 *       '300':
 *         description: Invalid taskId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// API to delete the task or return an error message
router.delete("/:empId/tasks/:taskId", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, emp) {
      if (err) {
        const deleteTaskMongoErrorResponse = new BaseResponse("501", "MongoDb server error", err);
        console.log(deleteTaskMongoErrorResponse.toObject());
        res.status(501).send(deleteTaskMongoErrorResponse.toObject());
      } else {
        console.log(emp);
        //a taskID is required in order to delete from mongoDB
        const taskId = req.params.taskId;
        // item _id is used in place of the TaskId
        const todoItem = emp.todo.find((item) => item._id.toString() === taskId);
        const doneItem = emp.done.find((item) => item._id.toString() === taskId);
        // searches the todo list for the taskId and deletes it
        if (todoItem) {
          emp.todo.id(todoItem._id).remove();

          emp.save(function (err, updatedTodoItemEmp) {
            if (err) {
              const updatedTodoItemErrResponse = new BaseResponse("501", "MongoDB Server error", err);
              console.log(updatedTodoItemErrResponse.toObject());
              res.status(501).send(updatedTodoItemErrResponse.toObject());
            } else {
              const updatedTodoItemSuccess = new BaseResponse("200", "Query successful", updatedTodoItemEmp);
              console.log(updatedTodoItemSuccess.toObject());
              res.status(200).send(updatedTodoItemSuccess.toObject());
            }
          });
          // searches the done list for the taskId and deletes it
        } else if (doneItem) {
          emp.done.id(doneItem._id).remove();
          // base response for error messages and updates to the done item list
          emp.save(function (err, updatedDoneItemEmp) {
            if (err) {
              const updatedDoneItemErrResponse = new BaseResponse("501", "MongoDB server error", err);
              console.log(updatedDoneItemErrResponse.toObject());
              res.status(501).send(updatedDoneItemErrResponse.toObject());
            } else {
              const updatedDoneItemSuccessResponse = new BaseResponse("200", "Query successful", updatedDoneItemEmp);
              console.log(updatedDoneItemSuccessResponse.toObject());
              res.status(200).send(updatedDoneItemSuccessResponse.toObject());
            }
          });
          // utilizes BaseResponse for error messaging and HTTPcode response
        } else {
          const invalidTaskIdResponse = new BaseResponse("300", "Invalid taskId. " + taskId);
          console.log(invalidTaskIdResponse.toObject());
          res.status(300).send(invalidTaskIdResponse.toObject());
        }
      }
    });
  } catch (e) {
    const deleteTaskErrorResponse = new BaseResponse("500", "Internal server error", e);
    console.log(deleteTaskErrorResponse.toObject());
    res.status(500).send(deleteTaskErrorResponse.toObject());
  }
});

module.exports = router;
