---
title: Sublime Text 3 插件推荐与介绍
date: 2016-10-06 10:24:14
categories:
- 工具利器
keywords:
- Sublime Text
- Sublime插件
tags:
- Sublime
photos:
layout: sticky
---

Sublime Text 是诞生于2008年的一款文本编辑器，本文会推荐并介绍部分Sublime Text常用插件，所用Sublime Txet 3版本为Build 3143。

<!--more-->

## 插件

1.Boxy Theme

一款为Sublime Text 3 3103以上版本开发的主题，该主题使用``A File Icon``图标库，所以要想更完整的使用该主题，可以安装该图标插件。插件详情可访问 [Package Control](https://packagecontrol.io/packages/Boxy%20Theme) 官网

2.SideBarEnhancements

侧边栏增强插件，能给侧边栏增加很多选项。插件详情可访问 [Package Control](https://packagecontrol.io/packages/SideBarEnhancements) 官网，或者 [SideBarEnhancements](https://github.com/titoBouzout/SideBarEnhancements/tree/st3) 开源库。

3.SyncedSidebarBg

这是用来使侧边栏与主面板颜色主题同步的插件，如果安装了其他的颜色主题便可不比在使用该插件。

4.Emmet

前身为 ``Zen Coding``，是个能大幅提高开发效率的工具，主要快捷键：``Tab``用于标签自动补全。完整的快捷方式可访问 [Emmet 快捷方式查询](http://emmet.evget.com/)

5.CSScomb

CSScomb 是一个超级爽的前端css属性排序工具，用来规则CSS。另外，可以去官网定制自己喜欢的 CSS 样式规则，详情访问[CSScomb在线配置参数](http://csscomb.com/config)。

**提醒**：使用 CSScomb 需要 ``node.js`` 的支持，同时要在 CSScomb 中设置 node.js 路径，它默认只有 linux 下的路径，没有 Windows 的，可以参考以下格式：

```
"node-path" : "D:\\Nodejs\\node_modules\\npm\\bin",
```

6.DocBlockr

用来生成注释的插件，定义一个函数f(a,b){}，然后在它前面输入

```
/**
```

然后 ``Tab`` 一下，就能生成：

```
/**
 * [fun description]
 * @param  a [description]
 * @param  b [description]
 * @return   [description]
 */
int fun(int a, int b)
{

}
```

如果不想生成那么多内容，可以只输入

```
/*
```

然后生成如下内容：

```
/*

 */
int fun(int a, int b)
{

}
```

7.SublimeTmpl

文件模板插件，帮助我们生成相应的模板，提高效率，目前支持 ``html/js/css/php/python/ruby`` ，快捷方式：

```
Ctrl+Alt+H html
Ctrl+Alt+J javascript
Ctrl+Alt+C css
Ctrl+Alt+P php
Ctrl+Alt+R ruby
Ctrl+Alt+Shift+P python
```

详情可访问 [Kairyou's Blog](http://www.fantxi.com/blog/archives/sublime-template-engine-sublimetmpl/) 或 [SublimeTmpl](https://github.com/kairyou/SublimeTmpl)

8.ConvertToUTF8

让 Sublime 支持 Unicode 编码，防止出现中文乱码。

9.HTML/CSS/JS Prettify

HTML/CSS/JS 代码格式化插件，快捷方式：

```
Ctrl+Shift+H
```

10.Anaconda

Python 开发的小伙伴都知道，由于该插件使用``PEP8``编码规范，每行长度不超过80，所以代码中会出现很多白框，这个可以在插件配置中关掉。

```
"anaconda_linting": false,
```

11.NASM x86 Assembly

Assembly插件，用于编写汇编(x86架构)程序。

12.OminiMarkupPreviewer

``Markdown`` 文件预览插件，主要快捷方式：

```
Ctrl+Alt+O
```

## 参考资料

- [CSScomb的安装和参数配置以及消除空行](https://segmentfault.com/a/1190000004577644)
- [sublime text 3 插件：DocBlockr与javascript注释规范](http://frontenddev.org/article/sublime-does-text-3-plug-in-docblockr-with-javascript-comments-specification.html)
