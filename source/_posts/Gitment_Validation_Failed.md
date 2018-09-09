---
title: 配置gitment出现Validation Failed问题
date: 2018-01-25 17:32:23
categories:
- Hexo
keywords:
- Hexo
- gitment初始化失败
- Validation Failed
tags:
- Hexo
- gitment
photos:
---

尝试使用gitment评论系统过程中，配置完成后初始化评论出现验证失败问题(Error: Validation Failed)。

<!--more-->

## 问题出现

第一次配置 gitment 时，按照官方文档进行如下设置：

```
const gitment = new Gitment({
  id: 'Your page ID', // optional
  owner: 'Your GitHub ID',
  repo: 'The repo to store comments',
  oauth: {
    client_id: 'Your client ID',
    client_secret: 'Your client secret',
  },
  // ...
  // For more available options, check out the documentation below
})

gitment.render('comments')
```

由于 id 这一项，默认为 window.location.pathname ，于是便删除了这一条。随后 push 到 github，初始化评论(Initialize Comments)时，浏览器边弹窗报错：

```
Error: Validation Failed
```

## 问题解决

经过一番摸索，疑似是因为 gitment 配置中 id 过长引起的。因为 gitment 是其作者基于 gitHub 的 issue 开发的，每一条 issue 会有两个 label，label 的最大长度限制为50个字符。这个问题多数人都遇到过，关于这个问题的讨论与建议在 gitment 的 issues 上出现过：[Validation Failed ID长度问题建议](https://github.com/imsun/gitment/issues/116)，印证了前面的想法。问题找到了，那么我们设置一个长度较短的 id 就可以了。

起初想用 page.title 来作为 id，然而操作并不顺利，因为我的标题大部分是中文，而且长度也都不短，再通过 utf 转码会有一堆 % 占空间，长度必定更长。

最后决定使用 page.path 作为 id，因为我的 permalink 的配置有所更改，所以 page.path 的长度相对较短，重新设置后初始化成功，Initialize Comments 按钮变成了文字 No Comment Yet 。

关于我的 permalink 设置(在博客根目录的 config.yml 中)，只保留了 year 和 title：

```
xxx
permalink: :year/:title/
xxx
```

## 最后

由于我的 page.path 长度在50个字符以内，所以上述的设置能够成功。但这并不适合所有情况，具体情况具体分析，只要保证 id 在50个字符以内即可。
