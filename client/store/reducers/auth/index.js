// @flow
import {
  AUTHENTICATE,
  LOGOUT
} from '~/store/constants'

const INIT_STATE = {
  user: undefined
}

const update = (
  state: {
    user: any
  } = INIT_STATE,
  action: {
    type: string,
    user: any
  }
) => {

  const {
    type
  } = action
  if (type === AUTHENTICATE) {
    const {
      user
    } = action
    return { ...state, user }
  }
  else if (type === LOGOUT) {
    return { ...INIT_STATE }
  }
  return state
}

export { update as auth }
