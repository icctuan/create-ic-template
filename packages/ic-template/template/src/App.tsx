import { FC } from 'react'
import RouterView from './core/Router/RouterView'
import GlobalProvider from './core/Global'

import '@/assets/style/index.css'

const App: FC<any> = () => {
	return (
		<GlobalProvider>
			<RouterView />
		</GlobalProvider>
	)
}

export default App
