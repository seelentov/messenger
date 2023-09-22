import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useThisStore } from '../../../hooks/useThisStore'
import { useGetDialogQuery } from '../../../store/api/messages.api'
import styles from './Header.module.scss'

export const Header = () => {
	const [state, setState] = useState(null)

	const { id } = useThisStore('user')

	const { isLoading, data } = useGetDialogQuery()

	const notification = data => {
		return data.filter(e => e.users.includes(id)).filter(e => e.new > 0)
    .filter(e => e.lastSenler !== id).length > 0
	}

	const handleClick = () => {
		setState(state === 'open' ? 'close' : 'open')
	}

	return (
		<header className={styles.header}>
			<div className={styles.nav}>
				<button
					className={
						styles.Bars +
						' ' +
						(state === 'open' ? styles.closeBars : styles.openBars)
					}
					onClick={() => handleClick()}
				>
					<div></div>
					<div></div>
					<div></div>
          {!isLoading && data && notification(data)  && <span className={styles.newMsg} style={{translate: '19px -13px'}}></span>}
				</button>
				<p className={styles.logo}>MESSENGER</p>
			</div>

			<div
				className={
					styles.menu +
					' ' +
					`${
						state === 'open'
							? styles.menuOpen
							: state === 'close'
							? styles.menuClose
							: ''
					}`
				}
			>
				<Link to='/'>
					<button className={styles.links} onClick={() => handleClick()}>
						Messages{' '}
						{!isLoading && data && notification(data)  && <span className={styles.newMsg} style={{translate: ' 93px -17px'}}></span>}
					</button>
				</Link>
				<Link to={`/${id}`}>
					<button className={styles.links} onClick={() => handleClick()}>
						Account
					</button>
				</Link>
				<Link to='/search'>
					<button className={styles.links} onClick={() => handleClick()}>
						Search
					</button>
				</Link>
			</div>
			<div
				onClick={() => handleClick()}
				className={
					styles.wrapper + ' ' + (state === 'open' && styles.wrapperOpen)
				}
			></div>
		</header>
	)
}
