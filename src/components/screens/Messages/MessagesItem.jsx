/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetPostQuery } from '../../../store/api/user.api'
import styles from './Messages.module.scss'

export const MessagesItem = ({ userId, msgs, unread }) => {
	const { isLoading, data } = useGetPostQuery(userId)
	const [isLast, setIsLast] = useState(false)

	const lastMsg = msgs.slice(-1)[0]
	useEffect(() => {
		setIsLast(lastMsg[1] === userId)
	}, [lastMsg, userId])

	return (
		<div
			className={styles.item}
			style={{
				outline: unread !== 0 && isLast ? '2px #006837 solid' : 'none',
			}}
		>
			{!isLoading && (
				<>
					<div className={styles.itemImg}>
						<Link to={`/${userId}`}>
							<img
								src={data.img !== '' ? data.img : '/src/assets/no-img.jpg'}
							/>
						</Link>
					</div>
					<div className={styles.itemInfo}>
						<p className={styles.itemName}>{data.name}</p>
						<p className={styles.itemUnread}>
							{isLast ? `${unread !== 0 && unread + ' сообщения'}` : <br />}
						</p>
						<p
							className={styles.itemLast}
							style={{ fontWeight: !isLast ? 200 : 500 }}
						>
							{lastMsg[2]}
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
