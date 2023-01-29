// Title: NodeBucket
// Author: Professor Krasso
// Date: Jan 26 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// In-Class tutorials

// Base Response class with objects
class BaseResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  // this function returns the data from the base response
  toObject() {
    return {
      httpCode: this.httpCode,
      message: this.message,
      data: this.data,
      timestamp: new Date().toLocaleDateString(),
    };
  }
}

// base response export
module.exports = BaseResponse;
