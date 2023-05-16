// 无权限跳转页面
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.less'

const NoAccess: FC<any> = () => {
	const navigate = useNavigate()
	return (
		<div className={styles.wrapper}>
			<div className={styles.warn}>
				<p>403 No Access</p>
				<button onClick={() => navigate('/')}>Back To HomePage</button>
			</div>
		</div>
	)
}

export default NoAccess
