import { Link } from 'react-router-dom'
import { LazyExoticComponent, ReactNode, Suspense } from 'react'
import { cloneDeep, isObject } from 'lodash-es'
import { Routes } from '@/routes/type'
import ProcessLoading from '@/components/Loading/ProcessLoading'
type ItemType = {
	key: string
	label: ReactNode
	children?: any[]
	icon?: string
}

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

/** 添加item项 */
function addItem(args: AddItemArgs) {
	const { curPath, route } = args
	const { name, icon, children } = route

	const o: ItemType = {
		key: curPath,
		label: Array.isArray(children) ? name : <Link to={curPath}>{name}</Link>,
		children: []
	}

	if (icon) {
		o.icon = icon
	}

	if (!children || !children?.length) {
		delete o.children
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

/** 分离路由，筛选出需要left，和top分开渲染的路由 */
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
