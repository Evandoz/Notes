---
title: 配合非负 margin 实现元素的绝对居中
date: 2018-05-13 09:40:38
categories:
- 前端开发
keywords:
- CSS
- 元素居中
- 使用auto margin使固定大小的元素居中
tags:
- CSS
- 元素居中
thumbnail:
---

在 CodePen 发现了一种不太常见元素绝对居中（水平和垂直）方法，大致思路是使用 margin 和 position 属性。**但它并非是将 margin 置为负，而是直接置为 auto，需要说明的是元素需要声明宽/高**。经测试，该方法确实有效。

原文链接是 [Absolute Centering in CSS](https://s.codepen.io/shshaw/fullpage/gEiDt##)

<!-- more -->

## 介绍

一般地，对于已知宽高的元素的居中定位，最先想到的方法是：

```
.el {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100px;
  width: 100px;
  margin: -50px 0 0 -50px;
}
```

或者：

```
.el {
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  height: 100px;
  width: 100px;
}
```

以上两者意思差不对，思路基本一致。

而如果只是水平居中，基本上使用 ``margin: 0 auto;`` 就够了，而且我们也知道 ``margin: auto;`` 在垂直方向是不起作用的，作者原文也是这么说的：

>We've all seen ``margin: 0 auto;`` for horizontal centering, but ``margin: auto;`` has refused to work for vertical centering... until now! But actually (spoiler alert!) absolute centering only requires a declared height* and these styles.


## 代码

作者原文提到的代码如下：

```
.el {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  width: 100px;
  height: 100px;
  margin: auto;
}
```

这种方法被原文作者并命为 ``Absolute Centering``（这种方法可能不是他最早发现，但目前由他这样命名，作者如是说），在这段代码中，每一项都必不可少。当然，若只是需要水平居中，就无需设置高度；若只是垂直居中，就无需设置宽度，但至少有一项，否则不会起作用，这一点是原作者着重强调的。

效果如图：

![Absolute Centering](https://raw.githubusercontent.com/Evandoz/blob/master/Web/centering.png)

## 优点及注意点

**！！以下为作者原话转述！！**

优点：
1. 跨浏览器支持，在 Chrome，Firefox，Safari，Mobile Safari，Windows Phone 甚至 IE8-10 的最新版本中都能完美运行（没测试，毕竟没那么多设备）。
2. 没有特殊的标记，风格简约。
3. 对百分比大小以及 max-/min- 都适用（已测试，确实如此）。
4. 只使用一个 class 即可居中元素。
5. 是否设置 padding 没有影响。
6. 元素块能够随父元素大小自动调整居中状态（希望没理解错，但确实能自适应）。
7. 对于图片也能完美适用。

注意点：
1. 必须声明高度（前面已经强调过）。
2. 建议设置 ```overflow: auto``` 来防止内容溢出（毕竟固定宽/高）。
