import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import { setCookieLogin } from '../../../service/cookieLogin'
import { addToData } from '../../../store/api/firebase/firebase.endpoints'
import { Loading } from '../../ui/Loading/Loading'
import styles from './Login.module.scss'
import { LoginError } from './LoginError'

export const SignUp = () => {
	const [userForm, setUserForm] = useState<UserForm>({
		name: '',
		birth: '',
		email: '',
		pass: '',
	})

	const [errors, setErrors] = useState<string[]>([])

	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const { setUser } = useActions()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		setErrors([])
		const auth = getAuth()
		createUserWithEmailAndPassword(auth, userForm.email, userForm.pass)
			.then((userCredential: any) => {
				const { user } = userCredential
				setUser({
					email: user.email,
					id: user.uid,
					token: user.accessToken,
				})
				addToData('users', user.uid, {
					id: user.uid,
					email: user.email,
					name: userForm.name,
					img: '/src/assets/no-img.jpg',
					birth: userForm.birth,
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
			.catch(e => {
				setLoading(false)
				if (e.message.includes('password')) {
					console.log(e)
					setErrors(['Пароль должен быть более 6-ти символов'])
				}
				if (e.message.includes('invalid-email')) {
					console.log(e)
					if (!errors.includes('Используйте валидный e-mail')) {
						setErrors(['Используйте валидный e-mail'])
					}
				}
				if (e.message.includes('email-already-in-use')) {
					console.log(e)
					setErrors(['Этот e-mail уже используется другим пользователем'])
				}
			})
	}

	return (
		<>
			{loading && <Loading />}
			<form className={styles.form} onSubmit={e => handleSubmit(e)}>
				<input
					type='text'
					value={userForm.email}
					onChange={e => setUserForm({ ...userForm, email: e.target.value })}
					placeholder='your@email.com'
					name='email'
					required
				/>
				<input
					type='password'
					value={userForm.pass}
					onChange={e => setUserForm({ ...userForm, pass: e.target.value })}
					placeholder='Пароль'
					name='pass'
					required
				/>
				<input
					type='text'
					value={userForm.name}
					onChange={e => setUserForm({ ...userForm, name: e.target.value })}
					placeholder='Никнейм'
					name='name'
					required
				/>
				<input
					type='date'
					value={userForm.birth}
					onChange={e => setUserForm({ ...userForm, birth: e.target.value })}
					placeholder='День рождения (ДД.ММ.ГГГГ)'
					name='birthday'
					pattern='\d{2}.\d{2}.\d{4}'
					min={10}
					required
				/>
				<input type='submit' value='Зарегистрировать' disabled={!userForm} />
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
