import { lazy } from 'react'
import { lazyLoad } from '@/utils'

const routes = [
	{
		path: '/*',
		element: lazyLoad(lazy(() => import('@/core/Layout'))),
		children: [
			{
				path: 'home',
				name: '主页',
				element: lazyLoad(lazy(() => import('@/pages/Dashboard')))
			}
		]
	},
	{
		path: '/404',
		element: lazyLoad(lazy(() => import('@/pages/NotFound')))
	},
	{
		path: '/403',
		element: lazyLoad(lazy(() => import('@/pages/NoAccess')))
	}
]

export default routes
