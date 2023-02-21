// axios配置
import qs from 'qs'

function createAxios(opt?: Partial<CreateAxiosOptions>) {
	return new AxiosPro(
		deepMerge(
			{
				// See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
				// authentication schemes，e.g: Bearer
				// authenticationScheme: 'Bearer',
				authenticationScheme: '',
				timeout: 30 * 1000,
				headers: { 'Content-Type': ContentTypeEnum.JSON },
				// 如果是form-data格式
				// headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
				// 数据处理方式
				transform,

				// 配置项，下面的选项都可以在独立的接口请求中覆盖
				requestOptions: {
					// 默认将prefix 添加到url
					joinPrefix: true,
					// 是否返回原生响应头 比如：需要获取响应头时使用该属性
					isReturnNativeResponse: false,
					// 需要对返回数据进行处理
					isTransformResponse: true,
					// post请求的时候添加参数到url
					joinParamsToUrl: false,
					// 格式化提交参数时间
					formatDate: true,
					// 消息提示类型
					errorMessageMode: 'message',
					// 接口地址
					apiUrl: '',
					// 接口拼接地址
					urlPrefix: '',
					//  是否加入时间戳
					joinTime: true,
					// 忽略重复请求
					ignoreCancelToken: true,
					// 是否携带token
					withToken: true
				},
				paramsSerializer: (params: any) =>
					qs.stringify(params, { indices: false })
			},
			opt || {}
		)
	)
}

export const DEFAULT_CONFIG = {
	withCredentials: true,
	requestOptions: {
		urlPrefix: import.meta.env.VITE_PREFIX_URL
	},
	headers: {
		'n-token': '342bdbf6864146f59730fbd6eace18f9'
	}
}

// 示例请求实例
export const request = createAxios(DEFAULT_CONFIG)
