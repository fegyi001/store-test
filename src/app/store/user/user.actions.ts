import { createAction } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';


export const setUser = createAction('[User] Set User', (user: User) => ({ user }));
