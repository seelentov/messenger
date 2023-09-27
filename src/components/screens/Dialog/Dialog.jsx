/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useThisStore } from '../../../hooks/useThisStore'

import {
	getAllData,
	getData,
	subscribeData,
	updateData,
} from '../../../store/api/firebase/firebase.endpoints'
import { LoadingMin } from '../../ui/Loading/LoadingMin'
import { formatTime } from './../../../service/formatTime'
import { sortByTime } from './../../../service/sortByTime'
import styles from './Dialog.module.scss'
import { SendForm } from './SendForm'

export const Dialog = () => {
	const user = useThisStore('user')
	const [companion, setCompanion] = useState('')

	const [dialog, setDialog] = useState('')

	const [loading, setLoading] = useState(false)

	const { id } = useParams()
	const bottomRef = useRef()

	
	useEffect(() => {
		setLoading(true)

		getData('users', id, r => {
			setCompanion(r)
		})

		getAllData('messages', data => {
			const thisDialog = data.filter(
				e => e.users.includes(id) && e.users.includes(id)
			)[0]
      
			if (user.id !== thisDialog.lastSenler) {
        updateData('messages', thisDialog.id, {
          new: 0,
        })
      }
      
			const unsub = subscribeData('messages', thisDialog.id, r => {
				setDialog(r)
        setTimeout(()=>{
          {bottomRef.current?.scrollIntoView({ scroll: 'smooth', block: 'end' })}
        },100)
        
			}).then(()=>{
        setLoading(false)
      })
      
			return unsub
		})
	}, [id])

	return (
		<>
    
			{loading && <LoadingMin />}
			<div className={styles.dialog}>
        {companion && 
        <div className={styles.user}>
        <Link to={`/${id}`}>
          <img src={companion.img} />
        </Link>
        <p>{companion.name}</p>
      </div>
        }
				
				<div className={styles.messages} ref={bottomRef}>
					{dialog?.messages ? (
						sortByTime(dialog.messages).map((e, key) => (
							<MessageItem
								key={key}
								text={e.text}
								pos={e.user !== id}
								time={e.time}
							/>
						))
					) : (
						<p>Пока ничего...</p>
					)}
          
				</div>
				{dialog && (
					<SendForm
						dialogID={dialog.id}
						userID={user.id}
						msgs={
							dialog && dialog?.messages ? sortByTime(dialog.messages) : null
						}
						news={dialog.new}
						lastSenler={dialog.lastSenler}
					/>
				)}
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
