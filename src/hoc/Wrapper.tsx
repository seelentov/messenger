import { FC } from 'react'

export const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div
			style={{
				width: '100%',
				height: '100vh',
				marginTop: '64px',
				paddingTop: '20px',
			}}
		>
			{children}
		</div>
	)
}
