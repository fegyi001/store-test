import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, take } from 'rxjs'
import { map } from 'rxjs/operators'

import { AppState, selectLoggedIn } from '../store/app.state'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectLoggedIn).pipe(
      map((authed) => {
        if (!authed) {
          this.router.navigate(['/'])
          return false
        }
        return true
      }),
      take(1)
    )
  }
}
