import { createSlice } from '@reduxjs/toolkit'
import { clearCookieLogin } from '../../service/cookieLogin'

let initialState = {
	token: null,
	id: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, { payload: inputs }) => {
			state.token = inputs.token
			state.id = inputs.id
		},
		logout: state => {
			clearCookieLogin()
			state.token = null
			state.id = null
		},
	},
})
