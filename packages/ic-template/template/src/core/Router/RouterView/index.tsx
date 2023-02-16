// 根据routes渲染路由视图
import { FC, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import routes from '@/routes'
import { Provider } from '@/core/context/router'
import { useGlobal } from '@/core/context/global'
import { getMenuItems } from '../utils'
import { Items } from '../type'

export type RouteContainerProps = {
	// routes: Routes
	// routeAccess: Record<string, boolean>
}

const initState = {
	leftTabs: [] as Items,
	topTabs: [] as Items
}

/** 根据routes渲染路由视图 */
const RouterView: FC<RouteContainerProps> = () => {
	const [routeState, setRouteState] = useState(initState)

	// 权限
	const {
		globalState: { routeAccess }
	} = useGlobal()

	useEffect(() => {
		if (!routes.length) {
			return
		}

		const layoutRoutes =
			routes.find(route => route.path === '/*' || route.path === '/')
				?.children || []

		// 获取菜单需要显示的items
		const o = getMenuItems(layoutRoutes, routeAccess || {})
		setRouteState(o)
	}, [routes, routeAccess])

	return (
		<Provider value={routeState}>
			<Routes>
				{routes.map(route => (
					<Route key={route.path} path={route.path} element={route.element} />
				))}
			</Routes>
		</Provider>
	)
}

export default RouterView
