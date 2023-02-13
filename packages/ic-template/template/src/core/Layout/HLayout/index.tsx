import { useRouteConfig } from '@/core/context/router'
import routes from '@/routes'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { useState } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import styles from './index.module.less'

const { Header, Content, Footer, Sider } = Layout

export type MenuState = {
	selectedKeys: string[]
	openKeys: string[]
}

const HLayout = () => {
	const location = useLocation()
	const { leftTabs, topTabs } = useRouteConfig()

	// 找到该路径下要渲染的dom
	const layoutRoutes = routes.find(item => item.path === '/*')?.children || []
	const ele = useRoutes(layoutRoutes, location)
	console.log(leftTabs, layoutRoutes)

	const [menuState, setMenuState] = useState<MenuState>({
		openKeys: [],
		selectedKeys: []
	})

	const onOpenChange = (openKeys: string[]) => {
		setMenuState({ ...menuState, openKeys })
	}

	return (
		<Layout style={{ height: '100vh', width: '100vw' }}>
			<Header className={styles.header}>header</Header>
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
