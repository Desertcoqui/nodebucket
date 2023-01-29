// Title: NodeBucket
// Author: Professor Krasso
// Date: Jan 26 2023
// Modified By: Ferdinand Detres Jr
// Attributions:
//www.google.com/books/edition/Getting_MEAN_with_Mongo_Express_Angular/sTgzEAAAQBAJ?hl=en&gbpv=1&dq=Getting+MEAN+with+MongoDB,+Express,+Angular,+and+Node+2+nd+Edition%3B+Simon+Holmes+and+Clive+Harber%3B+Manning+Publications+2019+pdf&printsec=frontcover
// https://angular.io/api/forms/FormBuilder
// In-Class tutorials

//import material dialog statements required
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../models/dialog-data.interface";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.css"],
})
export class ConfirmDialogComponent implements OnInit {
  dialogData: DialogData;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dialogData = data;
  }

  ngOnInit(): void {}
}
