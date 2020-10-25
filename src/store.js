import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import authReducer from './reducers/authReducer'

export default createStore(
  combineReducers({
    auth: authReducer,
    blogs: blogsReducer,
    notification: notificationReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)
