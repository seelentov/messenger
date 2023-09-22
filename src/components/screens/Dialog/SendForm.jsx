/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import styles from './Dialog.module.scss'
import { useGetThisDialogQuery, useIncNewMutation, usePushMsgMutation } from '../../../store/api/messages.api'

export const SendForm = ({ dialogID, userID}) => {
	const [input, setInput] = useState('')
  const [pushMSG] = usePushMsgMutation()
  const [incNew] = useIncNewMutation()
  const [newMsg, setNM] = useState('')
  const [mgs, setMgs] = useState('')

  const {isLoading, data} = useGetThisDialogQuery(dialogID)

  useEffect(()=>{
    if(!isLoading && data){
      setNM(data.new)
      setMgs(data.messages)
    }
  }, [isLoading, data])


  const handleSubmit = (e) => {
    e.preventDefault()
    if(input === '') return
    pushMSG({id: dialogID, msg: [...mgs, [Date.now(), userID, input]], time: Date.now(), last: userID})
    .then(()=>{
      setInput('')
      incNew({id: dialogID, count: Number(newMsg) + 1})
      setNM(0)
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
			<input type='submit' value='>!' disabled={input === ''}/>
		</form>
	)
}
