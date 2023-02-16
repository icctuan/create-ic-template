// 路由信息
import { createContext, useContext } from 'react'

import { ItemType } from 'antd/lib/menu/hooks/useItems'

export type Items = ItemType[]

export type RouteConfigContext = {
	leftTabs: Items
	topTabs: Items
}

const routesContext = createContext<RouteConfigContext>({
	leftTabs: [],
	topTabs: []
})

export const { Provider } = routesContext

export function useRouteConfig() {
	return useContext(routesContext)
}
