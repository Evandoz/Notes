---
title: 关于 Serif、Sans-Serif、Monospace 字体
keywords:
  - 字体
  - Serif
  - Sans-Serif
  - Monospace
tags:
  - 字体
featured_image:
---

## 五类（个）字体

CSS 定义了 5 个常用的字体名称：serif、sans-serif、monospace、cursive、fantasy。 这些是通用字体名称，并不是指某种特定的字体，当使用这些名称时，使用的字体完全取决于浏览器，而且也会因为所运行的操作系统不同有所差异。

名称|含义|用法|示例
:--|:--|:--|:--
serif|衬线字体，字体笔画尾端有额外装饰|可阅读性好，常用于文章、印刷，减轻用户阅读疲劳|Times New Roman
sans-serif|非衬线字体，字体笔画尾端无装饰，各处笔画粗细一致|醒目，常用于小句子片段、标语标题等|Arial
monospace|每个字符具有相同宽度的字体|常用于代码|Consolas、FiraCode
cursive|手写体，模拟笔迹，具有流动的连接笔画|不常用|X
fantasy|用来装饰的字体|不常用|Copperplate

事实上，移动设备兴起，苹果开始的扁平化设计风潮，反而使非衬线字体被广泛用于各种 UI 的设计开发。

## 网页安全字体

网页安全字体是说字体的系统可用性，目前，只有极少数的几个字体可以在几乎所有常用的系统（Windows、Mac、Android、iOS 和常见的发行版 Linux）上通用，这些便是网页安全字体，而多数字体并不具有系统给通用性。这是 Web 开发者常见的问题，开发者通常希望对显示的文本内容所用的字体有更具体的控制，然而事实是开发者无法知晓在某种系统上有哪些可用的字体，于是对于显示的字体就失去了完全的把握。

CSS Font Stack 网站维护了一个可用在 Windows 和 Mac 操作系统上使用的网页安全字体的列表：

[CSS Font Stack: Web Safe and Web Font Family with HTML and CSS code](https://www.cssfontstack.com/)

## 参考资料

[Typography in ten minutes](https://practicaltypography.com/typography-in-ten-minutes.html)
[字体与排版](https://juejin.im/entry/56f4b708efa631005cc98599)
[Web 字体的选择和运用](https://juejin.im/entry/577366f8128fe100560c93c6)
[字体配色总结](https://juejin.im/entry/59e87972f265da4320025a59)
[前端开发字体的规范](http://caibaojian.com/webfont.html)
