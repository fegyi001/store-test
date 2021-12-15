import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { User } from './models/user.interface'
import { AppState } from './store/app.state'
import { setUser } from './store/auth/auth.actions'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private store: Store<AppState>) {}

  getUser$(): Observable<User | null> {
    return this.store.select((state) => state.auth.user)
  }

  setUser(user: User | null) {
    this.store.dispatch(setUser(user))
  }

  addTwoNumbers(num1: number, num2: number): number {
    return num1 + num2
  }

  subtractTwoNumbers(num1: number, num2: number): number {
    return num1 - num2
  }
}
