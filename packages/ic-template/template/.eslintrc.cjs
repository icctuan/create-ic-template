module.exports = {
	root: true,
	// 指定脚本的运行环境
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	// 添加插件（只是加载，拥有了使用它的能力，具体增加的规则需配合extends使用）
	plugins: ['react', '@typescript-eslint', 'prettier'],
	// 启用插件的预定义lint配置
	extends: [
		// eslint默认规则
		'eslint:recommended',
		// react推荐规则
		'plugin:react/recommended',
		// ts推荐规则
		'plugin:@typescript-eslint/recommended',
		// react17之后不需要引入React使用jsx
		'plugin:react/jsx-runtime',
		'plugin:prettier/recommended'
	],
	// 指定解析器
	parser: '@typescript-eslint/parser', // 该解析器将TypeScript转换为与ESTree兼容的形式，从而可以在ESLint中使用。
	// 启用解析器的哪些功能
	parserOptions: {
		// 使用的额外语言特性
		ecmaFeatures: {
			jsx: true
		},
		// 启用最新ES语法版本支持
		ecmaVersion: 'latest',
		// "script"（默认），"module"表示ECMAScript模块
		sourceType: 'module'
	},
	// 共享设置，提供给每一个将被执行的规则
	settings: {
		// react版本问题
		react: {
			version: 'detect'
		}
	},
	rules: {
		// 0:'off'  1:'warn'  2:'error'
		'prettier/prettier': 'error', // 解决与prettier的冲突，格式化部分以prettier为准
		'react/jsx-uses-react': 'off', // 兼容设置：使用JSX的文件中不再导入React
		'react/react-in-jsx-scope': ['off'], // 兼容设置：使用JSX的文件中不再导入React
		semi: 0, // 缺少分号，行尾必须使用分号
		'no-var': 2, // 禁止使用 var，必须用 let 或 const
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-var-requires': 0
	}
}
