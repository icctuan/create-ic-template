import { FC } from 'react'

import RouterView from './core/Router/RouterView'
import GlobalProvider from './core/Global'
import BeforeRouter from './core/Router/BeforeRouter'

import '@/assets/style/index.css'

const App: FC<any> = () => {
	return (
		<GlobalProvider>
			<BeforeRouter>
				<RouterView />
			</BeforeRouter>
		</GlobalProvider>
	)
}

export default App
