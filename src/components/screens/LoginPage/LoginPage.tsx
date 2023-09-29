import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './Login.module.scss'

import 'swiper/css'
import { Login } from './Login'
import { SignUp } from './SignUp'

export const LoginPage = () => {
	return (
		<>
			<p className={styles.logo}>MESSENGER</p>
			<div className={styles.page}>
				<Swiper spaceBetween={0} slidesPerView={1}>
					<SwiperSlide>
						<Login />
					</SwiperSlide>
					<SwiperSlide>
						<SignUp />
					</SwiperSlide>
				</Swiper>
			</div>
		</>
	)
}
