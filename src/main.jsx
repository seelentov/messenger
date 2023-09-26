import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import './store/api/firebase/firebase.api'

import { Provider } from 'react-redux'
import { App } from './components/App'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)

reportWebVitals()
