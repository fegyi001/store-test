import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store'

import { environment } from '../../environments/environment'
import * as fromUser from './user/user.reducer'

export interface AppState {
  userState: fromUser.State
}

export const reducers: ActionReducerMap<AppState> = {
  userState: fromUser.reducer
}

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('%c state ', 'color: blue', state)
    console.log('%c action ', 'color: magenta', action)
    return reducer(state, action)
  }
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [debug]
  : []
