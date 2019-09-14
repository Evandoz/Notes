---
title: 使用 npm 更新 package
date: 2018-04-16 21:32:21
categories:
- 编程开发
keywords:
- npm
- 更新node模块
tags:
- npm
- node
photos: https://raw.githubusercontent.com/Evandoz/blob/master/NPM/node.jpg
---

现实需求：使用vue-cli等脚手架工具创建工程后，当工程中的模块有更新时，如何将工程中的模块都更新到最新？

## 检查模块更新

使用 npm 管理工具的检查更新命令能列举出当前工程所有可更新的 node_module：

```
npm outdated //检查 module 更新
```

使用后效果如下所示（只截取了部分数据）：

```
Package                             Current   Wanted  Latest  Location
autoprefixer                          7.2.6    7.2.6   9.1.3  navigation
babel-eslint                          8.2.6    8.2.6   9.0.0  navigation
babel-jest                           21.2.0   21.2.0  23.4.2  navigation
chromedriver                         2.40.0   2.41.0  2.41.0  navigation
iview                                2.14.3   2.14.3   3.0.1  navigation
vue                                  2.5.16   2.5.17  2.5.17  navigation
```

图片效果如下所示：

![](https://raw.githubusercontent.com/Evandoz/blob/master/NPM/npm-outdated.png)

输出结果展示了包的类别或名称（Package）、当前包版本（Current）、满足 package.json 中指定 semver 范围的包的最大版本（Wanted）、最新包版本（Latest）以及包所在依赖关系树中的位置（Location），关于该命令的详细解释参见 [npm-outdated](https://www.npmjs.com.cn/cli/outdated/)。

## 单个模块更新

获取到包最新的版本号，可以通过命令

```
npm install module@version // module 为模块名，version 为版本号
```

来更新单个模块

## 更新所有模块

更为现实的要求是更新所有模块，然而命令

```
npm update [-g] [<pkg>...]
```

只能根据 package.json 中的版本指定进行更新，即它会将 Current 版本更新到 Wanted 版本。如果不指定包名，他将更新所有包（全局/本地取决于参数 -g）并且从npm@2.6.1开始，该命令只会检查顶级软件包。具体效果如下图，与之前相比，Current 与 Wanted 已经保持一致（红色部分没有了）。关于该命令更多详情参见 [npm-update](https://www.npmjs.com.cn/cli/update/)。

![npm-update](https://raw.githubusercontent.com/Evandoz/blob/master/npm/npm-update.png)

因此，要想使用这种方法更新所有包，需要手动更改 package.json 文件（或使用程序自动化），比较麻烦。

**更高效的办法是使用插件：npm-check-updates**

安装方法：

```
npm install -g npm-check-updates // 使用全局安装，因为不仅限于某个工程使用
```

检查更新：

```
npm-check-updates // 列出所有可更新的包
```

或者使用缩写：

```
ncu
```

效果如下（只截取了部分数据）：

```
Using E:\Repos\navigation\package.json
[..................] \ :
 iview                               ^2.14.3  →   ^3.0.1
 autoprefixer                         ^7.1.2  →   ^9.1.3
 babel-eslint                         ^8.2.1  →   ^9.0.0
 babel-jest                          ^21.0.2  →  ^23.4.2
 babel-loader                         ^7.1.1  →   ^8.0.0
 babel-plugin-dynamic-import-node     ^1.2.0  →   ^2.1.0
 cross-spawn                          ^5.0.1  →   ^6.0.5
 css-loader                          ^0.28.0  →   ^1.0.0
 eslint                              ^4.15.0  →   ^5.5.0
 eslint-config-standard              ^10.2.1  →  ^12.0.0
```

上述命令使用参数选项``-a``（全拼：``--upgradeAll``）：

```
ncu -a, --upgradeAll
```

可更新所有 package；

使用参数选项``-u``（全拼：``--upgrade``）：：

```
ncu -u, --upgrade
```

可更新 package.json 文件。

## 写在最后

为确保相关包已更新，可以再次使用 npm outdated 命令进行检查。

因为 package.json 文件已更新，则可以使用 npm update 命令更新相关包。此处建议仅供参考，可能会出现奇奇怪怪问题，譬如工程无法运行。

更多使用详情，参看 [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)。
