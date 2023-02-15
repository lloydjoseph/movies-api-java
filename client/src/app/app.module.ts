import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MovieAddFormComponent } from './movie-add-form/movie-add-form.component';
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    AppComponent,
    MovieAddFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
