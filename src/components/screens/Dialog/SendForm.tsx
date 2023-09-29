import { FC, FormEvent, useState } from 'react'
import { updateData } from '../../../store/api/firebase/firebase.endpoints'
import styles from './Dialog.module.scss'

interface SendForm {
	dialogID: string
	userID: string
	msgs: Message[]
	news: number
	lastSenler: string
}

export const SendForm: FC<SendForm> = ({
	dialogID,
	userID,
	msgs,
	news,
	lastSenler,
}) => {
	const [input, setInput] = useState<string>('')

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (input === '') return

		if (userID !== lastSenler) {
			updateData('messages', dialogID, {
				new: 0,
			})
		}

		updateData('messages', dialogID, {
			messages: [
				...msgs,
				{
					text: input,
					user: userID,
					time: Date.now(),
				},
			],
			new: news + 1,
			lastSenler: userID,
			lastUpd: Date.now(),
		})
		setInput('')
	}
	return (
		<form onSubmit={e => handleSubmit(e)} className={styles.inputs}>
			<input
				type='text'
				placeholder='...'
				value={input}
				onChange={e => setInput(e.target.value)}
			/>
			<input type='submit' value='>!' disabled={input === ''} />
		</form>
	)
}
