import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { StoreService } from '../store/store.service'
import { selectUser } from '../store/user/user.reducer'

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {
  constructor(private router: Router, private storeService: StoreService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.storeService
      .getStore()
      .select(selectUser)
      .pipe(
        map((user) => user !== null),
        tap((loggedIn) => {
          if (!loggedIn) {
            this.router.navigate(['/'])
            return false
          }
          return true
        })
      )
  }
}
