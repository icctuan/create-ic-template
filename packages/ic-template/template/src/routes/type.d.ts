import { RouteObject } from 'react-router'

export type Merge<
	T,
	U,
	X = Pick<U, Exclude<keyof U, keyof T & keyof U>>
> = Pick<T & X, keyof T | keyof X>

interface RouteExtension {
	/* 路由显示icon */
	icon?: ReactNode
	/* 在菜单中显示的名称,如果没有name则不在菜单中显示 */
	name?: string
	/* 权限相关值 */
	access?: string
	/* 是否要开启keep-alive, 默认是false */
	keepAlive?: boolean
	/* layout布局相关，默认true则左侧和头部菜单都渲染，false都不渲染 */
	layout?:
		| boolean
		| {
				/* 是否渲染到左边的菜单项目中，false不渲染，true | undefined渲染 */
				leftRender?: boolean
				/* 是否渲染到头部的菜单项目中，同上 */
				topRender?: boolean
		  }
	/* 扩展的children */
	children?: RouteConfig[]
}

export type RouteConfig = Merge<RouteExtension, RouteObject>

export type Routes = RouteConfig[]
