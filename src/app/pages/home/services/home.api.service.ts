import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { Joke } from '../models/joke.interface'

@Injectable({
  providedIn: 'root'
})
export class HomeApiService {
  constructor(private http: HttpClient) {}

  fetchJoke$(): Observable<Joke> {
    const headers = new HttpHeaders().set('Accept', 'application/json')
    return this.http.get<Joke>('https://icanhazdadjoke.com', { headers })
  }
}
