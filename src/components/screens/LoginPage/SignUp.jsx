import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import { usePostTaskMutation } from '../../../store/api/user.api'
import { Loading } from '../../ui/Loading/Loading'
import { setCookieLogin } from './../../../service/cookieLogin'
import styles from './Login.module.scss'
import { LoginError } from './LoginError'

export const SignUp = () => {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [birth, setBirth] = useState('')
	const [pass, setPass] = useState('')
	const [errors, setErrors] = useState([])
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const [newUser] = usePostTaskMutation()
	const { setUser } = useActions()

	const handleSubmit = e => {
		e.preventDefault()
    setErrors([])
		setLoading(true)
		
		const auth = getAuth()
		createUserWithEmailAndPassword(auth, email, pass)
			.then(({ user }) => {
				setUser({
					email: user.email,
					id: user.uid,
					token: user.accessToken,
				})
				setCookieLogin({
					id: user.uid,
					token: user.accessToken,
				})

				newUser({
					id: user.uid,
					email: user.email,
					name: name,
					img: '/src/assets/no-img.jpg',
          birth: birth
				})

				navigate('/')
			})
			.then(() => {
				setLoading(false)
			})
			.catch(e => {
				if (e.message.includes('password')) {
					console.log(e)
					setErrors([['Пароль должен быть более 6-ти символов']])
				}
				if (e.message.includes('invalid-email')) {
					console.log(e)
					if (!errors.includes('Используйте валидный e-mail')) {
						setErrors([['Используйте валидный e-mail']])
					}
				}
				if (e.message.includes('email-already-in-use')) {
					console.log(e)
					setErrors([['Этот e-mail уже используется другим пользователем']])
				}
				setLoading(false)
			})
	}

	return (
		<>
			{loading && <Loading />}
			<form className={styles.form} onSubmit={e => handleSubmit(e)}>
				<input
					type='text'
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder='your@email.com'
					name='email'
          required
				/>
				<input
					type='password'
					value={pass}
					onChange={e => setPass(e.target.value)}
					placeholder='Пароль'
					name='pass'
          required
				/>
				<input
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder='Никнейм'
					name='name'
          required
				/>
				<input
					type='date'
					value={birth}
					onChange={e => {
            setBirth(e.target.value)
          console.log(birth)}}
					placeholder='День рождения (ДД.ММ.ГГГГ)'
					name='birthday'
					pattern='\d{2}.\d{2}.\d{4}'
					min={10}
          required
				/>
				<input type='submit' value='Зарегистрировать' />
				<LoginError errors={errors} />
				<div className={styles.swipeDesc}>
					<svg
						style={{ rotate: '180deg' }}
						xmlns='http://www.w3.org/2000/svg'
						fill='white'
						stroke='white'
					>
						<path d='M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z' />
					</svg>
					Свайпните вправо для входа
				</div>
			</form>
		</>
	)
}
