import { useEffect, useState } from 'react'
import { useThisStore } from '../../../hooks/useThisStore'
import { sortByTime } from '../../../service/sortByTime'
import { subscribeColl } from '../../../store/api/firebase/firebase.endpoints'
import { LoadingMin } from '../../ui/Loading/LoadingMin'
import styles from './Messages.module.scss'
import { MessagesItem } from './MessagesItem'
export const Messages = () => {
	const { id } = useThisStore('user')

	const [messagesData, setMessagesData] = useState<AllMessages>()

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		const unsub = subscribeColl('messages', (doc: AllMessages) => {
			setMessagesData(doc)
			setLoading(false)
		})
		return () => {
			unsub
		}
	}, [])

	return (
		<>
			{loading && <LoadingMin />}
			{!loading &&
				messagesData &&
				messagesData
					.filter(e => e.users.includes(id))
					.filter(e => e.messages.length > 0)
					.sort((a, b) => b.lastUpd - a.lastUpd)
					.map((e, key) => {
						return (
							<MessagesItem
								key={key}
								userId={e.users[0] === id ? e.users[1] : e.users[0]}
								msgs={sortByTime(e.messages)}
								unread={e.new}
								lastSenler={e.lastSenler}
							/>
						)
					})}
			{messagesData &&
				messagesData.filter(e => e.users.includes(id)).length === 0 && (
					<p style={{ textAlign: 'center' }}>Входящих нет</p>
				)}
			<div className={styles.messages}></div>
		</>
	)
}

//<MessagesItem key={dialog.id} userId={dialog.id} msgs={dialog.msgs} />
