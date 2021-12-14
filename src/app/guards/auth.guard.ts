import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { AppState } from '../store/app.state'
import { selectUser } from '../store/user/user.reducer'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      map((user) => {
        if (user === null) {
          this.router.navigate(['/'])
          return false
        }
        return true
      })
    )
  }
}
