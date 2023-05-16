// 根据routes渲染路由视图
import { FC, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import routes from '@/routes'

/** 根据routes渲染路由视图 */
const RouterView: FC<any> = () => {
	// const [routeState, setRouteState] = useState({})

	// // 权限
	// const {
	// 	globalState: { routeAccess }
	// } = useGlobal()

	// useEffect(() => {
	// 	if (!routes.length) {
	// 		return
	// 	}

	// 	const layoutRoutes =
	// 		routes.find(route => route.path === '/*' || route.path === '/')?.children || []

	// 	// 获取菜单需要显示的items
	// 	const o = getMenuItems(layoutRoutes, routeAccess || {})
	// 	setRouteState(o)
	// }, [routes, routeAccess])

	return (
		// <Provider value={routeState}>
		<Routes>
			{routes.map(route => (
				<Route key={route.path} path={route.path} element={route.element} />
			))}
		</Routes>
		// </Provider>
	)
}

export default RouterView
