import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { Dashboard } from "./app/features/dashboard/dashboard.component"
import { AppComponent } from "./app/app.component"

@NgModule({
  declarations: [AppComponent, Dashboard],
  imports: [BrowserModule, RouterModule.forRoot([{ path: "", component: Dashboard }])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

// @NgModule({
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     FormsModule,
//     // ... autres imports
//   ]
  
// })
// export class AppModule { }