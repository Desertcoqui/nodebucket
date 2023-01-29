// Title: NodeBucket
// Author: Professor Krasso
// Date: Jan 22 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.google.com/books/edition/Getting_MEAN_with_Mongo_Express_Angular/sTgzEAAAQBAJ?hl=en&gbpv=1&dq=Getting+MEAN+with+MongoDB,+Express,+Angular,+and+Node+2+nd+Edition%3B+Simon+Holmes+and+Clive+Harber%3B+Manning+Publications+2019+pdf&printsec=frontcover
// In-Class tutorials

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../models/item.interface";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private http: HttpClient) {}

  /**
   * findAllTasks
   */
  findAllTasks(empId: number): Observable<any> {
    return this.http.get("/api/employees/" + empId + "/tasks");
  }

  /**
   * createTask
   */
  createTask(empId: number, task: string): Observable<any> {
    return this.http.post("/api/employees/" + empId + "/tasks", {
      text: task,
    });
  }

  /**
   * updateTask
   */

  updateTask(empId: number, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put("/api/employees/" + empId + "/tasks", {
      todo,
      done,
    });
  }

  /**
   * deleteTask
   */

  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete("/api/employees/" + empId + "/tasks/" + taskId);
  }
}
