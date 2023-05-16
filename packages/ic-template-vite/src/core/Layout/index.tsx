import { useLocation, useRoutes, RouteObject } from 'react-router-dom'
import routes from '@/routes'
import { FC } from 'react'

const Layout: FC<any> = () => {
	const location = useLocation()
	const layoutRoutes = routes.find(item => item.path === '/*')?.children || []
	const ele = useRoutes(layoutRoutes as RouteObject[], location)

	return (
		<div>
			基本布局样式
			{ele}
		</div>
	)
}

export default Layout
