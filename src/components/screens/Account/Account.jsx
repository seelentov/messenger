/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useThisStore } from '../../../hooks/useThisStore'
import { clearCookieLogin } from '../../../service/cookieLogin'
import { LoadingMin } from '../../ui/Loading/LoadingMin'
import { useActions } from './../../../hooks/useActions'
import { copyToClipboard } from './../../../service/copyToCopiboard'
import styles from './Account.module.scss'
import { EditIMG } from './EditIMG'

import {
	subscribeData,
	updateData,
} from '../../../store/api/firebase/firebase.endpoints'

export const Account = () => {
	const { id } = useParams()
	const thisUser = useThisStore('user')

	const [userId, setUserId] = useState('')
	const [name, setName] = useState('')
	const [img, setImg] = useState('')
	const [birth, setBirth] = useState('')
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(true)
	const isMyAccount = thisUser.id === id

	const [nameEdit, setNameEdit] = useState(false)
	const [editImage, setEditImage] = useState(false)

	const nameRef = useRef()
	useEffect(() => {
		setLoading(true)

		const unsub = subscribeData('users', id, doc => {
			setName(doc.name)
			setImg(doc.img)
			setUserId(doc.id)
			setBirth(doc.birth)
			setEmail(doc.email)
			setLoading(false)
		})

		nameEdit && nameRef.current.focus()

		return () => {
			unsub
		}
	}, [id])

	const { logout } = useActions()
	const logOut = () => {
		clearCookieLogin()
		logout()
	}

	const onBlurName = () => {
		updateData('users', userId, {
			name: name,
		})
		setNameEdit(false)
	}

	return (
		<>
			{loading && <LoadingMin />}
			<div className={styles.account}>
				<div className={styles.user}>
					<img className={styles.userImage} src={img} />
					{isMyAccount && (
						<>
							<img
								className={styles.editImage}
								src='/src/assets/edit.svg'
								onClick={() => setEditImage(true)}
							/>
							<EditIMG
								img={img}
								setImg={setImg}
								userId={userId}
								editImage={editImage}
								setEditImage={setEditImage}
							/>
						</>
					)}
					{isMyAccount ? (
						nameEdit ? (
							<input
								ref={nameRef}
								value={name}
								onBlur={() => onBlurName()}
								onChange={e => setName(e.target.value)}
							/>
						) : (
							<>
								<h3 onClick={() => setNameEdit(!nameEdit)}>{name}</h3>
								<p>Нажмите, что бы редактировать</p>
							</>
						)
					) : (
						<h3 style={{ pointerEvents: 'none' }}>{name}</h3>
					)}
				</div>
				<div className={styles.info}>
					<table>
						<tbody>
							<tr>
								<th>ID:</th>
								<td
									className={styles.id}
									onClick={() => copyToClipboard(userId)}
								>
									{userId.slice(0, 12) + '...'}
									<p>Нажмите, что бы скопировать</p>
								</td>
							</tr>
							<tr>
								<th>День рождения:</th>
								<td className={styles.birth}>
									<>{birth}</>
								</td>
							</tr>
							<tr>
								<th>E-mail:</th>
								<td>{email}</td>
							</tr>
						</tbody>
					</table>
				</div>
				{isMyAccount ? (
					<button className={styles.logout} onClick={() => logOut()}>
						Выйти
					</button>
				) : (
					<Link to={`/dialog/${userId}`}>
						<button className={styles.dialog}>В диалог</button>
					</Link>
				)}
			</div>
		</>
	)
}
