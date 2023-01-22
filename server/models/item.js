// Title: NodeBucket
// Author: Professor Krasso
// Date: Jan 22 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
// In-Class tutorials

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// the item scheme with an object of text string
let itemSchema = new Schema({
  text: { type: String },
});

// this exports the schema so we can use it in th employee.js model
module.exports = itemSchema;
