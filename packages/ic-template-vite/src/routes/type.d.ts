import { RouteObject } from 'react-router'

export type Merge<T, U, X = Pick<U, Exclude<keyof U, keyof T & keyof U>>> = Pick<
	T & X,
	keyof T | keyof X
>

interface RouteExtension {
	/* 路由显示icon */
	icon?: ReactNode
	/* 在菜单中显示的名称,如果没有name则不在菜单中显示 */
	name?: string
	/* 权限相关值 */
	access?: string
	/* 扩展的children */
	children?: RouteConfig[]
}

export type RouteConfig = Merge<RouteExtension, RouteObject>

export type Routes = RouteConfig[]
