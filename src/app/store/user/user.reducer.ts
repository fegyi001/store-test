import { createReducer, createSelector, on } from '@ngrx/store'
import { User } from 'src/app/models/user.interface'

import { AppState } from '../app.state'
import { resetUser, setUser } from './user.actions'

export interface State {
  user: User | null
}

export const initialState: State = {
  user: null
}

export const reducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user })),
  on(resetUser, (state) => ({ ...state, user: null }))
)

export const selectUserState = (state: AppState) => state.userState

export const selectUser = createSelector(
  selectUserState,
  (state: State) => state.user
)
