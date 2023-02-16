// 全局context
import { createContext, useContext } from 'react'

export type GlobalContext = {
	globalState: InitialStateType
	dispatch: (state: InitialStateType) => void
}

/** 初始化状态值 类型 */
export type InitialStateType = {
	userInfo?: Record<string, any>
	accessInfo?: string[]
	routeAccess?: Record<string, boolean>
	[propKey: string]: any
}

/** 初始状态 */
export const initGlobalState = { settings: {} }

const context = createContext<GlobalContext>({
	globalState: initGlobalState,
	dispatch: () => {}
})

/** 全局context */
export const { Provider } = context

export function useGlobal() {
	return useContext(context)
}
