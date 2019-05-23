---
title: CSS 实现图片等比例缩放
date: 2018-03-18 14:23:51
categories:
- 前端开发
keywords:
- CSS
- 图片等比例缩放
- CSS实现图片等比例缩放
tags:
- CSS
-
photos:
---

对图片使用max-width和max-height，图片会按照父容器宽高自动缩放，并保持图片原本的长宽比，图片相对不变形。

```
img{
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
```
