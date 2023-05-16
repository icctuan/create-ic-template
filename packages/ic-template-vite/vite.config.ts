import { defineConfig, ConfigEnv, UserConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import postcssPresetEnv from 'postcss-preset-env'
import path from 'path'

export default ({ command, mode }: ConfigEnv): UserConfig => {
	const root = process.cwd()
	const env = loadEnv(mode, root)

	return {
		root: root,
		envPrefix: 'VITE_',
		plugins: [react()],
		resolve: {
			alias: [
				{ find: '@', replacement: path.resolve(__dirname, './src') },
				{
					find: /^~/,
					replacement: `${path.resolve(__dirname, './node_modules')}/`
				}
			]
		},
		css: {
			// 内联的PostCSS配置
			postcss: {
				plugins: [postcssPresetEnv()]
			},
			// 传递给CSS预处理程序的选项
			preprocessorOptions: {
				less: {
					// less的配置项
					javascriptEnabled: true
				}
			}
		},
		server: {
			// host: '',
			port: 5564,
			open: true
		}
	}
}
