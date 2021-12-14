import {
  ActionReducer,
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store'

import { environment } from '../../environments/environment'
import * as fromAuth from './auth/auth.reducer'

export interface AppState {
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer
}

export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    const result = reducer(state, action)
    console.groupCollapsed(action.type)
    console.log('prev state', state)
    console.log('action', action)
    console.log('next state', result)
    console.groupEnd()
    return result
  }
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : []

export const selectAuthState = (state: AppState) => state.auth

export const selectUser = createSelector(selectAuthState, fromAuth.getUser)

export const selectLoggedIn = createSelector(selectUser, (user) => !!user)
