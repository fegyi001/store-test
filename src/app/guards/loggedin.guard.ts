import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedinGuard implements CanActivate {
  constructor(private router: Router, private storeService: StoreService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.storeService
      .getStore()
      .select((state) => state.user)
      .pipe(
        map((userState) => userState.user),
        map((user) => user !== null),
        tap((loggedIn) => {
          if (!loggedIn) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
      );
  }
}
