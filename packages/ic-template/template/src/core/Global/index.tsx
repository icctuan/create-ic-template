import { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import { InitialStateType, Provider, initGlobalState } from '../context/global'

export interface GlobalProviderProps {
	children: ReactNode
}

// 项目初始化配置，这里可以异步去判断用户是否登录拿到用户信息，未登录则跳转登录链接
const getInitialState = async (): Promise<InitialStateType> => {
	const values: InitialStateType = {
		settings: {}, // 默认布局信息设置
		userInfo: {}, // 用户信息，接口获取
		accessInfo: [] // 权限信息
	}

	return values
}

// 处理权限为{url(string): boolean}的类型返回
const accessFactory = (
	initialState: InitialStateType
): Record<string, boolean> => {
	return {
		canNav1: false
	}
}

/** 全局context */
const GlobalProvider: FC<GlobalProviderProps> = props => {
	const { children } = props
	const [globalState, setGlobalState] =
		useState<InitialStateType>(initGlobalState)

	useEffect(() => {
		getInitialState().then(values => {
			// 获取路由权限，主要是处理权限信息，或者用户信息
			const routeAccess = accessFactory(values)
			// 设置共享全局状态
			setGlobalState({ ...values, routeAccess })
		})
	}, [])

	const globalValue = useMemo(
		() => ({
			globalState,
			dispatch: setGlobalState
		}),
		[globalState]
	)

	return <Provider value={globalValue}>{children}</Provider>
}

export default GlobalProvider
