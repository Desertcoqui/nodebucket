// Title: NodeBucket
// Author: Professor Krasso
// Date: Jan 15 2023
// Modified By: Ferdinand Detres Jr
// Attributions:
//www.google.com/books/edition/Getting_MEAN_with_Mongo_Express_Angular/sTgzEAAAQBAJ?hl=en&gbpv=1&dq=Getting+MEAN+with+MongoDB,+Express,+Angular,+and+Node+2+nd+Edition%3B+Simon+Holmes+and+Clive+Harber%3B+Manning+Publications+2019+pdf&printsec=frontcover
// https://angular.io/api/forms/FormBuilder
// In-Class tutorials

//import statements
import { Component, OnInit } from "@angular/core";
import { Employee } from "src/app/shared/models/employee.interface";
import { Item } from "src/app/shared/models/item.interface";
import { CookieService } from "ngx-cookie-service";
import { TaskService } from "src/app/shared/services/task.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})

// exports the HomeComponent class and defines the variable types
export class HomeComponent implements OnInit {
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;

  taskForm: FormGroup = this.fb.group({
    task: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(35)])],
  });

  constructor(private fb: FormBuilder, private cookieService: CookieService, private taskService: TaskService) {
    this.empId = parseInt(this.cookieService.get("session_user"), 10);
    this.employee = {} as Employee;
    this.todo = [];
    this.done = [];

    // finds all tasks
    this.taskService.findAllTasks(this.empId).subscribe({
      next: (res) => {
        this.employee = res;
        console.log(this.employee);
      },
      error: (e) => {
        console.log(e.message);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      },
    });
  }

  ngOnInit(): void {}

  // createTask function creates a task or displays an error
  createTask() {
    const newTask = this.taskForm.controls["task"].value;

    this.taskService.createTask(this.empId, newTask).subscribe({
      next: (res) => {
        this.employee = res;
        console.log(this.employee);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
        this.taskForm.controls["task"].setErrors({ incorrect: false });
      },
    });
  }
}
