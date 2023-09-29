import Cookies from 'js-cookie'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginPage } from '../components/screens/LoginPage/LoginPage'
import { Welcome } from '../components/screens/Welcome/Welcome'
import { Loading } from '../components/ui/Loading/Loading'
import { useActions } from '../hooks/useActions'
import { useAuth } from '../hooks/useAuth'
import { notNewUser } from '../service/cookieNewUser'
import { getData } from '../store/api/firebase/firebase.endpoints'

export const IsAuth: FC<{ children: React.ReactNode }> = ({ children }) => {
	const { setUser } = useActions()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const thisUser = Cookies.get('id')

	useEffect(() => {
		setLoading(true)

		if (!thisUser) {
			return setLoading(false)
		} else {
			getData('users', thisUser, (r:UserInformation) => {
				setUser({
					email: r.email,
					id: thisUser,
					token: Cookies.get('token'),
					name: r.name,
					img: r.img,
					birth: r.birth,
				})
			}).then(() => setLoading(false))
		}
	}, [thisUser])

	const [state, setState] = useState<string>('open')

	const next:Function = () => {
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
			) : Cookies.get('new') ? (
				<LoginPage />
			) : (
				<Welcome state={state} next={next} />
			)}
		</>
	)
}
