import { createReducer, on } from '@ngrx/store'
import { Joke } from 'src/app/pages/home/models/joke.interface'

import { addJoke, resetJokes } from './jokes.actions'

export interface State {
  jokes: Array<Joke>
}

export const initialState: State = {
  jokes: []
}

export const reducer = createReducer(
  initialState,
  on(addJoke, (state, { joke }) => ({
    ...state,
    jokes: [...state.jokes, joke]
  })),
  on(resetJokes, (state) => ({ ...state, jokes: [] }))
)
