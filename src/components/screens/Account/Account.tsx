import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useThisStore } from '../../../hooks/useThisStore'

import { useActions } from '../../../hooks/useActions'
import { copyToClipboard } from '../../../service/copyToCopiboard'
import { LoadingMin } from '../../ui/Loading/LoadingMin'
import styles from './Account.module.scss'
import { EditIMG } from './EditIMG'

import { subscribeData } from '../../../store/api/firebase/firebase.endpoints'
import { Name } from './Name'

export const Account = () => {
	const { id } = useParams() as any

	const thisUser = useThisStore('user')
	const isMyAccount = thisUser.id === id

	const [user, setUser] = useState<UserInformation>({
		id: '',
		name: '',
		img: '',
		birth: '',
		email: '',
	})
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		setLoading(true)

		const unsub = subscribeData('users', id, (doc: UserInformation) => {
			setUser({ ...doc, id: id as string })
		}).then(() => {
			setLoading(false)
		})

		return () => {
			unsub
		}
	}, [id])

	const { logout } = useActions()
	const logOut = () => {
		logout()
	}

	return (
		<>
			{!loading ? (
				<div className={styles.account}>
					<div className={styles.user}>
						<img className={styles.userImage} src={user?.img} />
						{isMyAccount && <EditIMG userId={user?.id} />}
						{isMyAccount ? (
							<Name name={user.name} id={user.id} />
						) : (
							<h3>{user.name}</h3>
						)}
					</div>
					<div className={styles?.info}>
						<table>
							<tbody>
								<tr>
									<th>ID:</th>
									<td
										className={styles.id}
										onClick={() => copyToClipboard(user?.id)}
									>
										{user.id?.slice(0, 12) + '...'}
										<p>Нажмите, что бы скопировать</p>
									</td>
								</tr>
								<tr>
									<th>День рождения:</th>
									<td className={styles.birth}>
										<>{user.birth}</>
									</td>
								</tr>
								<tr>
									<th>E-mail:</th>
									<td>{user.email}</td>
								</tr>
							</tbody>
						</table>
					</div>
					{isMyAccount ? (
						<button className={styles.logout} onClick={() => logOut()}>
							Выйти
						</button>
					) : (
						<Link to={`/dialog/${user.id}`}>
							<button className={styles.dialog}>В диалог</button>
						</Link>
					)}
				</div>
			) : (
				<LoadingMin />
			)}
		</>
	)
}
