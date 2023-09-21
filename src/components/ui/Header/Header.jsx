import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useThisStore } from '../../../hooks/useThisStore'
import styles from './Header.module.scss'

export const Header = () => {
	const [state, setState] = useState(null)

	const { id } = useThisStore('user')
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
				<Link to='/messages'>
					<button className={styles.links} onClick={() => handleClick()}>
						Messages
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
