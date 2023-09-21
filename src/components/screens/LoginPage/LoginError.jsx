/* eslint-disable react/prop-types */
import styles from './Login.module.scss'

export const LoginError = ({ errors }) => {
	return <div className={styles.error + ' ' + (errors.length !== 0 && styles.errorActive)}>
    {
      errors && errors.map((error, key) => <p key={key}>{error}</p>)
    }
  </div>
}
