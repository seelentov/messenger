import { FC, LegacyRef, useEffect, useRef, useState } from 'react'
import { updateData } from '../../../store/api/firebase/firebase.endpoints'
import styles from './Account.module.scss'

interface Name {
	id: string
	name: string
}

export const Name: FC<Name> = ({ name, id }) => {
	const [edit, setEdit] = useState(false)
	const [input, setInput] = useState(name)

	const nameRef: LegacyRef<HTMLInputElement> = useRef<HTMLInputElement>(null)
	useEffect(() => {}, [edit])

	const onBlurName = (name: string) => {
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
					<h3 className={styles.editingName} onClick={() => setEdit(!edit)}>
						{name}
					</h3>
					<p>Нажмите, чтобы редактировать</p>
				</>
			)}
		</>
	)
}
