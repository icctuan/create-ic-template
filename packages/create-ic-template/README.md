# create-ic-template

创建模板指令

本地测试步骤：

1. 在 package.json 的 dependencies 中添加下载模板项目名作为依赖，例如 "ic-template": "\*"
2. pnpm install 安装依赖
3. 屏蔽 createTemplate.js 文件中 run 函数中调用的 install 函数，直接进入 downloadTemplate
4. 运行指令 pnpm start <project-directory>
