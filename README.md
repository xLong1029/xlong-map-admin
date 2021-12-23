# xlong-map-element-plus

## 介绍

xlong-map-element-plus 是一套基于 Vue3 + Vite + Bmob + ArcGis 开发的单页面客户端渲染的信息化管理系统示例。

温馨提示：

1. 因我的 Bmob 用的是开发版套餐，所有查询只有全匹配查询，无模糊查询，请根据自行需求进行修改。
2. 部署到 github 的站点是 https 的，上传到 Bmob 的图片地址是 http，在线上项目浏览器会报 Mixed Content 错误，并且无法显示图片，本地运行项目无此问题，建议使用本地运行查看效果。
3. 如果要测试删除功能，请自行添加再删除，请保留我原有的测试数据
4. 定位功能，ArcGis官方示例，获取当前定位总是定位到兰州附近

* 该项目仅作学习参考，请勿商用

## 项目说明

#### 1. 前后端分离开发模式

- **前端**：Vue + Element Plus + ArcGis
- **后端**：Bmob

#### 2. 项目用到技术、框架与插件

[Vue3](https://v3.vuejs.org/)<br/>
[Element Plus](https://github.com/element-plus)<br/>
[ArcGis](https://developers.arcgis.com/javascript/latest/)<br/>

## 目录结构

```
│  .env.development // 开发环境配置
│  .env.production // 生产环境配置
│  .gitignore
│  package.json
│  vite.config.js // 配置文件
│  README.md
│  index.html // 入口文件
│
├─pubilc
│   favicon.ico // 图标
│
├─src
│  │  main.js // 项目入口js
│  │  permission.js // 路由权限配置
│  │  settings.js // 设置文件
│  │  element-plus.js // element-plus按需引用配置
│  │  App.vue // 根组件
│  │
│  ├─assets // 资源目录，这里的资源会被wabpack构建
│  ├─api // api接口文件
│  ├─store  // 应用级数据（state）
│  ├─styles  // 样式
│  │
│  ├─mock // 测试数据
│  │    jobList.json // 岗位数据
│  │    moreUtilPanel.json // 工具面板
│  │    professionList.json // 专业领域
│  │    wkids.json // 坐标系
│  │
│  ├─common 通用方法
│  │  │ index.js
│  │  │ filter.js
│  │  │ form.js
│  │  │ table.js
│  │  │ theme.js
│  │  │ utilsPanel.js
│  │  │ maxScreenPanel.js
│  │  │
│  │  ├─map // 地图相关
│  │  └─mapEvents // 地图事件
│  │
│  ├─config // 项目配置
│  │    index.js
│  │
│  ├─components // 功能组件
│  │
│  ├─layout // 布局
│  │  │
│  │  │
│  │  ├─ default // 基础布局
│  │  │   │  index.vue
│  │  │   │
│  │  │   └─components // 布局组件
│  │  │      │  index.js
│  │  │      │
│  │  │      ├─Header // 顶部
│  │  │      ├─Main // 主页面
│  │  │      └─Settings // 设置
│  │  │
│  │  ├─fullscreen // 全屏布局
│  │  │
│  │  └─router-view // N页面路由视图
│  │
│  ├─views // 视图
│  │  │
│  │  ├─account-manage // 用户管理
│  │  ├─describe // 系统说明
│  │  ├─error-page // 错误页面
│  │  ├─login // 登录
│  │  ├─redirect // 重定向
│  │  └─map // 地图
│  │
│  ├─utils // 通用工具函数
│  │    index.js
│  │    auth.js // 读写token
│  │    map.js // 地图通用工具
│  │    request.js // 请求配置，因用了bmob，所以没用到requrest请求
│  │    scroll-to.js // 页面滚动
│  │    validate.js // 验证
│  │
│  ├─bmob  // 封装Bmob请求函数
│  │    bmob-server.js
│  │
│  └─router  // 路由配置
│     │  index.js
│     │
│     └─modules // 分模块的动态路由
│
└─static // 静态资源
```

## 本地运行
1. 安装依赖
> npm install
2. 运行项目
> npm run dev
3. 访问地址：http://localhost:8999

* 通过IP地址访问，获取当前定位时会提示“定位失败，用户拒绝请求地理定位”，通过http://localhost:8080/ 访问可正常使用定位功能。定位功能，ArcGis官方示例，获取当前定位总是定位到兰州附近

## 作者联系方式

QQ：381612175
TEL: 18376686974

github：https://github.com/xLong1029/

站酷主页：http://xlong.zcool.com.cn/

UI 中国：http://i.ui.cn/ucenter/358591.html

- 此项目做学习 Vue3 + Vite 测试使用，ArcGis 我只是外行