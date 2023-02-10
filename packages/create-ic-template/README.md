# create-ic-template

用于生成开发项目模板

## 命令行安装

1. [默认模板](https://www.npmjs.com/package/ic-template) _React + webpack_

`npx create-ic-template <project-directory>`

## 项目本地测试步骤

1. 在 package.json 的 dependencies 中添加下载模板项目名作为依赖，例如 "ic-template": "\*"

2. 安装依赖 `pnpm install`

3. 屏蔽 createTemplate.js 文件中 run 函数中调用的 install 函数，直接进入 downloadTemplate

4. 运行指令 `pnpm start <project-directory>`
