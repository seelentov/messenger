import { useState } from 'react'
import { useGetTaskQuery } from '../../../store/api/user.api'
import styles from './Search.module.scss'
import { SearchItem } from './SearchItem'
import { useThisStore } from '../../../hooks/useThisStore'
import { LoadingMin } from '../../ui/Loading/LoadingMin'

export const Search = () => {
	const { name } = useThisStore('user')
	const { isLoading, data } = useGetTaskQuery()
	const [filter, setFilter] = useState('')

	return (
		<>
			<input
				className={styles.filter}
				type='text'
				placeholder='Поиск по имени...'
				value={filter}
				onChange={e => setFilter(e.target.value)}
			/>
			<div className={styles.search}>
				{isLoading && <LoadingMin />}
				{!isLoading &&
					data &&
					data
						.filter(user => user.name !== name)
						.filter(user => {
							if (filter === '') return user
							return user.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
						})
						.map(({ id, img, birth, name }) => (
							<SearchItem
								key={id}
								id={id}
								img={img}
								birth={birth}
								name={name}
							/>
						))}
			</div>
		</>
	)
}
