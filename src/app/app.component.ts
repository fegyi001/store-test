import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from './models/user.interface';
import { resetJokes } from './pages/home/store/jokes/jokes.actions';
import { AppState } from './store';
import { resetUser } from './store/user/user.actions';
import { selectUser } from './store/user/user.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$: Observable<User | null>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.user$ = this.store.select(selectUser);
  }

  logout() {
    this.store.dispatch(resetUser());
    this.store.dispatch(resetJokes());
    this.router.navigate(['/']);
  }
}
