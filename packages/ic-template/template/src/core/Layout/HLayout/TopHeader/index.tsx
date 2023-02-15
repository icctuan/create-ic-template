import { Menu } from 'antd'
import { FC } from 'react'

import { MenuState } from '..'

import styles from './index.module.less'

type TopHeaderProps = {
	menuState: Record<string, any>
	items: any
	onMenuStateChange: (args: MenuState) => void
}
const TopHeader: FC<TopHeaderProps> = props => {
	const { items, menuState, onMenuStateChange } = props

	function onSelect(options: any) {
		const { keyPath } = options
		onMenuStateChange({ ...menuState, selectedKeys: keyPath } as MenuState)
	}

	return (
		<div className={styles.topHeader}>
			<div>logo</div>
			<Menu
				mode="horizontal"
				items={items}
				selectedKeys={menuState.selectedKeys}
				onSelect={onSelect}
			/>
		</div>
	)
}

export default TopHeader
