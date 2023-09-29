import { FC } from 'react'
import styles from './Login.module.scss'

interface LoginError {
	errors: string[]
}

export const LoginError: FC<LoginError> = ({ errors }) => {
	return (
		<div
			className={
				styles.error + ' ' + (errors.length !== 0 && styles.errorActive)
			}
		>
			{errors && errors.map((error, key) => <p key={key}>{error}</p>)}
		</div>
	)
}
