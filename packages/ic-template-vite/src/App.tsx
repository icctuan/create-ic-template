import RouterView from './core/RouterView'
import BeforeRouter from './core/BeforeRouter'
import './assets/css/index.less'

function App() {
	return (
		<BeforeRouter>
			<RouterView />
		</BeforeRouter>
	)
}

export default App
