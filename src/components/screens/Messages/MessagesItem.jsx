/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getData } from '../../../store/api/firebase/firebase.endpoints'
import { LoadingMin } from '../../ui/Loading/LoadingMin'
import styles from './Messages.module.scss'
export const MessagesItem = ({ userId, msgs, unread, lastSenler }) => {
	const [loading, setLoading] = useState(false)
	const [companion, setCompanion] = useState(null)

	useEffect(() => {
		setLoading(true)
		getData('users', userId, data => {
			setCompanion(data)
			setLoading(false)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div
			className={styles.item}
			style={{
				outline: unread !== 0 && lastSenler === userId ? '2px #006837 solid' : 'none',
			}}
		>
			{loading ? (
				<LoadingMin />
			) : (
				<>
					<div className={styles.itemImg}>
						<Link to={`/${userId}`}>
							<img
								src={companion?.img ? companion.img : '/src/assets/no-img.jpg'}
							/>
						</Link>
					</div>
					<div className={styles.itemInfo}>
						<p className={styles.itemName}>{companion?.name}</p>
						<p className={styles.itemUnread}>
							{unread && unread !== 0 ? lastSenler === userId + ' сообщения' : <br />}
						</p>
						<p
							className={styles.itemLast}
							style={{ fontWeight: unread !== 0 && lastSenler === userId ? 500 : 200 }}
						>
							{msgs.slice(-1)[0] ? msgs.slice(-1)[0].text : ''}
						</p>
					</div>
					<Link to={`/dialog/${userId}`}>
						<button>
							<img src='/src/assets/message.svg' />
						</button>
					</Link>
				</>
			)}
		</div>
	)
}
