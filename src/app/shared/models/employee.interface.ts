// Title: NodeBucket
// Author: Professor Krasso
// Date: Jan 15 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
// In-Class tutorials

import { Item } from "./item.interface";
//employee interface with three objects
export interface Employee {
  empId: number;
  firstName: string;
  lastName: string;
  todo: Item[];
  done: Item[];
}
