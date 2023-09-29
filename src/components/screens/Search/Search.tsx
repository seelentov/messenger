import { useEffect, useState } from 'react'
import { useThisStore } from '../../../hooks/useThisStore'
import { getAllData } from '../../../store/api/firebase/firebase.endpoints'
import { LoadingMin } from '../../ui/Loading/LoadingMin'
import styles from './Search.module.scss'
import { SearchItem } from './SearchItem'

export const Search = () => {
	const { name } = useThisStore('user')
	const [filter, setFilter] = useState<string>('')
	const [loading, setLoading] = useState<boolean>()
	const [data, setData] = useState<AllUsers>()

	useEffect(() => {
		setLoading(true)
		getAllData('users', (data: AllUsers) => {
			setData(data)
			setLoading(false)
		})
	}, [])

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
				{loading && <LoadingMin />}
				{!loading &&
					data &&
					data
						.filter(user => user.name !== name)
						.filter(user => {
							if (filter === '') return user
							return user.name
								.toLowerCase()
								.trim()
								.includes(filter.toLowerCase().trim())
						})
						.map(user => (
							<SearchItem
								key={user.id}
								id={user.id}
								img={user.img}
								name={user.name}
							/>
						))}
			</div>
		</>
	)
}
