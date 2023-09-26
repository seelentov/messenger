/* eslint-disable react/prop-types */
import { useState } from 'react'
import { updateData } from '../../../store/api/firebase/firebase.endpoints'
import styles from './Dialog.module.scss'

export const SendForm = ({ dialogID, userID, msgs }) => {
	const [input, setInput] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		if (input === '') return
    
		updateData('messages', dialogID, {
			messages: [
				...msgs,
				{
					text: input,
					user: userID,
					time: Date.now(),
				},
			],
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
