import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';

import { User } from './models/user.interface';
import { resetJokes } from './pages/home/store/jokes/jokes.actions';
import { AppState } from './store';
import { resetUser, setUser } from './store/user/user.actions';
import { selectUser } from './store/user/user.reducer';
import * as Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  user$: Observable<User | null>;
  userAuthenticatedSub: Subscription;
  keycloak = Keycloak('/assets/keycloak.json');

  constructor(private store: Store<AppState>, private router: Router) {
    this.user$ = this.store.select(selectUser);
    this.userAuthenticatedSub = this.user$
      .pipe(filter((user) => user !== null))
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

  ngOnInit() {
    this.keycloak
      .init({ onLoad: 'login-required' })
      .then((authenticated: boolean) => {
        if (authenticated && this.keycloak.token && this.keycloak.tokenParsed) {
          const user: User = {
            email: (this.keycloak.tokenParsed as any).email,
            jwt: this.keycloak.token,
          };
          this.store.dispatch(setUser(user));
        }
      });
  }

  ngOnDestroy() {
    if (this.userAuthenticatedSub) {
      this.userAuthenticatedSub.unsubscribe();
    }
  }

  logout() {
    this.keycloak.logout().then(() => {
      // Reload page to clear state
      location.reload();
    });
  }
}
