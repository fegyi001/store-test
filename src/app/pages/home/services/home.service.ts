import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { AppState } from '../../../store/app.state'
import { Joke } from '../models/joke.interface'
import { getJokes } from '../state/home.state'
import { addJoke } from '../state/jokes/jokes.actions'
import { HomeApiService } from './home.api.service'

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private api: HomeApiService, private store: Store<AppState>) {}

  fetchJoke$(): Observable<Joke> {
    return this.api.fetchJoke$()
  }

  getJokes$(): Observable<Joke[]> {
    return this.store.select(getJokes)
  }

  addJoke(joke: Joke): void {
    this.store.dispatch(addJoke(joke))
  }
}
