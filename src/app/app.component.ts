import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import * as Keycloak from 'keycloak-js'
import { filter, Observable, Subscription } from 'rxjs'

import { User } from './models/user.interface'
import { AppState } from './store'
import { setUser } from './store/user/user.actions'
import { selectUser } from './store/user/user.reducer'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  user$: Observable<User | null>
  userAuthenticatedSub: Subscription | null
  keycloak: Keycloak.KeycloakInstance

  constructor(private store: Store<AppState>, private router: Router) {
    this.user$ = this.store.select(selectUser)
    this.userAuthenticatedSub = this.user$
      .pipe(filter((user) => user !== null))
      .subscribe(() => {
        this.router.navigate(['/home'])
      })
    this.keycloak = Keycloak('/assets/keycloak.json')
  }

  ngOnInit() {
    this._login()
  }

  ngOnDestroy() {
    this.userAuthenticatedSub?.unsubscribe()
  }

  logout() {
    this.keycloak
      .logout()
      .then(() => {
        location.reload()
      })
      .catch((error) => {
        console.error('Error logging out', error)
      })
  }

  private _login(): void {
    this.keycloak
      .init({ onLoad: 'login-required' })
      .then(() => this.keycloak.loadUserProfile())
      .then((profile) => this._storeUser(profile))
      .catch((error) => {
        console.error('Error during login: ', error)
      })
  }

  private _storeUser(userProfile: Keycloak.KeycloakProfile): void {
    const user: User = {
      profile: userProfile,
      jwt: this.keycloak.token
    }
    this.store.dispatch(setUser(user))
  }
}
