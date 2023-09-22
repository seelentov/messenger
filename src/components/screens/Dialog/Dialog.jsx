/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useThisStore } from '../../../hooks/useThisStore'
import {
	useClearNewMutation,
	useGetDialogQuery,
	useNewDialogMutation,
} from '../../../store/api/messages.api'
import { useGetPostQuery } from '../../../store/api/user.api'
import { LoadingMin } from '../../ui/Loading/LoadingMin'
import { formatTime } from './../../../service/formatTime'
import { sortByTime } from './../../../service/sortByTime'
import styles from './Dialog.module.scss'
import { SendForm } from './SendForm'

export const Dialog = () => {
	const user = useThisStore('user')
	const [companion, setCompanion] = useState('')
	const [dialog, setDialog] = useState('')

	const [loading, setLoading] = useState(true)

	const { id } = useParams()
	const { isLoading: msgIsLoading, data: msgData } = useGetDialogQuery()
	const [clearNew] = useClearNewMutation()
	const { isLoading, data } = useGetPostQuery(id)
	const [newDialog] = useNewDialogMutation()

	useEffect(() => {
		if (!isLoading && data) {
			setCompanion(data)
			if (!msgIsLoading && msgData) {
				if (!msgData.filter(e => e.users.includes(id) && e.users.includes(id))[0]) {
					newDialog({
						users: [id, user.id],
						messages: [],
						new: 0,
            lastUpd: Date.now(),
            lastSenler: user.id
					}).then(() => {
						setDialog(msgData.filter( e => e.users.includes(id) && e.users.includes(id))[0])
					})
				} else {
					setDialog(msgData.filter(e => e.users.includes(id, user.id))[0])

					let last = dialog && dialog.messages && dialog.messages.length > 0 ? dialog.messages.slice(-1)[0][1] : 0

					dialog?.messages && user.id !== last && clearNew(dialog.id)

				}
				setLoading(false)
				window.scrollTo(0, document.body.scrollHeight)
			}
		}
	}, [
		isLoading,
		data,
		msgIsLoading,
		msgData,
		user,
		id,
		clearNew,
		dialog?.messages,
		newDialog,
	])
	return (
		<>
			{loading && <LoadingMin />}
			<div className={styles.dialog}>
				<div className={styles.user}>
					<Link to={`/${id}`}>
						<img src={companion.img} />
					</Link>
					<p>{companion.name}</p>
				</div>
				<div className={styles.messages}>
					{dialog?.messages ? (
						sortByTime(dialog.messages).map((e, key) => (
							<MessageItem
								key={key}
								text={e[2]}
								pos={e[1] !== id}
								time={e[0]}
							/>
						))
					) : (
						<p>Пока ничего...</p>
					)}
				</div>
        {
          dialog &&
          dialog.id &&
          <SendForm
					dialogID={dialog.id}
					userID={user.id}
					msgs={dialog && dialog?.messages ? sortByTime(dialog.messages) : null}
				/>
        }	
			</div>
		</>
	)
}

const MessageItem = ({ pos, time, text }) => {
	const date = formatTime(new Date(time))

	return (
		<div
			className={styles.message}
			style={{
				textAlign: pos ? 'right' : '',
				marginLeft: pos ? 'auto' : '',
				background: pos ? 'white' : '#343434',
				color: pos ? '#343434' : 'white',
			}}
		>
			<div className={styles.text}>{text}</div>
			<div className={styles.date}>{date}</div>
		</div>
	)
}
