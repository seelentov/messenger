/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useThisStore } from '../../../hooks/useThisStore'
import styles from './Header.module.scss'

import { subscribeColl } from '../../../store/api/firebase/firebase.endpoints'

export const Header = () => {
	const [state, setState] = useState(null)
	const [messages, setMessages] = useState(null)

	const { id } = useThisStore('user')

	useEffect(() => {
		const unsub = subscribeColl('messages', doc => {
			setMessages(doc)
		})
		return () => {
			unsub
		}
	}, [])

	const notification = messages => {
		return (
			messages
				.filter(e => e.users.includes(id))
				.filter(e => e.new > 0)
				.filter(e => e.lastSenler !== id).length > 0
		)
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
					{messages && notification(messages) && (
						<span
							className={styles.newMsg}
							style={{ translate: '19px -13px' }}
						></span>
					)}
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
						{messages && notification(messages) && (
							<span
								className={styles.newMsg}
								style={{ translate: ' 93px -17px' }}
							></span>
						)}
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
