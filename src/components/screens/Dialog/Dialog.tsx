import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useThisStore } from '../../../hooks/useThisStore'
import { formatTime } from '../../../service/formatTime'
import { sortByTime } from '../../../service/sortByTime'
import {
	addToData,
	getData,
	subscribeData,
} from '../../../store/api/firebase/firebase.endpoints'
import { LoadingMin } from '../../ui/Loading/LoadingMin'
import styles from './Dialog.module.scss'
import { SendForm } from './SendForm'

export const Dialog = (): JSX.Element => {
	const user = useThisStore('user')
	const [companion, setCompanion] = useState<UserInformation>()
	const [dialog, setDialog] = useState<DialogData>()
	const [loading, setLoading] = useState<boolean>(false)

	const navigate = useNavigate()

	const { id } = useParams() as any

	const bottomRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		setLoading(true)

		const fetchData = async () => {
			await getData(
				'users',
				id,
				(r: UserInformation) => {
					setCompanion(r)
				},
				() => {
					return navigate('/')
				}
			)

			await getData(
				'messages',
				`${user.id}${id}`,
				(r: DialogData) => {
					setDialog(r)
					const unsub = subscribeData('messages', r.id, (doc: DialogData) => {
						setDialog(doc)
            bottomRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
            })
					}).then(()=>{
            setLoading(false)
          })
				},
				() => {
					getData(
						'messages',
						`${id}${user.id}`,
						(r: DialogData) => {
							setDialog(r)
							const unsub = subscribeData(
								'messages',
								r.id,
								(doc: DialogData) => {
									setDialog(doc)
                  bottomRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                  })
								}
							).then(()=>{
                setLoading(false)
              })
						},
						() => {
							const emplyDialog: DialogData = {
								id: `${user.id}${id}`,
								messages: [],
								new: 0,
								lastUpd: Date.now(),
								lastSenler: `${user.id}`,
								users: [user.id, id],
							}

							addToData('messages', `${user.id}${id}`, emplyDialog).then(() => {
								setDialog(emplyDialog)
								const unsub = subscribeData(
									'messages',
									emplyDialog.id,
									(doc: DialogData) => {
										setDialog(doc)
                    bottomRef.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'end',
                    })
									}
								).then(()=>{
                  setLoading(false)
                })
							})
						}
					)
					
				}
			)
		}
    fetchData()
	}, [id])
	return (
		<>
			{loading && <LoadingMin />}
			<div className={styles.dialog}>
				{companion && (
					<div className={styles.user}>
						<Link to={`/${id}`}>
							<img src={companion.img} alt='' />
						</Link>
						<p>{companion.name}</p>
					</div>
				)}

				<div className={styles.messages} ref={bottomRef}>
					{dialog?.messages &&
						sortByTime(dialog.messages).map((e: Message, key: number) => (
							<MessageItem
								key={key}
								text={e.text}
								pos={e.user !== id}
								time={e.time}
							/>
						))}
				</div>
				{dialog && (
					<SendForm
						dialogID={dialog.id}
						userID={user.id}
						msgs={sortByTime(dialog.messages)}
						news={dialog.new}
						lastSenler={dialog.lastSenler}
					/>
				)}
			</div>
		</>
	)
}

const MessageItem = ({ pos, time, text }: MessageItemProps): JSX.Element => {
	const date = formatTime(new Date(time))

	return (
		<div
			className={styles.message}
			style={{
				textAlign: pos ? 'right' : 'left',
				marginLeft: pos ? 'auto' : 'none',
				background: pos ? 'white' : '#343434',
				color: pos ? '#343434' : 'white',
			}}
		>
			<div className={styles.text}>{text}</div>
			<div className={styles.date}>{date}</div>
		</div>
	)
}
