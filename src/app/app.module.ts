// Title: NodeBucket
// Author: Professor Krasso
// Date: Jan 15 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.google.com/books/edition/Getting_MEAN_with_Mongo_Express_Angular/sTgzEAAAQBAJ?hl=en&gbpv=1&dq=Getting+MEAN+with+MongoDB,+Express,+Angular,+and+Node+2+nd+Edition%3B+Simon+Holmes+and+Clive+Harber%3B+Manning+Publications+2019+pdf&printsec=frontcover
// In-Class tutorials

//all the applications dependencies are imported here
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./pages/home/home.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { LoginComponent } from "./pages/login/login.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

import { MatDividerModule } from "@angular/material/divider";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContactComponent } from "./pages/contact/contact.component";
import { RouterModule } from "@angular/router";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { AboutComponent } from "./pages/about/about.component";
import { ConfirmDialogComponent } from "./shared/confirm-dialog/confirm-dialog.component";
//Components
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthLayoutComponent,
    BaseLayoutComponent,
    LoginComponent,
    ContactComponent,
    NotFoundComponent,
    AboutComponent,
    ConfirmDialogComponent,
  ],
  //Imported Modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MessageModule,
    MessagesModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    MatDialogModule,
    DragDropModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
