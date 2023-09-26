import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getData } from '../../../store/api/firebase/firebase.endpoints'
import { Loading } from '../../ui/Loading/Loading'
import { useActions } from './../../../hooks/useActions'
import { setCookieLogin } from './../../../service/cookieLogin'
import styles from './Login.module.scss'
import { LoginError } from './LoginError'

export const Login = () => {
	const [email, setEmail] = useState('test1@test.com')
	const [pass, setPass] = useState('test1@test.com')
	const [errors, setErrors] = useState([])
	const [loading, setLoading] = useState(false)
	const { setUser } = useActions()
	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()

		setLoading(true)
		setErrors([])

		const auth = getAuth()
		signInWithEmailAndPassword(auth, email, pass)
			.then(({ user }) => {
				getData('users', user.uid, r => {
					setUser({
						email: user.email,
						id: user.uid,
						token: user.accessToken,
						name: r.name,
						img: r.img,
						birth: r.birth,
						messages: r.messages,
					})
				})
				setCookieLogin({
					id: user.uid,
					token: user.accessToken,
				})
				navigate(`/${user.uid}`)
			})
			.then(() => {
				setLoading(false)
			})
			.catch(() => {
				setErrors(['Неверный логин или пароль'])
				setLoading(false)
			})
	}

	return (
		<>
			{loading && <Loading />}
			<form className={styles.form} onSubmit={e => handleSubmit(e)}>
				<input
					type='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder='your@email.com'
					name='email'
				/>
				<input
					type='password'
					value={pass}
					onChange={e => setPass(e.target.value)}
					placeholder='Пароль'
					name='pass'
				/>
				<input type='submit' value='Войти' />
				<LoginError errors={errors} />
				<div className={styles.swipeDesc}>
					Свайпните влево для регистрации
					<svg xmlns='http://www.w3.org/2000/svg' fill='white' stroke='white'>
						<path d='M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z' />
					</svg>
				</div>
			</form>
		</>
	)
}
