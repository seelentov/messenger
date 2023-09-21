/* eslint-disable react/prop-types */
import { useState } from 'react'
import styles from './Dialog.module.scss'
import { usePushMsgMutation } from '../../../store/api/messages.api'

export const SendForm = ({ dialogID, userID, msgs}) => {
	const [input, setInput] = useState('')
  const [pushMSG] = usePushMsgMutation()
  const handleSubmit = (e) => {
    e.preventDefault()
    pushMSG({id: dialogID, msg: [...msgs, [Date.now(), userID, input]]})
    .then(()=>{
      setInput('')
    })
  }
	return (
		<form onSubmit={(e)=> handleSubmit(e)} className={styles.inputs}>
			<input
				type='text'
				placeholder='...'
				value={input}
				onChange={e => setInput(e.target.value)}
			/>
			<input type='submit' value='>!' />
		</form>
	)
}
