---
title: 使用 yarn 更新 package
keywords:
  - yarn
  - 更新依赖包
  - node
tags:
  - Node
  - Yarn
photos:
---

## 方案一

使用命令

```sh
yarn upgrade-interactive --latest
```

进入手动选择模式，手动选择升级的依赖包，按空格键选择，a 键切换所有，i 键反选选择。

## 方案二

使用命令

```sh
yarn upgrade package@version
```

更新选定的 package 到指定的 version，yarn.lock 和 package.json 都会更新，但是会进行版本锁定（版本号前没有``^``符号），如：

```
"vue": "^2.5.10"  -->  "vue": "2.6.10",
```

## 相关阅读

[使用 npm 更新 package](https://evandoz.github.io/Evandoz/2018/NPM_Update_Package/)
