
/* eslint-disable react/prop-types */
export const Wrapper = ({ children }) => {
	return (
		<div
			style={{
				width: '100%',
				height: '100vh',
				marginTop: '45px',
        padding: '40px 0 0 0'
			}}
		>
			{children}
		</div>
	)
}
