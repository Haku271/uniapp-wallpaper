# 幻境 AI 壁纸微信小程序

## 简介
这是一个基于 **uni-app** 和 **Vue 3** 开发的微信小程序。项目包含壁纸分类、热门推荐、预览下载、用户收藏及 AI 绘图等功能。

## 主要功能
- **首页推荐**: 包含轮播图、公告、推荐专题等。
- **壁纸分类**: 提供多种壁纸分类浏览。
- **图片预览**: 支持大图预览、下载及收藏功能。
- **AI 绘图**: 集成 AI 生成/编辑图片功能（`classify-edit`）。
- **用户中心**: 登录、个人收藏管理、浏览历史等。
- **搜索**: 支持关键词搜索壁纸。

## 技术栈
- **框架**: [uni-app](https://uniapp.dcloud.io/) + Vue 3
- **UI 组件**: uni-ui, uv-ui, mescroll-uni (下拉刷新/上拉加载)
- **样式**: SCSS
- **运行环境**: HBuilderX / 微信开发者工具

## 目录结构
```
├── api             // 接口管理
├── common          // 公共样式 (style)
├── components      // 公共组件 (自定义导航栏、标题等)
├── pages           // 页面文件
│   ├── index       // 首页
│   ├── classify    // 分类页
│   ├── user        // 用户中心
│   ├── preview     // 预览页
│   └── ...
├── static          // 静态资源
├── uni_modules     // 插件市场模块
├── utils           // 工具函数 (请求封装、系统信息等)
├── App.vue         // 应用入口
├── main.js         // Vue 初始化入口
├── manifest.json   // 配置应用名称、appid、Logo 等
└── pages.json      // 全局路由及样式配置
```

## 快速开始

### 1. 环境准备
- 下载并安装 [HBuilderX](https://www.dcloud.io/hbuilderx.html).
- 下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) (如需开发小程序).
- 安装 Node.js (可选，用于依赖管理).

### 2. 运行项目
1. 使用 HBuilderX 打开项目根目录。
2. 运行到浏览器: 点击菜单栏 `运行` -> `运行到浏览器` -> 选择浏览器。
3. 运行到小程序: 点击菜单栏 `运行` -> `运行到小程序模拟器` -> `微信开发者工具`。

## 注意事项
- 项目依赖 `uni_modules`，请确保 HBuilderX 已安装相关插件支持。
- 接口地址在 `utils/request.js` 中配置，请根据实际情况修改。
- 小程序 AppID 在 `manifest.json` 中配置 (`wxd0f3a0c46df8249a`)。
