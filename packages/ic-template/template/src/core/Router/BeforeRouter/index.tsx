// 路由守卫组件
import { Navigate, useLocation } from 'react-router-dom'
import routes from '@/routes'
import { searchRoute } from '../utils'
import { useGlobal } from '@/core/context/global'
import { isEmpty } from 'lodash-es'

export interface BeforeRouterProps {
	children: JSX.Element
}

/** 路由守卫组件 */
const BeforeRouter = (props: BeforeRouterProps) => {
	const { children } = props
	const { pathname } = useLocation()
	const {
		globalState: { routeAccess }
	} = useGlobal()

	const route = searchRoute(pathname, routes)
	const { access } = route

	// 重定向到首页
	if (pathname === '/') {
		return <Navigate to="/home" replace />
	}

	// 空页面
	if (isEmpty(route)) {
		return <Navigate to="/404" replace />
	}

	// 判断是否有权限
	if (access && !routeAccess?.[access]) {
		return <Navigate to="/403" replace />
	}

	// 正常访问页面
	return children
}

export default BeforeRouter
