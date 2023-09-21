import { Link } from 'react-router-dom'
import style from './PageNotFound.module.scss'
export const PageNotFound = () => {
	return (
		<section className={style.error}>
			<p>404</p>
			<p>Page Not Found</p>
			<Link to='/'>
				<button>Home</button>
			</Link>
		</section>
	)
}
