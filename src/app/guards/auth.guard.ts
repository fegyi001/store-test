import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Store } from '@ngrx/store'
import { first, Observable } from 'rxjs'

import { AppState, selectLoggedIn } from '../store/app.state'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectLoggedIn).pipe(first())
  }
}
