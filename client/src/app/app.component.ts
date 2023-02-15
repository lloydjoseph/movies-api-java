import {Component, NgIterable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { faArrowRightToBracket, faArrowDown, faPlus, faAngleDown, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, NgForm} from "@angular/forms";
import {Movie} from "./movie";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:8080/movies/api/view').subscribe(movies => {this.moviesTemp = this.movies = movies});
  }

  movies: any = [];

  moviesTemp: any = [];

  faArrowDown = faArrowDown; faPlus = faPlus; faAngleDown = faAngleDown; faEdit = faEdit; faTrash = faTrash;
  admin = 0;
  ratingsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  search: any;

  addRequest(name: string, rating: number) {
    let body = new HttpParams();
    body = body.set('name', name);
    body = body.set('rating', rating);
    this.http.post(`http://localhost:8080/movies/api/add`, body).subscribe();
    location.reload();
  }

  addRequestForm(form: NgForm) {
    this.addRequest(form.value.name, form.value.rating);
    this.closeModal('add');
  }

  deleteRequest(id: number) {
    if(confirm("Delete movie ?")) {
      this.http.delete(`http://localhost:8080/movies/api/delete/${id}`).subscribe();
      location.reload();
    }
  }

  openModal(modal: string) {
    document.getElementById(modal + '-modal')!.classList.remove("hidden");
  }

   closeModal(modal: string) {
     document.getElementById(modal + '-modal')!.classList.add("hidden");
   }

   searchMovies(event:any) {
    this.movies = this.moviesTemp.filter((e: { name: string; }) => { return e.name.toLowerCase().includes(event.toLowerCase()) })
   }

  check(v:any) {
    console.log(v)
  }
}
