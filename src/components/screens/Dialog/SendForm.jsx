/* eslint-disable react/prop-types */
import { useState } from 'react'
import { updateData } from '../../../store/api/firebase/firebase.endpoints'
import styles from './Dialog.module.scss'

export const SendForm = ({ dialogID, userID, msgs, news, lastSenler }) => {
	const [input, setInput] = useState('')

	const handleSubmit = e => {
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
      new: Number(news) + 1,
      lastSenler: userID,
      lastUpd: Date.now()
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
