// Title: NodeBucket
// Author: Professor Krasso
// Date: Jan 15 2023
// Modified By: Ferdinand Detres Jr
// Attributions:
//www.google.com/books/edition/Getting_MEAN_with_Mongo_Express_Angular/sTgzEAAAQBAJ?hl=en&gbpv=1&dq=Getting+MEAN+with+MongoDB,+Express,+Angular,+and+Node+2+nd+Edition%3B+Simon+Holmes+and+Clive+Harber%3B+Manning+Publications+2019+pdf&printsec=frontcover
// In-Class tutorials

import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-base-layout",
  templateUrl: "./base-layout.component.html",
  styleUrls: ["./base-layout.component.css"],
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();
  //variables for imports so we can use in the logout() function
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {}
  //logout function
  logout() {
    this.cookieService.deleteAll();
    this.router.navigate(["/session/login"]);
  }
}
