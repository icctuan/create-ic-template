import { LazyExoticComponent, ReactNode, Suspense, lazy } from 'react'
// import { Navigate, RouteObject } from 'react-router-dom'
import ProcessLoading from '@/components/Loading/ProcessLoading'
import { Routes } from './type'
import { lazyLoad } from '@/core/Router/utils'

const routes: Routes = [
	{
		path: '/*',
		element: lazyLoad(lazy(() => import('@/core/Layout/HLayout'))),
		children: [
			{
				path: 'home',
				element: lazyLoad(lazy(() => import('@/pages/Home')))
			}
		]
	},
	{
		path: '/403',
		element: lazyLoad(lazy(() => import('@/pages/NotAccess')))
	},
	{
		path: '*',
		element: lazyLoad(lazy(() => import('@/pages/NotFound')))
	}
]

export default routes
