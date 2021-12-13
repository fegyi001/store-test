import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store'

import * as fromJokes from './jokes/jokes.reducers'

export interface HomeState {
  jokes: fromJokes.State
}

export const reducers: ActionReducerMap<HomeState> = {
  jokes: fromJokes.reducer
}

export const getJokesState = createFeatureSelector<HomeState>('home')

export const getJokes = createSelector(
  getJokesState,
  (state: HomeState) => state.jokes.jokes
)
