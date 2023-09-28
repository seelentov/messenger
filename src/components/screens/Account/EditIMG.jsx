/* eslint-disable react/prop-types */
import { useState } from 'react'
import { updateData } from '../../../store/api/firebase/firebase.endpoints'
import styles from './Account.module.scss'

export const EditIMG = ({ userId }) => {
	const [input, setInput] = useState('/src/assets/no-img.jpg')

	const [edit, setEdit] = useState(false)
	const handleSubmit = e => {
		e.preventDefault()
		updateData('users', userId, {
			img: input,
		}).then(() => {
			setEdit(false)
		})
	}
	return (
		<>
			<img
				className={styles.editImage}
				src='/src/assets/edit.svg'
				onClick={() => setEdit(true)}
			/>
			{edit && (
				<div className={styles.editImageBg}>
					<div className={styles.shadow} onClick={() => setEdit(false)}></div>
					<form
						onSubmit={e => handleSubmit(e)}
						className={styles.editImageModal}
					>
						<p onClick={() => setEdit(false)} className={styles.close}>
							Закрыть
						</p>
						<div className={styles.inputs}>
							<input
								placeholder='https://example.com/example-img'
								type='text'
								value={input}
								onChange={e =>
									setInput(
										e.target.value !== ''
											? e.target.value
											: '/src/assets/no-img.jpg'
									)
								}
							/>
							<input type='submit' value='Загрузить' />
						</div>
						<p>Вставьте URL картинки сюда</p>
					</form>
				</div>
			)}
		</>
	)
}
