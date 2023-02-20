import { Component, NgIterable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { faArrowRightToBracket, faArrowDown, faPlus, faAngleDown, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, NgForm } from "@angular/forms";
import { env } from "./env-local";

let headers = new HttpHeaders();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  private headers: HttpHeaders | undefined;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.headers = new HttpHeaders();
    headers = headers.set('Authorization', env.apiKey)
    this.http.get(`${env.url}/api/movies/view`, {headers: headers}).subscribe(movies => {this.moviesTemp = this.movies = movies});
  }

  movies: any = [];

  moviesTemp: any = [];

  faArrowDown = faArrowDown; faPlus = faPlus; faAngleDown = faAngleDown; faEdit = faEdit; faTrash = faTrash;
  admin = 1;
  ratingsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  search: any;

  addRequest(name: string, rating: number) {
    let body = new HttpParams();
    body = body.set('name', name);
    body = body.set('rating', rating);
    this.http.post(`${env.url}/api/movies/add`, body, {headers: headers}).subscribe();
    location.reload();
  }

  addRequestForm(form: NgForm) {
    this.addRequest(form.value.name, form.value.rating);
    this.closeModal('add');
  }

  deleteRequest(id: number) {
    if(confirm("Delete movie ?")) {
      this.http.delete(`${env.url}/movies/api/delete/${id}`, {headers: headers}).subscribe();
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
