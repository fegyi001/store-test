import { TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { combineLatest, first, of } from 'rxjs'

import { AppState } from '../store/app.state'
import { AuthGuard } from './auth.guard'

describe('Auth Guard', () => {
  let guard: AuthGuard
  let store: MockStore<AppState>
  const initialState: AppState = { auth: { user: null } }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, provideMockStore({ initialState })]
    })
    store = TestBed.inject(MockStore)
    guard = TestBed.inject(AuthGuard)
  })

  it('should return false if the auth state is not logged in', () => {
    const expected$ = of(false)
    combineLatest([expected$, guard.canActivate()])
      .pipe(first())
      .subscribe(([expected, canActivate]) => {
        expect(expected).toEqual(canActivate)
      })
  })

  it('should return true if the auth state is logged in', () => {
    store.setState({
      auth: {
        user: { jwt: 'aaa', profile: { email: 'test@test.com' } }
      }
    })
    const expected$ = of(true)
    combineLatest([expected$, guard.canActivate()])
      .pipe(first())
      .subscribe(([expected, canActivate]) => {
        expect(expected).toEqual(canActivate)
      })
    // const expected = cold('(a|)', { a: true })
    // expect(guard.canActivate()).toBeObservable(expected)
  })
})
