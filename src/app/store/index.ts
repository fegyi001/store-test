import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import * as fromUser from './user/user.reducer';

export interface AppState {
  user: fromUser.State;
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
