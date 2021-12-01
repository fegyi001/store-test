import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';

import { setUser } from './user.actions';

export const userFeatureKey = 'user';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null
};

export const reducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user }))
);
