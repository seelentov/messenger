import { createSlice } from '@reduxjs/toolkit'


let initialState = {
  scroll: true
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleScroll: (state) => {
      state.scroll = !state.scroll
    },
  }
})