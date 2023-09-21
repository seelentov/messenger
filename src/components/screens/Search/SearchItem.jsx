/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import styles from './Search.module.scss'
export const SearchItem = ({ id, img, name }) => {
	return (
		<div className={styles.searchItem}>
			<div className={styles.searchItemImg}>
				<Link to={`/${id}`}>
					<img src={img !== '' ? img : '/src/assets/no-img.jpg'} />
				</Link>
			</div>
			<div className={styles.searchItemInfo}>
				<p>{name}</p>
			</div>
			<Link to={`/dialog/${id}`}>
						<button>
							<img src='/src/assets/message.svg' />
						</button>
					</Link>
		</div>
	)
}
