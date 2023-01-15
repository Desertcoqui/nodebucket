// Title: NodeBucket
// Author: Professor Krasso
// Date: Jan 11 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
// In-Class tutorials

//using mongoose dependency and mongoose object Schema this makes up the Mongoose Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//variable which will create employee Schemas with three objects, employee id, first name and lastname
let employeeSchema = new Schema(
  {
    //empID in MongoDB Atlas using Int64 data type
    empId: { type: Number, unique: true, required: true },
    firstName: { type: String },
    lastName: { type: String },
  },
  {
    //will search collection employees in mongoDB database since we have manually created one.
    collection: "employees",
  }
);
//export statement
module.exports = mongoose.model("Employee", employeeSchema);
