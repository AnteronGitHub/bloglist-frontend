import userService from '../services/users'

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({ type: 'SET_USERS', users })
  }
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.users
    default:
      return state
  }
}

export default usersReducer
