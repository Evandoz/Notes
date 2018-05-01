---
title: 更换畅言评论系统
date: 2017-07-31 17:43:09
categories:
- HEXO博客
keywords:
- 畅言
- 友言
tags:
- Hexo
photos: http://floretten-1252347631.costj.myqcloud.com/cyan/cyan.png
layout: sticky
---

第三方评论系统一度曾是各方争抢的流量热点，但随着一些不得已原因，越来越多的第三方评论系统纷纷停止服务。2017年很火的多少评论宣布将停止服务，这无疑给使用多说的用户带来了麻烦，迁徙评论成了一种选择，本文将以实际操作简单介绍搜狐畅言系统的配置。

<!--more-->

## 畅言配置

使用畅言系统必须提供网站的备案号，否则只能使用 15 天。毕竟现在国家网络信息管的紧，网站都需要备案的，使用独立的域名的司机们应该都备过案了。另外的福利是畅言有广告服务，同意其广告协议可以有广告收入，当然如果你不需要可以不用管它。

### 注册获取通用代码

畅言提供了桌面端、移动端、自适应等几类代码，可根据需要选择自己需要的。本站使用的是自适应的代码，就以此为例说明几点情况。

```javascript
<!--PC和WAP自适应版-->
<div id="SOHUCS" sid="请将此处替换为配置SourceID的语句" ></div>
<script type="text/javascript">
(function(){
var appid = '你的APPID';
var conf = '你的APPKEY';
var width = window.innerWidth || document.documentElement.clientWidth;
if (width < 960) {
window.document.write('<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" src="https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf + '"><\/script>'); } else { var loadJs=function(d,a){var c=document.getElementsByTagName("head")[0]||document.head||document.documentElement;var b=document.createElement("script");b.setAttribute("type","text/javascript");b.setAttribute("charset","UTF-8");b.setAttribute("src",d);if(typeof a==="function"){if(window.attachEvent){b.onreadystatechange=function(){var e=b.readyState;if(e==="loaded"||e==="complete"){b.onreadystatechange=null;a()}}}else{b.onload=a}}c.appendChild(b)};loadJs("https://changyan.sohu.com/upload/changyan.js",function(){window.changyan.api.config({appid:appid,conf:conf})}); } })(); </script>
```

上面的代码中需要替换的有三处：SourceID、APPID、APPKEY：
1. SourceID 就是文章获页面的唯一标识，就是数据库表中的(类似)主键，因为评论在数据库中存储要与对应的文章会页面匹配，否则会出现评论的混乱。对于 Hexo，可以把相关页的链接（如page.path/url_for(page.path)）或者标题（如page.title）作为 SourceID。
2. APPID和APPKEY在畅言的后台都可以获取。需要注意的是 APPKEY，在后台给的代码中，APPKEY 位置给出的是以``prod``开头的一串代码，而在其帮助文档中写的是 APPKEY ，虽然两串代码不相同，但都能实现功能，任选一种即可，建议使用 APPKEY。

### 安装其他插件

除主体评论框外，畅言还提供了诸如评论数目、热门评论、热评用户等插件，可根据需要自行选择，本站只安装了评论数目，简单说一下注意事项。

关于评论数目的代码，畅言官方提供了三种，详情可访问[获取评论数代码](http://changyan.kuaizhan.com/install/code/comment-count-code)。主要就是两种情况：含评论框的页面和不含评论框的页面，前者适用于列表页，后者适用于详情页，至于原因那就是不言而喻了。经本站测试其实都使用``不含评论框那种代码``即可，不过**需要注意**的是，不要更改的标签名称，否则会出问题，这是本站已经测试过的，也是不得不吐槽的一点了。

更多插件可登录[畅言后台](http://changyan.kuaizhan.com/labs/list)获取。
