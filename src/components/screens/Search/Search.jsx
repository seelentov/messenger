import { useState } from 'react'
import styles from './Search.module.scss'
import { SearchItem } from './SearchItem'
import { useThisStore } from '../../../hooks/useThisStore'
import { LoadingMin } from '../../ui/Loading/LoadingMin'
import { useEffect } from 'react'
import { getAllData } from '../../../store/api/firebase/firebase.endpoints'

export const Search = () => {
	const { name } = useThisStore('user')
	const [filter, setFilter] = useState('')
	const [loading, setLoading] = useState('')
	const [data, setData] = useState('')


  useEffect(() => {
		setLoading(true)
		getAllData('users',  data => {
			setData(data)
			setLoading(false)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
