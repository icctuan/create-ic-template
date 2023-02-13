import { Link } from 'react-router-dom'
import { LazyExoticComponent, ReactNode, Suspense } from 'react'
import { cloneDeep, isObject } from 'lodash-es'
import { Routes } from '@/routes/type'
import ProcessLoading from '@/components/Loading/ProcessLoading'

/**
 * @description 路由懒加载
 * @param {Element} Com 需要访问的组件
 * @returns element
 */
export const lazyLoad = (Com: LazyExoticComponent<any>): ReactNode => {
	return (
		<Suspense fallback={<>aaa</>}>
			<Com />
		</Suspense>
	)
}

// /** 添加item项 */
// function addItem(args: AddItemArgs) {
// 	const { curPath, route } = args
// 	const { name, icon, children } = route

// 	const o: ItemType = {
// 		key: curPath,
// 		label: Array.isArray(children) ? name : <Link to={curPath}>{name}</Link>,
// 		children: []
// 	}

// 	if (icon) {
// 		o.icon = icon
// 	}

// 	if (!children || !children?.length) {
// 		delete o.children
// 	}

// 	return o
// }

// /** 是否添加到topTabs */
// function isPushTopTabs(route: RouteConfig) {
// 	const { layout } = route

// 	if ('layout' in route) {
// 		if (isObject(layout)) {
// 			// 不渲染左侧sider组件，肯定不加leftTabs
// 			if ('headerRender' in layout && layout.headerRender === false) {
// 				return false
// 			}

// 			// 不渲染
// 			if ('topItemRender' in layout && layout.topItemRender === false) {
// 				return false
// 			}
// 		}
// 	}
// 	return true
// }

// /** 是否添加到leftTabs */
// function isPushLeftTabs(route: RouteConfig) {
// 	const { layout } = route

// 	if ('layout' in route) {
// 		if (isObject(layout)) {
// 			// 不渲染左侧sider组件，肯定不加leftTabs
// 			if ('leftSiderRender' in layout && layout.leftSiderRender === false) {
// 				return false
// 			}

// 			// 不渲染
// 			if ('leftItemRender' in layout && layout.leftItemRender === false) {
// 				return false
// 			}
// 		}
// 	}

// 	return true
// }

// /** 分离路由，筛选出需要left，和top分开渲染的路由 */
// function deepSeparate(args: DeepSeparateArgs) {
// 	const { route, leftTabs, topTabs, parentPath, routeAccess } = args
// 	const { name, layout, children, path, access } = route

// 	// 无权限
// 	if (access && !routeAccess[access]) return

// 	// 如果不存在名字 || 不需要布局
// 	if (!name || layout === false) return

// 	const curPath = `${parentPath}/${path!}`

// 	const o = addItem({
// 		route,
// 		curPath
// 	})

// 	const isLeft = layout === 'left'

// 	isLeft ? leftTabs?.push(cloneDeep(o)) : topTabs?.push(cloneDeep(o))

// 	const lastLeftItem = leftTabs?.at(-1) as SubMenuType
// 	const lastTopItem = topTabs?.at(-1) as SubMenuType

// 	const nextleftTabs = lastLeftItem?.children
// 	const nexttopTabs = lastTopItem?.children

// 	children?.forEach(child => {
// 		const args: DeepSeparateArgs = {
// 			route: child,
// 			parentPath: curPath,
// 			leftTabs: nextleftTabs,
// 			topTabs: nexttopTabs,
// 			routeAccess
// 		}
// 		!isLeft && delete args.leftTabs
// 		!isTop && delete args.topTabs
// 		deepSeparate(args)
// 	})
// }

// /** 获取菜单配置项 */
// export function getMenuItems(
// 	layoutRoutes: Routes,
// 	routeAccess: Record<string, boolean>,
// 	parentPath?: string
// ) {
// 	// 找到layout需要使用的路由配置
// 	const leftTabs: Items = []
// 	const topTabs: Items = []
// 	layoutRoutes.forEach(route => {
// 		console.log('----', route)
// 		deepSeparate({
// 			route,
// 			leftTabs,
// 			topTabs,
// 			parentPath: parentPath || '',
// 			routeAccess
// 		})
// 	})

// 	return {
// 		leftTabs,
// 		topTabs
// 	}
// }
