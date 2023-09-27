import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { IsAuth } from '../context/isAuth'
import { LoginPage } from './screens/LoginPage/LoginPage'
import { Messages } from './screens/Messages/Messages'
import { PageNotFound } from './screens/PageNotFound/PageNotFound'
import { Header } from './ui/Header/Header'
import { Wrapper } from '../hoc/Wrapper'
import { Account } from './screens/Account/Account'
import { Search } from './screens/Search/Search'
import { Dialog } from './screens/Dialog/Dialog'

export const App = () => {
  
	return (
		<>
			<BrowserRouter>
				<IsAuth>
        <Header />
					<Wrapper>
						<Routes>
              <Route path='/search' element={<Search />} />
              <Route path='/' element={<Messages />} />
							<Route path='/login' element={<LoginPage />} />
              <Route path='/:id' element={<Account />} />
							<Route path='*' element={<PageNotFound />} />
              <Route path='/dialog/:id' element={<Dialog />} />
						</Routes>
					</Wrapper>
				</IsAuth>
			</BrowserRouter>
		</>
	)
}


/*				

*/