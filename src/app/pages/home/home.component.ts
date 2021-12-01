import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Joke } from 'src/app/models/joke.interface';
import { AppState } from 'src/app/store';

import { HomeService } from './home.service';
import { getJokes } from './store';
import { addJoke } from './store/jokes/jokes.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  jokes$: Observable<Joke[]>;

  constructor(
    private store: Store<AppState>,
    private homeService: HomeService
  ) {
    this.jokes$ = this.store.select(getJokes);
  }

  getNewJoke() {
    this.homeService.fetchJoke$().subscribe((joke) => {
      this.store.dispatch(addJoke(joke));
    });
  }
}
