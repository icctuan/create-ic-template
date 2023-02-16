// 水平布局
import { FC, useEffect, useState } from 'react'
import { useLocation, useRoutes, RouteObject } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import TopHeader from './TopHeader'

import { useRouteConfig } from '@/core/context/router'
import routes from '@/routes'

import styles from './index.module.less'

const { Header, Content, Sider } = Layout

export type MenuState = {
	selectedKeys: string[]
	openKeys: string[]
}

// 获取openKeys，设置展开菜单激活项
function getOpenKeys(location: ReturnType<typeof useLocation>) {
	const { pathname } = location
	const pathList = pathname?.split('/') || []
	const keys = []
	while (pathList.pop()) {
		const prePath = pathList.join('/')
		prePath && keys.push(prePath)
	}
	return keys
}

const HLayout: FC<any> = () => {
	const location = useLocation()
	const { leftTabs, topTabs } = useRouteConfig()

	// 找到该路径下要渲染的dom
	const layoutRoutes = routes.find(item => item.path === '/*')?.children || []
	const ele = useRoutes(layoutRoutes as RouteObject[], location)

	const [menuState, setMenuState] = useState<MenuState>({
		openKeys: [],
		selectedKeys: []
	})

	const onOpenChange = (openKeys: string[]) => {
		setMenuState({ ...menuState, openKeys })
	}

	// 路由变化（刷新）时保持菜单激活项
	useEffect(() => {
		setMenuState(prev => {
			const next = {
				openKeys: [...prev.openKeys, ...getOpenKeys(location)],
				selectedKeys: [location.pathname]
			}
			return next
		})
	}, [location.pathname])

	return (
		<Layout style={{ height: '100vh', width: '100vw' }}>
			<Header className={styles.header}>
				<TopHeader
					items={topTabs}
					menuState={menuState}
					onMenuStateChange={setMenuState}
				/>
			</Header>
			<Layout>
				<Sider className={styles.sider}>
					<Menu
						mode="inline"
						items={leftTabs}
						selectedKeys={menuState.selectedKeys}
						openKeys={menuState.openKeys}
						onOpenChange={onOpenChange}
					/>
				</Sider>
				<Content className={styles.content}>{ele}</Content>
			</Layout>
		</Layout>
	)
}

export default HLayout
