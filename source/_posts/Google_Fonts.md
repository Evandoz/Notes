---
title: 在前端开发中使用谷歌字体
date: 2017-04-30 19:30:04
categories:
- 前端开发
keywords:
- 谷歌字体
- 前端开发
tags:
- 字体
- 谷歌字体
photos: https://raw.githubusercontent.com/Evandoz/blob/master/Google/Google.jpg
---

本文记录了如何使用谷歌的字体库！

<!--more-->

## 谷歌字体库

网站大概长这个样

![Google Fonts](https://raw.githubusercontent.com/Evandoz/blob/master/Google/001.png)

网址在这

[Google Fonts](https://fonts.google.com/)

## 在线使用

访问谷歌字体网站，选择想要使用的字体，随后页面下方会弹出一个悬浮页面，里面提供了使用该字体的方法。

一种是HTML标签``link``引入，然后在css中使用``font-family``属性

```html
<link href="https://fonts.googleapis.com/css?family=XXX" rel="stylesheet">
```

![link](https://raw.githubusercontent.com/Evandoz/blob/master/Google/002.png)

另一种是使用CSS的引入方式``@import``，然后同样是在css中使用``font-family``属性

```css
@import url('https://fonts.googleapis.com/css?family=XXX');
```

![@import](https://raw.githubusercontent.com/Evandoz/blob/master/Google/003.png)

## 离线使用

前面两种方式均是引入谷歌字体库的链接，我们也可以下载谷歌字体文件离线使用，谷歌字体提供了下载接口。

![下载字体](https://raw.githubusercontent.com/Evandoz/blob/master/Google/004.png)

下载之后用本地方式引入 css 中，即下面这种方式，其中***xxx.eot/woff/ttf***等即为下载的字体文件，根据下载的字体格式，选择性使用下面的代码。

```CSS
@font-face {
	font-family: 'xxx';
    src: url('../fonts/xxx.eot');
    src: url('../fonts/xxx.eot?#iefix') format('embedded-opentype'),
         url('../fonts/xxx.woff') format('woff'),
         url('../fonts/xxx.ttf') format('truetype'),
         url('../fonts/xxx.svg#xxx') format('svg');
    font-weight: normal;
    font-style: normal;
}
```

## 最后

本文只介绍怎么用，至于能不能用就要看众多老司机们了，虽然大流氓曾经做过谷歌字体的代理，不过现在已经正式停止服务了。

![](https://raw.githubusercontent.com/Evandoz/blob/master/Google/005.png)
