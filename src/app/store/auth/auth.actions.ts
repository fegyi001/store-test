import { createAction } from '@ngrx/store'

import { User } from '../../models/user.interface'

export const setUser = createAction('[Auth] Set User', (user: User) => ({
  user
}))
export const resetUser = createAction('[Auth] Reset User')
