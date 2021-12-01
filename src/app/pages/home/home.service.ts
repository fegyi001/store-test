import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Joke } from 'src/app/models/joke.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  fetchJoke$(): Observable<Joke> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<Joke>('https://icanhazdadjoke.com', { headers });
  }
}
