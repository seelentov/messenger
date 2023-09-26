/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useThisStore } from '../../../hooks/useThisStore'

import { LoadingMin } from '../../ui/Loading/LoadingMin'
import { formatTime } from './../../../service/formatTime'
import { sortByTime } from './../../../service/sortByTime'
import styles from './Dialog.module.scss'
import { SendForm } from './SendForm'
import { getAllData, getData, subscribeData } from '../../../store/api/firebase/firebase.endpoints'

export const Dialog = () => {
	const user = useThisStore('user')
	const [companion, setCompanion] = useState('')
	const [scroll, setScroll] = useState(true)

	const [dialog, setDialog] = useState('')

	const [loading, setLoading] = useState(false)

	const { id } = useParams()
  const bottomRef = useRef()

  {scroll && bottomRef.current?.scrollIntoView({behavior: 'smooth'})}
	useEffect(() => {
    setLoading(true)
		
    getData('users', id, (r)=>{
      setCompanion(r)
    })
   
      getAllData('messages', (data)=>{
        subscribeData('messages', data.filter(e=> e.users.includes(id) && e.users.includes(id))[0].id, (r)=>{
          setDialog(r)
          setScroll(true)
        setLoading(false)
      })
      
    })
		
	}, [id])

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
								text={e.text}
								pos={e.user !== id}
								time={e.time}
							/>
						))
					) : (
						<p>Пока ничего...</p>
					)}
				</div>
        {
          dialog &&
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
