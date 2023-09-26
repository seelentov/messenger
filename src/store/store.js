/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { userSlice } from './user/user.slice'

const logger = createLogger({
  collapsed: true
})

export const actions = {
  ...userSlice.actions
}

const reducers = combineReducers({
  user: userSlice.reducer
})

export const store = configureStore({
  reducer: reducers
})
