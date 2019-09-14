---
title: 一款 Hexo 主题
date: 2017-03-06 15:30:14
categories:
- Hexo
keywords:
- Hexo
- hexo-theme-astrid
- Hexo主题
tags:
- Hexo
- Astrid
photos:
---

从``WordPress``上移植的一款主题，托管于 [GitHub](https://github.com/Evandoz/hexo-theme-astrid) ，访问 [Astrid](https://evandoz.github.io/hexo-theme-astrid/) 可进行预览。

<!--more-->

## 主题预览

![Desktop Preview](https://raw.githubusercontent.com/Evandoz/blob/master/astrid/preview-desktop.png)

## 使用主题

```shell
 $ git clone https://github.com/Evandoz/hexo-theme-astrid.git themes/astrid
```

  详情请访问 [hexo-theme-astrid](https://github.com/Evandoz/hexo-theme-astrid)

## 主题特性

### 侧边栏

Astrid 主题在非文章详情页提供 ~~6~~ 2 种挂件，这些挂件默认都展示，可在配置文件中通过注释来决定是否展示。


```yml
- recent	#最近文章
- social	#社交链接，可自行修改
- archive	#文章归档
- tagcloud	#标签云
- category	#文章分类
- recent_comments	#最近评论
```


另外，Astrid 主题在文章详情页侧边栏可展示文章目录，效果如图。

![toc](https://raw.githubusercontent.com/Evandoz/blob/master/astrid/toc.png)

### 动态云标签

~~Astrid 主题使用动态云标签，这样可解决标签数量过多占据大量页面的问题，当然可以选择不显示标签挂件。~~

![tagcloud](https://raw.githubusercontent.com/Evandoz/blob/master/astrid/tagcloud.gif)

### 文章图片

~~**Astrid** 主题使用 [lightgallery.js](https://sachinchoolur.github.io/lightgallery.js/) 展示图片，效果如图。~~

![lightgallery](https://raw.githubusercontent.com/Evandoz/blob/master/astrid/lightgallery.png)

### 文章版权声明

Astrid 在文章末尾添加有关文章版权信息的声明，声明内容可在``layout/_partial/post/copyright.ejs``文件中自行定制,~~效果如图~~，已更新。

![copyright](https://raw.githubusercontent.com/Evandoz/blob/master/astrid/copyright.png)

## 后续

Astrid 主题完成不久，尚有很多不足之处，望多多指正。另外该主题移植于 Astrid ，此处向原作者致谢。


## 更新说明

2018年10月30日第三次更新，主要对功能模块精简，代码重构等，本文中大部分模块已被精简，更多内容请直接访问 Github，链接如下：

[https://github.com/Evandoz/hexo-theme-astrid](https://github.com/Evandoz/hexo-theme-astrid)
