import { createReducer, createSelector, on } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';

import { AppState } from '..';
import { setUser } from './user.actions';

export const userFeatureKey = 'user';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user }))
);

export const selectUserState = (state: AppState) => state.user;

export const selectUser = createSelector(
  selectUserState,
  (state: State) => state.user
);
