import { Link } from 'react-router-dom'
import { LazyExoticComponent, ReactNode, Suspense } from 'react'
import { cloneDeep, isObject } from 'lodash-es'

import ProcessLoading from '@/components/Loading/ProcessLoading'

import { ItemType, SubMenuType } from 'antd/lib/menu/hooks/useItems'
import { RouteConfig, Routes } from '@/routes/type'
import { AddItemArgs, DeepSeparateArgs, Items } from './type'

/**
 * @description 路由懒加载
 * @param {Element} Com 需要访问的组件
 * @returns element
 */
export const lazyLoad = (Com: LazyExoticComponent<any>): ReactNode => {
	return (
		<Suspense fallback={<ProcessLoading />}>
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

/** 添加item项 */
function addItem(args: AddItemArgs) {
	const { curPath, route } = args
	const { name, icon, children } = route

	const o: ItemType = {
		key: curPath,
		label: Array.isArray(children) ? name : <Link to={curPath}>{name}</Link>,
		...(!children?.length ? { children: [] } : {})
	}

	if (icon) {
		o.icon = icon
	}

	return o
}

/** 是否添加到topTabs */
function isTopTabs(route: RouteConfig) {
	if ('layout' in route) {
		const { layout } = route
		if (isObject(layout)) {
			if ('topRender' in layout && layout.topRender === false) {
				return false
			}
		}
	}
	// 默认添加
	return true
}

/** 是否添加到leftTabs */
function isLeftTabs(route: RouteConfig) {
	if ('layout' in route) {
		const { layout } = route
		if (isObject(layout)) {
			if ('leftRender' in layout && layout.leftRender === false) {
				return false
			}
		}
	}
	// 默认添加
	return true
}

/** 根据权限和layout信息分离路由，筛选出需要left，和top分开渲染的路由 */
function deepSeparate(args: DeepSeparateArgs) {
	const { route, leftTabs, topTabs, parentPath, routeAccess } = args
	const { name, layout, children, path, access } = route

	// 无权限
	if (access && !routeAccess[access]) return

	// 如果不存在名字 || 不需要布局
	if (!name || layout === false) return

	const curPath = `${parentPath}/${path!}`

	const o = addItem({
		route,
		curPath
	})

	const isLeft = isLeftTabs(route)
	const isTop = isTopTabs(route)
	isLeft && leftTabs?.push(cloneDeep(o))
	isTop && topTabs?.push(cloneDeep(o))

	// 找到o在数组中的索引，为接下来给数组中的o添加children
	const lastLeftItem = leftTabs?.at(-1) as SubMenuType
	const lastTopItem = topTabs?.at(-1) as SubMenuType
	const nextLeftTabs = lastLeftItem?.children
	const nextTopTabs = lastTopItem?.children

	children?.forEach(child => {
		const args: DeepSeparateArgs = {
			route: child,
			parentPath: curPath,
			routeAccess,
			...(isLeft ? { leftTabs: nextLeftTabs } : {}),
			...(isTop ? { topTabs: nextTopTabs } : {})
		}
		deepSeparate(args)
	})
}

/** 获取菜单配置项 */
export function getMenuItems(
	layoutRoutes: Routes,
	routeAccess: Record<string, boolean>,
	parentPath?: string
) {
	// 找到layout需要使用的路由配置
	const leftTabs: Items = []
	const topTabs: Items = []
	layoutRoutes.forEach(route => {
		deepSeparate({
			route,
			leftTabs,
			topTabs,
			parentPath: parentPath || '',
			routeAccess
		})
	})

	return {
		leftTabs,
		topTabs
	}
}
