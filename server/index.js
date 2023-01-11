// Title: NodeBucket
// Author: Professor Krasso
// Date: Jan 11 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
//https://www.youtube.com/watch?v=WDrU305J1yw
// In-Class tutorials

// required import statements
const express = require("express");
const path = require("path");
const EmployeeApi = require("./routes/employee-api");
const mongoose = require("mongoose");
const app = express();
// swagger dependency imports
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// variable to use Open API specifications linked to router files
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NodeBucket API's",
      version: "1.0.0",
    },
  },
  apis: ["./server/routes/*.js"],
};
const openapiSpecification = swaggerJsdoc(options);

// API configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));

//uses this link for swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
// API imports

app.use("/api/employees", EmployeeApi);
// default server port value.
const PORT = process.env.PORT || 3000;

// TODO: This line will be replaced with your database connection string (including username/password).
const CONN = "mongodb+srv://admin:s3cret@cluster0.sybhi4g.mongodb.net/nodebucket?retryWrites=true&w=majority";

/**
 * Database connection.
 */
mongoose
  .connect(CONN)
  .then(() => {
    console.log("Connection to the database was successful");
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });

// Wire-up the Express server.
app.listen(PORT, () => {
  console.log("Application started and listening on PORT: " + PORT);
});
