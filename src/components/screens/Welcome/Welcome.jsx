/* eslint-disable react/prop-types */

import styles from './Welcome.module.scss'
export const Welcome = ({next, state}) => {

	return (
		<div
			className={
				styles.welcome +
				' ' +
				(state === 'open' ? styles.open : state === 'close' ? styles.close : '')
			}
		>
			<div className={styles.text}>
				<h1>Добро пожаловать в <span>MESSENGER.</span></h1>
				<p>
					{' '}
					Это сеть для обмена сообщениями между вами и вашими друзьями,
					знакомыми, а может и незнакомыми, тут выбор за вами
				</p>
			</div>
			<div className={styles.image}>
				<img src='src/assets/welcome-1.jpg' />
				<div className={styles.imageShadow}></div>
			</div>

			<button onClick={() => next()}>
				<svg
					width='24'
					height='24'
					xmlns='http://www.w3.org/2000/svg'
					fillRule='evenodd'
					clipRule='evenodd'
					fill='#242424'
					stroke='#242424'
				>
					<path d='M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z' />
				</svg>
			</button>
		</div>
	)
}
