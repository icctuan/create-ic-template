// 常用方法

/** 判断数据类型 */
export function is(val: unknown, type: string) {
	return toString.call(val) === `[object ${type}]`
}

/** 判断是否对象 */
export function isObject(val: any): val is Record<any, any> {
	return val !== null && is(val, 'Object')
}

/** 深度遍历合并 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
	let key: string
	for (key in target) {
		src[key] = isObject(src[key])
			? deepMerge(src[key], target[key])
			: (src[key] = target[key])
	}
	return src
}
