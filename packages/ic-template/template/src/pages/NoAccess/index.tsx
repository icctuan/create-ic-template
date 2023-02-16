// 无权限跳转页面
import { Button } from 'antd'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.less'

const NoAccess: FC<any> = () => {
	const navigate = useNavigate()
	return (
		<div className={styles.wrapper}>
			<div className={styles.warn}>
				<p>403 No Access</p>
				<Button onClick={() => navigate('/')}>Back To HomePage</Button>
			</div>
		</div>
	)
}

export default NoAccess
