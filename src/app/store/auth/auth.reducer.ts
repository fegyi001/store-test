import { createReducer, on } from '@ngrx/store'

import { User } from '../../models/user.interface'
import { resetUser, setUser } from './auth.actions'

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

export const getUser = (state: State) => state.user
