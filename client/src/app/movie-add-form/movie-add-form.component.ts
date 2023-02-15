import { Component } from '@angular/core';
import { Movie } from "../movie";

@Component({
  selector: 'app-movie-add-form',
  templateUrl: './movie-add-form.component.html',
  styleUrls: ['./movie-add-form.component.css']
})

export class MovieAddFormComponent {

  model = new Movie('Inception 2', 8);

  submitted = false;

  onSubmit() { this.submitted = true; }
}


