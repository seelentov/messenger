import { createSlice } from '@reduxjs/toolkit'


let initialState = {
  email: null,
  token: null,
  id: null,
  name: null,
  img: null,
  birth: null,
  messages: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload: inputs }) => {
      state.email = inputs.email
      state.token = inputs.token
      state.id = inputs.id
      state.name = inputs.name
      state.img = inputs.img
      state.birth = inputs.birth
      state.messages = inputs.messages
    },
    logout: (state,) => {
      state.email = null
      state.token = null
      state.id = null
      state.name = null
      state.img = null
      state.birth = null
      state.messages = []
    }
  }
})