const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
/** 将css提取到单独的文件 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/** 体积压缩插件 */
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
/** eslint插件 */
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
	entry: './src/main.tsx',
	output: {
		filename: '[name].[contenthash:8].js',
		path: path.resolve(__dirname, './dist'),
		clean: true // 清理构建目录
		// publicPath: "dist/", // 放在cdn的就用cdn的路径，相对路径代表相对于html页面的路径
	},
	module: {
		rules: [
			{
				test: /\.(jsx?|tsx?)$/,
				include: path.resolve(__dirname, './src'), // 缩小 loader 作用范围
				use: [
					'thread-loader', // 多进程优化
					{
						loader: 'babel-loader',
						options: {
							presets: [
								// 高版本 ES 语法转换为低版本 ES 语法
								[
									'@babel/preset-env',
									{
										useBuiltIns: 'usage', // 该关键字将设置使用只包括你需要的polyfills
										corejs: 3
									}
								],
								// 配置 react
								[
									'@babel/preset-react',
									{ runtime: 'automatic' } // 配置使用 jsx 时不需要再显式使用 import React from 'react'
								],
								// 配置 ts，执行顺序从后向前，先执行这个
								'@babel/preset-typescript'
							]
						}
					}
				]
			},
			// 解析css文件
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			// 解析less文件
			{
				test: /\.less$/,
				use: [
					// style-loader：合并后的 css 插入到 DOM 中
					// 将style-loader替换成 MiniCssExtractPlugin.loader，实现将 css 代码提取到单独的文件
					MiniCssExtractPlugin.loader,
					// 分析出各个 css 文件之间的关系，把各个 css 文件合并成一段 css
					{
						loader: 'css-loader',
						options: {
							// 配置css module，就必须用模式引入的写法
							modules: {
								mode: 'local'
							}
						}
					},
					// 添加浏览器前缀
					{
						loader: require.resolve('postcss-loader'),
						options: {
							postcssOptions: {
								// 将css 转换为大多数浏览器可以理解的内容，内置 autoprefixer
								plugins: [['postcss-preset-env']]
							}
						}
					},
					'less-loader' // 将 less 编译为 css
				]
			},
			// 解析图片资源
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				// asset 是 webpack 自带的资源模块
				type: 'asset/resource'
			},
			// 字体文件
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource'
			},
			// 解析svg：可以作为React component使用（@svgr/webpack）和 url形式使用（file-loader）
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: ['@svgr/webpack', 'file-loader']
			}
		]
	},
	resolve: {
		// 让文件省略后缀名，按从左到右的顺序依次尝试解析
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	plugins: [
		// 自动将打包后的文件插入html
		new htmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html')
		}),
		// css文件单独打包，设置文件命名格式
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
		// // 定义环境变量
		// new webpack.DefinePlugin({
		// 	// 定义打包之后的静态资源访问路径
		// 	'process.env.PUBLIC_URL': JSON.stringify(env.PUBLIC_URL),
		// 	// 定义接口域名
		// 	'process.env.REACT_APP_API_HOST': JSON.stringify(env.REACT_APP_API_HOST)
		// }),
		// Eslint插件
		new ESLintPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx']
		})
	],
	// 体积压缩
	optimization: {
		minimize: true,
		// 自定义压缩方式
		minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
	}
	// // 排除打包第三方库，可以结合使用cdn的方式
	// externals: {
	// 	react: 'React',
	// 	'react-dom': 'ReactDOM'
	// }
}
