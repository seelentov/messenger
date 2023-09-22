import { useEffect, useState } from 'react'
import { useGetDialogQuery } from '../../../store/api/messages.api'
import { LoadingMin } from '../../ui/Loading/LoadingMin'
import { useThisStore } from './../../../hooks/useThisStore'
import { sortByTime } from './../../../service/sortByTime'
import styles from './Messages.module.scss'
import { MessagesItem } from './MessagesItem'

export const Messages = () => {
	const { id } = useThisStore('user')


const { isLoading, data } = useGetDialogQuery()

	const [messagesData, setMessagesData] = useState('')
  
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!isLoading && data) {
			setMessagesData(data)
			setLoading(false)
		}
	}, [data, isLoading])

	return (
		<>
			{loading && <LoadingMin />}
			{!isLoading &&
				messagesData &&
				messagesData
					.filter(e => e.users.includes(id))
          .filter(e => e.messages.length > 0)
          .sort((a, b) => b.lastUpd - a.lastUpd)
					.map(e => (
						<MessagesItem
							key={e.id}
							userId={e.users[0] === id ? e.users[1] : e.users[0]}
							msgs={sortByTime(e.messages)}
							unread={e.new}
						/>
					))}
          {messagesData && messagesData
					.filter(e => e.users.includes(id)).length === 0 && (<p style={{textAlign: 'center'}}>Входящих нет</p>)}
			<div className={styles.messages}></div>
		</>
	)
}

//<MessagesItem key={dialog.id} userId={dialog.id} msgs={dialog.msgs} />
