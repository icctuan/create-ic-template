const { merge } = require('webpack-merge')
const common = require('./webpack.config.cjs')

/** 打包体积分析插件 */
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
	mode: 'development',
	// 源码地图，官方推荐选项
	devtool: 'source-map',
	devServer: {
		// 需要修改本地电脑 hosts 文件，对应上本机ip地址，一般是放在C:\Windows\System32\drivers\etc\hosts
		host: 'local.newrank.cn',
		// 自定义端口
		port: 7080,
		// 自动打开浏览器
		open: true,
		// 支持 HTTPS
		https: false,
		// history 路由
		historyApiFallback: true,
		// 热更新
		hot: true,
		// 当出现编译错误或警告时，在浏览器中显示全屏覆盖
		client: {
			overlay: { errors: true, warnings: false }
		}
	}
	// plugins: [
	// 	// 打包体积分析插件
	// 	new BundleAnalyzerPlugin()
	// ]
})
