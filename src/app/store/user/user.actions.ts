import { createAction } from '@ngrx/store'

import { User } from '../../models/user.interface'

export const setUser = createAction('[User] Set User', (user: User) => ({
  user
}))
export const resetUser = createAction('[User] Reset User')
