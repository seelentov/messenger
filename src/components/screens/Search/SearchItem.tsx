import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Search.module.scss'

interface SearchItem {
	id: string
	img: string
	name: string
}

export const SearchItem: FC<SearchItem> = ({ id, img, name }) => {
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
