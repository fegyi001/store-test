import { TestBed } from '@angular/core/testing'
import { MemoizedSelector } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { cold } from 'jasmine-marbles'

import { AppState } from '../store/app.state'
import * as fromApp from '../store/app.state'
import { AuthGuard } from './auth.guard'

describe('Auth Guard', () => {
  let guard: AuthGuard
  let store: MockStore<AppState>
  let loggedIn: MemoizedSelector<fromApp.AppState, boolean>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, provideMockStore()]
    })
    store = TestBed.inject(MockStore)
    guard = TestBed.inject(AuthGuard)
    loggedIn = store.overrideSelector(fromApp.selectLoggedIn, false)
  })

  it('should return false if the auth state is not logged in', () => {
    const expected = cold('(a|)', { a: false })
    expect(guard.canActivate()).toBeObservable(expected)
  })

  it('should return true if the auth state is logged in', () => {
    const expected = cold('(a|)', { a: true })
    loggedIn.setResult(true)
    expect(guard.canActivate()).toBeObservable(expected)
  })
})
