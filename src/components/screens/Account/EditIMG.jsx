/* eslint-disable react/prop-types */
import { useState } from 'react'

import { updateData } from '../../../store/api/firebase/firebase.endpoints'
import styles from './Account.module.scss'

export const EditIMG = ({ img, userId, editImage, setEditImage, setImg }) => {
	const [url, setUrl] = useState(img !== '' ? img : '/src/assets/no-img.jpg')

	const handleSubmit = e => {
		e.preventDefault()
		updateData('users', userId, {
			img: url,
		}).then(() => {
			setEditImage(false)
			setImg(url)
			setUrl('/src/assets/no-img.jpg')
		})
	}
	return (
		<>
			{editImage && (
				<div className={styles.editImageBg}>
					<div
						className={styles.shadow}
						onClick={() => setEditImage(false)}
					></div>
					<form
						onSubmit={e => handleSubmit(e)}
						className={styles.editImageModal}
					>
						<p onClick={() => setEditImage(false)} className={styles.close}>
							Закрыть
						</p>
						<div className={styles.inputs}>
							<input
								placeholder='https://example.com/example-img'
								type='text'
								value={url}
								onChange={e =>
									setUrl(
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
