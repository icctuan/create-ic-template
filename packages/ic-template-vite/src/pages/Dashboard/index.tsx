import Animation from '@/components/Animation'
import { useState } from 'react'

function Dashboard() {
	const [count, setCount] = useState(0)

	return (
		<div>
			<Animation />

			<h1>Vite + React</h1>
		</div>
	)
}

export default Dashboard
