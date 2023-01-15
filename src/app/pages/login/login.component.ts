// Title: NodeBucket
// Author: Professor Krasso
// Date: Jan 15 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.google.com/books/edition/Getting_MEAN_with_Mongo_Express_Angular/sTgzEAAAQBAJ?hl=en&gbpv=1&dq=Getting+MEAN+with+MongoDB,+Express,+Angular,+and+Node+2+nd+Edition%3B+Simon+Holmes+and+Clive+Harber%3B+Manning+Publications+2019+pdf&printsec=frontcover
//http://primefaces.org/primeng/messages
// In-Class tutorials

//import statements
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Message } from "primeng/api";
import { Employee } from "src/app/shared/models/employee.interface";
import { EmployeeService } from "src/app/shared/services/employee.service";

//Login component will link our html and css
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  //message array empty and using PrimeMessage
  errorMessages: Message[] = [];

  // this assigns the employee variable to schema Employees
  employee: Employee;

  // adds validators to the loginForm. Ensures that only numerical values are accepted.
  loginForm: FormGroup = this.fb.group({
    employeeId: [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient,
    private employeeService: EmployeeService
  ) {
    this.employee = {} as Employee;
  }

  ngOnInit(): void {}

  // login function checks entered employee ID against the database
  login() {
    const empId = this.loginForm.controls["empId"].value;

    console.log(empId);

    // sets a session cookie that keeps the employee logged in for 1 day
    this.employeeService.findEmployeeById(empId).subscribe({
      next: (res) => {
        if (res) {
          this.employee = res;
          this.cookieService.set("session_user", this.employee.empId.toString(), 1);
          this.cookieService.set("session_name", `${this.employee.firstName} ${this.employee.lastName}`, 1);
          this.router.navigate(["/"]);
        } else {
          this.errorMessages = [
            {
              severity: "error",
              summary: "Error",
              detail: "Please enter a valid employee ID to continue.",
            },
          ];
        }
      },
      error: (e) => {
        console.log(e);
        this.errorMessages = [
          {
            severity: "error",
            summary: "Error",
            detail: e.message,
          },
        ];
      },
    });
  }
}
