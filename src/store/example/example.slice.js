/*
import { createSlice } from '@reduxjs/toolkit'

initialState = {

}

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    toggleExample: (state, { payload: item }) => {
      if (state.some(r => r.id === item.id)) {
        const index = state.findIndex(item => item.id === item.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      } else {
        state.push(item)
      }
    }
  }
})
*/