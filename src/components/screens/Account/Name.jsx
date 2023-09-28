import { useEffect, useRef, useState } from 'react'
import { updateData } from './../../../store/api/firebase/firebase.endpoints'
/* eslint-disable react/prop-types */
import styles from './Account.module.scss'

export const Name = ({ name, id }) => {
	const [edit, setEdit] = useState(false)
	const [input, setInput] = useState(name)

	const nameRef = useRef()

	useEffect(() => {
		nameRef.current?.focus()
	}, [edit])

	const onBlurName = name => {
		updateData('users', id, {
			name: name,
		})
		setEdit(false)
	}

	return (
		<>
			{edit ? (
					<input
						ref={nameRef}
						value={input}
						onChange={e => setInput(e.target.value)}
						onBlur={() => onBlurName(input)}
					/>
			) : (
				<>
					<h3 className={styles.editingName} onClick={() => setEdit(!edit)}>{name}</h3>
					<p>Нажмите, что бы редактировать</p>
				</>
			)}
		</>
	)
}
