import { RouteConfig } from '@/routes/type'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

/** <Menu>菜单items */
export type Items = ItemType[]

export type AddItemArgs = {
	/** 当前页面完整路径 父路由+path */
	curPath: string
	/** 当前路由对象 */
	route: RouteConfig
}

export type DeepSeparateArgs = {
	/** 当前路由对象信息 */
	route: RouteConfig
	/** 左侧菜单<Menu>items数据 */
	leftTabs?: Items
	/** 右侧菜单<Menu>items数据 */
	topTabs?: Items
	/** 父路由 */
	parentPath: string
	/** 路由权限config */
	routeAccess: Record<string, boolean>
}
