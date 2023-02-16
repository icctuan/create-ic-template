// 无匹配路由
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

import styles from './index.module.less'

const NotFound: FC<any> = () => {
	const navigate = useNavigate()
	return (
		<div className={styles.wrapper}>
			<div className={styles.warn}>
				<p>404 Not Found</p>
				<Button onClick={() => navigate('/')}>Back To HomePage</Button>
			</div>
		</div>
	)
}

export default NotFound
