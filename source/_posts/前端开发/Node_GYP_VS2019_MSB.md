---
title: Node-gyp 使用 VS 2019 构建工具
date: 2019-02-27 10:23:56
categories:
- 前端开发
keywords:
- vue-cli3
- nodejs
- node-gyp
- vue
- vs2019
tags:
- Vue
-
thumbnail:
---

使用 Vue-cli 3 创建 Vue 工程后，安装依赖包报错，报错提示是 MSVC 编译器的问题:

[NPM fails on msbuild.exe with exit code 1 · Issue #119 · nodejs/node-gyp](https://github.com/nodejs/node-gyp/issues/119)

根据 Github 上 node-gyp 库的 README 提示，该依赖包需要 Python 环境以及 C++ 编译器，其中 Python 推荐 Version 2.7，对于 Python 3.x 是不支持的，而 C++ 编译器因平台而异，Unix/Linux 平台就是 GCC，MAC 平台就是 Xcode，而 Windows 平台就是 MSVC 了。然而问题来了，当前 node-gyp 只更新到使用 VS 2017，对于最新的 VS 2019并未支持。

node-gyp 源码显示，node-gyp 是通过 [configure.js](https://github.com/nodejs/node-gyp/blob/master/lib/configure.js#L147-L158) 来读取，根据

[node-gyp is unable to find msbuild if VS2019 is installed · Issue #1663 · nodejs/node-gyp](https://github.com/nodejs/node-gyp/issues/1663)
[node-gyp failed to build with msbuild 15 · Issue #1688 · nodejs/node-gyp](https://github.com/nodejs/node-gyp/issues/1688)

对原文件进行修改

```
if (vsSetup) {
  gyp.opts.msvs_version = '2015'
  process.env['GYP_MSVS_VERSION'] = 2015
  process.env['GYP_MSVS_OVERRIDE_PATH'] = vsSetup.path
  /* defaults['msbuild_toolset'] = 'v141' */
  defaults['msbuild_toolset'] = 'v142'
  defaults['msvs_windows_target_platform_version'] = vsSetup.sdk
  /* variables['msbuild_path'] = path.join(vsSetup.path, 'MSBuild', '15.0',
                                           'Bin', 'MSBuild.exe') */
  variables['msbuild_path'] = path.join(vsSetup.path, 'MSBuild', 'Current',
                                           'Bin', 'MSBuild.exe')
}
```

需要修改的就是 MSB 构建工具的版本以及路径，
需要注意的是:

1. 构建工具的版本号取决于安装 VS 2019 时的具体选择（最新为 v142）
2. VS 2019 的安装路径与之前有所不同，由原来的内部版本号（如：14.0) 变更为 Current
3. 做好文件备份

![VS 2019](https://raw.githubusercontent.com/Evandoz/blob/master/NPM/node-gyp.png)

该文件在计算机上的具体位置为：

```
X:\nodejs\node_modules\npm\node_modules\node-gyp\lib\configure.js L152-L163 (nodejs 安装目录下)
```

另外：

1. 如果未使用 VS 2019，譬如 VS 2015、VS 2017 等，无需修改任何东西或者根据官方说明进行设置即可
2. node-gyp 还依赖于 Python 环境（推荐 v2.7，不支持 v3.x），node-gyp 的 [README](https://github.com/nodejs/node-gyp/blob/master/README.md) 有说明


