// 无权限跳转页面
import { Button } from 'antd'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const NoAccess: FC<any> = () => {
	const navigate = useNavigate()
	return (
		<div>
			no access
			<Button onClick={() => navigate('/')}>Back To 首页</Button>
		</div>
	)
}

export default NoAccess
