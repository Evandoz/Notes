---
title: transform 导致 position fixed 失效
keywords:
  - transform
  - position fixed 失效
tags:
  - CSS
photos:
---

``position: fixed``表示相对于窗口定位，可以让元素不跟随浏览器的滚动条滚动，但是今天却碰到了失效的情况。

原来当父元素设置 transform 时，子元素的 position: fixed 的效果会直接降级变成``position: absolute``


参考文章：

[CSS3 transform对普通元素的N多渲染影响 -- 张鑫旭-鑫空间-鑫生活](https://www.zhangxinxu.com/wordpress/2015/05/css3-transform-affect/)
