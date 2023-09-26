/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginPage } from '../components/screens/LoginPage/LoginPage'
import { Welcome } from '../components/screens/Welcome/Welcome'
import { Loading } from '../components/ui/Loading/Loading'
import { useAuth } from '../hooks/useAuth'
import { notNewUser, useNew } from '../service/cookieNewUser'
import { getData } from '../store/api/firebase/firebase.endpoints'
import { useActions } from './../hooks/useActions'
//import { clearCookieLogin } from '../service/cookieLogin'

export const IsAuth = ({ children }) => {
	const { setUser } = useActions()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		//clearCookieLogin() //Очистить id, token в cookie
		const thisUser = Cookies.get('id')
		if (!thisUser) {
			return setLoading(false)
		} else {
			getData('users', thisUser, r => {
				setUser({
					email: r.email,
					id: thisUser,
					token: Cookies.get('token'),
					name: r.name,
					img: r.img,
					birth: r.birth,
					messages: r.messages,
				})
			}).then(() => setLoading(false))
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
