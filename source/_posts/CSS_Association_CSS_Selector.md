---
title: CSS 引入方式与选择器
date: 2016-09-01 19:42:08
categories:
- 前端开发
keywords:
- CSS 选择器
tags:
- CSS
photos:
-
---

CSS 作为前端三件套中的装饰部件有着重要地位，本文在结合[W3School](http://www.w3school.com.cn)及[网易云课堂](http://study.163.com)相关课程基础上梳理一下``CSS``样式表引入方式及选择器相关的知识点。

<!--more-->

## CSS 三种引入方式

### 行间样式

- 写法：在标签中添加``style``属性，例如：

```
<div style="width:100px;"></div>	//引号中为相应的CSS样式，注意分号“;”
```

- 优点：优先级最高；
- 缺点：影响范围小，代码重用率低，不利于维护，不推荐使用；

### 内部样式

- 写法：在``head``标签中，内嵌``style``标签，在标签中通过``选择器``来控制样式
- 优点：加载速度快，不需要请求服务器；
- 缺点：不利于代码重用

### 外部样式

- 写法：

	1.链接式：在``head``标签中内嵌``link``标签，用来关联一个``CSS``文件，在CSS文件中，通过``选择器``在控制样式；链接式使用的是HTML的规则，在网页文件主体装载前装载CSS文件，因此显示出来的网页从一开始就是带样式的效果的。
	```
	<link rel="stylesheet" href="xxx/example.css">	//href引号中是.CSS文件的路径
	```
	2.导入式：在``head``标签中内嵌``style``标签，用来关联一个``CSS``文件，在CSS文件中，通过``选择器``在控制样式，这与链接式导入法相同；导入式使用的是CSS的规则，在整个网页装载完后再装载CSS文件，如果网页比较大的话则会出现先显示无样式的页面，闪烁之后，才出现网页的样式。故不推荐使用
	```
	<style type="text/css">
		@import"mystyle.css";	//import引号中是.css文件的路径
	</style>
	```
- 优点：利于代码重用；
- 缺点：需要加载服务器；

---

## CSS 元素选择器

### 标签选择器

最常见的选择器，直接将文档元素作为选择器，实现方法为：
**标签名&nbsp;&nbsp;{&nbsp;属性:属性值;&nbsp;&nbsp;&nbsp;&nbsp;//CSS样式，同样注意分号“``;``”&nbsp;}**

```
h1 { font-size: 20px; }
p { color: red; }
```

### id 选择器

首先在相应的标签中添加一个名为``id``的属性，例如：

```HTML
<p id="name">His name is Ray.</p>
```

然后使用``#``添加选择器：
**#id名&nbsp;&nbsp;{&nbsp;属性:属性值;&nbsp;&nbsp;&nbsp;&nbsp;//CSS样式，同样注意分号“``;``”&nbsp;}**

```CSS
#name { color:red; }
```

**注意**：
1、id名要以英文字幕开头；
2、id名是唯一的，不可重复；
3、id选择器不能结合使用，因为id属性不允许有以空格分隔的词列表。
4、id选择器可能区分大小写，这取决于文档的语言。

### 类选择器

首先在相应的标签中添加一个名为``class``的属性，例如：

```HTML
<p class="name">
	His name is Ray.
</p>
```

然后使用``.``添加选择器：
**.类名&nbsp;&nbsp;{&nbsp;属性:属性值;&nbsp;&nbsp;&nbsp;&nbsp;//CSS样式，同样注意分号“``;``”&nbsp;}**

```CSS
.name {color:red;}
```

**注意**：
1、class名要以英文字母开头；
2、class名可以重复，因此它可以同时控制多个标签的样式；
3、可以结合标签选择器使用。例如：

```CSS
p.name {color:red;}
```

此时选择器会匹配``class``属性包含``name``的所有``p``元素，而其他任何类型的元素都不匹配，不论其是否有此``class``属性。即选择器``p.name``解释为：“其``class``属性值为``name``的所有段落”。
4、可以使用``class词列表``。在 HTML 中，一个``class``值中可能包含一个词列表，各个词之间用空格分隔。那么这时可以这样处理，将两个类选择器链接在一起，仅可以选择同时包含这些类名的元素（类名的顺序不限）。如果一个多类选择器包含类名列表中没有的一个类名，匹配就会失败。例如：

```CSS
.name.sex {background-color: red;}
```

此时该选择器会去匹配``class``属性值同时包含``name``和``sex``的标签，若没有则该样式无法实现。

### 属性选择器

如果希望选择有某个属性的元素，而不论属性值是什么，可以使用简单属性选择器，而不仅限于``class``和``id``属性。实现方法为：

首先在相应的标签中添加一个属性，例如：

```HTML
<a href="www.floretten.com" title="nextNote" target="_blink">Ray</a>
```

然后使用``[]``添加选择器：
**[属性]&nbsp;&nbsp;{&nbsp;属性:属性值;&nbsp;&nbsp;&nbsp;&nbsp;//CSS样式，同样注意分号“``;``”&nbsp;}**

```CSS
a[href] {color:red;}
```

此时，选择器只匹配``a``元素中的``href``元素，除此之外，还可以根据多个属性进行选择，只需将属性选择器链接在一起。

```CSS
a[href][title] {color:red;}
```

**注意**：
1、属性选择器并不限于这一种形式，如下表：

|选择器|描述|
|:----:|:--:|
|[attribute]|用于选取带有指定属性的元素|
|[attribute=value]|用于选取带有指定属性和值的元素|
|[attribute`=value ]|用于选取属性值中包含指定词汇的元素|
|[attribute&#124;=value ]|用于选取带有以指定值开头的属性值的元素，该值必须是整个单词|
|[attribute^=value ]|匹配属性值以指定值开头的每个元素|
|[attribute$=value ]|匹配属性值以指定值结尾的每个元素|
|[attribute*=value ]|匹配属性值中包含指定值的每个元素|

2、在使用``属性=属性值``选择器时，要求属性值必须**完全**适配，如果属性值包含用空格分隔的值列表，匹配就会出问题。

### 后代选择器

后代选择器可以让样式只在文档某些结构中起作用，而在其他部分不起作用。例如：

```CSS
div p {color:red;}
```

此时样式只会对``div``元素中的``p``元素及其所有后代及起作用，而对``div``中其他部分不起作用。

```HTML
<div>
	<h2>His <strong>name</strong> is <strong>Ray</strong></h2>
	<p>His <strong>name</strong> is <strong>Ray</strong></p>
</div>
```

>在后代选择器中，规则左边的选择器一端包括两个或多个用空格分隔的选择器。选择器之间的空格是一种结合符（combinator）。每个空格结合符可以解释为“... 在 ... 找到”、“... 作为 ... 的一部分”、“... 作为 ... 的后代”，但是要求必须从右向左读选择器。

因此，``div p``选择器可以解释为“作为``div``元素后代的任何``p``元素”。如果要从左向右读选择器，可以换成以下说法：“包含``p``的所有``div``会把以下样式应用到该``p``”。

### 子元素选择器

相比于后代选择器，子元素选择器影响范围更小，它只能选择作为某元素子元素的元素,即两者必须是直接的父子关系。

```CSS
div > p {color:red;}
```

这句代码中只会对含有``div``的子元素``p``标签及其后代起作用，如果改成div > strong，该样式则无效。

**后代选择器和子选择器结合使用**

```CSS
div.name p > strong
```

上面的选择器会选择作为``p``元素子元素的所有``strong``元素，这个``p``元素本身从``div``元素继承，该``div``元素有一个包含``name``的``class``属性。

```HTML
<div class="name">
<p>
His <strong>name</strong> is <strong>Ray.</strong>
</p>
</div>
```

### 伪类

语法：

```
selector : pseudo-class {property: value}
```

伪类可与 CSS 类搭配使用

```
selector.class : pseudo-class {property: value}
```

比较常见的是``锚伪类``

在支持 CSS 的浏览器中，链接的不同状态都可以不同的方式显示，这些状态包括：活动状态，已被访问状态，未被访问状态，和鼠标悬停状态。

```
a:link {color: #FF0000}		/* 未访问的链接 */
a:visited {color: #00FF00}	/* 已访问的链接 */
a:hover {color: #FF00FF}	/* 鼠标移动到链接上 */
a:active {color: #0000FF}	/* 选定的链接 */
```

### 选择器分组

如果希望多个元素具有相同的样式，可以将多个选择器用逗号``,``分组在一起，例如：

```CSS
h2,body,p,td,th,pre,.name,.sex {color:green;}
```

在选择其中，逗号告诉浏览器规则中包含多个选择器，样式对它们都起作用。

**有关 CSS 更多内容可以访问**：[W3School](http://www.w3school.com.cn)
