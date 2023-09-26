
/* eslint-disable react/prop-types */
export const Wrapper = ({ children }) => {
	return (
		<div
			style={{
				width: '100%',
				height: '100vh',
				marginTop: '64px',
        paddingTop: '20px'
			}}
		>
			{children}
		</div>
	)
}
