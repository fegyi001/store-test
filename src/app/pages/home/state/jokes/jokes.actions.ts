import { createAction } from '@ngrx/store'
import { Joke } from 'src/app/pages/home/models/joke.interface'

export const addJoke = createAction('[Jokes] Add Joke', (joke: Joke) => ({
  joke
}))

export const resetJokes = createAction('[Jokes] Reset Jokes')
