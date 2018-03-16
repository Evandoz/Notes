---
title: 分享一款 Hexo 主题
date: 2017-03-06 15:30:14
categories:
- HEXO博客
keywords:
- Hexo
- hexo-theme-astrid
- Hexo主题
tags:
- Astrid
photos:
-
---

从``WordPress``上移植的一款主题，托管于 [GitHub](https://github.com/Laueray/hexo-theme-astrid) ，访问 [Astrid](http://blog.floretten.com/hexo-theme-astrid/) 可进行预览。

<!--more-->

## 主题预览

![Desktop Preview](http://floretten-1252347631.costj.myqcloud.com/astrid/preview-desktop.png)

## 使用主题

```shell
 $ git clone https://github.com/Laueray/hexo-theme-astrid.git themes/astrid
```

  详情请访问 [hexo-theme-astrid](https://github.com/Laueray/hexo-theme-astrid)

## 主题特性

### 侧边栏

Astrid 主题在非文章详情页提供 6 种挂件，这些挂件默认都展示，可在配置文件中通过注释来决定是否展示。


```yml
- recent_posts	#最近文章
- social	#社交链接，可自行修改
- archive	#文章归档
- tagcloud	#标签云
- category	#文章分类
- recent_comments	#最近评论
```


另外，Astrid 主题在文章详情页侧边栏可展示文章目录，效果如图。

![toc](http://floretten-1252347631.costj.myqcloud.com/astrid/toc.png)

### 动态云标签

Astrid 主题使用动态云标签，这样可解决标签数量过多占据大量页面的问题，当然可以选择不显示标签挂件。

![tagcloud](http://floretten-1252347631.costj.myqcloud.com/astrid/tagcloud.gif)

### 文章图片

**Astrid** 主题使用 [lightgallery.js](https://sachinchoolur.github.io/lightgallery.js/) 展示图片，效果如图。

![lightgallery](http://floretten-1252347631.costj.myqcloud.com/astrid/lightgallery.png)

### 文章版权声明

Astrid 在文章末尾添加有关文章版权信息的声明，声明内容可在``layout/_partial/post/copyright.ejs``文件中自行定制,效果如图。

![copyright](http://floretten-1252347631.costj.myqcloud.com/astrid/copyright.png)

## 后续

Astrid 主题完成不久，尚有很多不足之处，望多多指正。另外该主题移植于 Astrid ，此处向原作者致谢。