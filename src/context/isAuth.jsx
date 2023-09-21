/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Welcome } from '../components/screens/Welcome/Welcome'
//import { useActions } from '../hooks/useActions'
import axios from 'axios'
import Cookies from 'js-cookie'
import { LoginPage } from '../components/screens/LoginPage/LoginPage'
import { Loading } from '../components/ui/Loading/Loading'
import { useAuth } from '../hooks/useAuth'
import { notNewUser, useNew } from '../service/cookieNewUser'
import { useActions } from './../hooks/useActions'
import { API_URL } from './../store/api/api'
//import { clearCookieLogin } from '../service/cookieLogin'

export const IsAuth = ({ children }) => {
	const { setUser } = useActions()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		//clearCookieLogin() //Очистить id, token в cookie
		const thisUser = Cookies.get('id')
		if (!thisUser) return setLoading(false)
		else {
			axios
				.get(`${API_URL}users/${thisUser}`)
				.then(r => {
					setUser({
						email: r.data.email,
						id: thisUser,
						token: Cookies.get('token'),
						name: r.data.name,
						img: r.data.img,
						birth: r.data.birth,
						messages: r.data.messages,
					})
				})
				.then(() => setLoading(false))
				.catch(console.log)
		}
	}, [setUser, navigate])

	const [state, setState] = useState('open')

	const next = () => {
		setState('')
		setTimeout(() => {
			setState('close')
			setTimeout(() => {
				navigate('/login')
				notNewUser()
			}, 500)
		}, 200)
	}

	return (
		<>
			{loading && <Loading />}

			{useAuth() ? (
				children
			) : useNew() ? (
				<LoginPage />
			) : (
				<Welcome state={state} next={next} />
			)}
		</>
	)
}
