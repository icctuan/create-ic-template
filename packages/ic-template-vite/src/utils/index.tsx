import { RouteConfig, Routes } from '@/routes/type'
import { LazyExoticComponent, ReactNode, Suspense } from 'react'

/**
 * @description 路由懒加载
 * @param {Element} Com 需要访问的组件
 * @returns element
 */
export const lazyLoad = (Com: LazyExoticComponent<any>): ReactNode => {
	return (
		<Suspense fallback={<>give a loading</>}>
			<Com />
		</Suspense>
	)
}

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns RouteConfig
 */
export const searchRoute = (path: string, routes: Routes): RouteConfig => {
	const lastStr = path.split('/').at(-1)
	const _deep = (routes: Routes) => {
		let result: RouteConfig = {}
		for (let i = 0; i < routes.length; i++) {
			const item = routes[i]
			if (item.path === lastStr || item.path === `/${lastStr}`) return item
			if (item.children?.length) {
				const res = _deep(item.children)
				if (Object.keys(res).length) result = res
			}
		}
		return result
	}
	return _deep(routes)
}
