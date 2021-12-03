import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
export class AppComponent implements OnInit {
  user$: Observable<User | null>;

  keycloak = Keycloak('/assets/keycloak.json');

  constructor(private store: Store<AppState>, private router: Router) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.keycloak
      .init({ onLoad: 'login-required' })
      .then((authenticated: boolean) => {
        if (authenticated && this.keycloak.token && this.keycloak.tokenParsed) {
          console.log(this.keycloak.token);
          console.log(this.keycloak.tokenParsed);
          const user: User = {
            email: (this.keycloak.tokenParsed as any).email,
            jwt: this.keycloak.token,
          };
          this.store.dispatch(setUser(user));
          this.router.navigate(['/home']);
        }
      });
  }

  logout() {
    this.keycloak.logout().then(() => {
      this.store.dispatch(resetUser());
      this.store.dispatch(resetJokes());
      this.router.navigate(['/']);
    });
  }
}
