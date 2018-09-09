---
title: Vue开发中本地请求数据配置从dev-server.js到webpack-dev-conf.js的迁移
date: 2018-03-29 17:34:25
categories:
- Vue
keywords:
- dev-server.js
- webpack.dev.conf.js
- Vue
- Webpack
tags:
- Vue
-
photos:
---

现实问题：更行后的 vue webpack 模板中没有了 dev-server.js 文件，那么在新版本中如何配置相关文件来完成本地后台模拟数据的访问？

原来的 dev-server.js 文件中的配置经过重组，由 webpack.dev.conf.js 文件替代，因此需要将之前的配置迁移到这个新文件中。

详情参见[VUE开发请求本地数据的配置，旧版本dev-server.js，新版本webpack.dev.conf.js](https://www.xiuyuan.info/?p=230)
