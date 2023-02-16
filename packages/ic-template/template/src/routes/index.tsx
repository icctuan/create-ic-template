import { lazy } from 'react'
import { Routes } from './type'
import { lazyLoad } from '@/core/Router/utils'

const routes: Routes = [
	{
		path: '/*',
		element: lazyLoad(lazy(() => import('@/core/Layout/HLayout'))),
		children: [
			{
				path: 'home',
				name: '主页',
				element: lazyLoad(lazy(() => import('@/pages/Home')))
			},
			{
				path: 'hasChildren',
				name: '测试',
				children: [
					{
						path: 'children1',
						name: 'children1',
						element: lazyLoad(
							lazy(() => import('@/pages/hasChildren/children1'))
						)
					},
					{
						path: 'children2',
						name: 'children2',
						element: lazyLoad(
							lazy(() => import('@/pages/hasChildren/children2'))
						)
					}
				]
			},
			{
				path: 'access',
				name: '权限',
				access: 'new',
				element: lazyLoad(lazy(() => import('@/pages/Home')))
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
