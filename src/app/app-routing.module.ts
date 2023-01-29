// Title: NodeBucket
// Author: Professor Krasso
// Date: Jan 15 2023
// Modified By: Ferdinand Detres Jr
// Attributions: https://www.google.com/books/edition/Getting_MEAN_with_Mongo_Express_Angular/sTgzEAAAQBAJ?hl=en&gbpv=1&dq=Getting+MEAN+with+MongoDB,+Express,+Angular,+and+Node+2+nd+Edition%3B+Simon+Holmes+and+Clive+Harber%3B+Manning+Publications+2019+pdf&printsec=frontcover
// In-Class tutorials

//import statements
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./auth.guard";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { LoginComponent } from "./pages/login/login.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { AboutComponent } from "./pages/about/about.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

//Routes for the auth/ base layout
const routes: Routes = [
  {
    path: "",
    component: BaseLayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "contact",
        component: ContactComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "about",
        component: AboutComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "session",
    component: AuthLayoutComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "not-found",
        component: NotFoundComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "**",
    redirectTo: "session/not-found",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
