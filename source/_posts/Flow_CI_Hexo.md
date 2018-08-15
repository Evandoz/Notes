---
title: 使用 flow.ci 自动部署 Hexo
date: 2016-11-19 15:53:14
categories:
- Hexo
keywords:
- flow.ci自动部署工具
- Hexo
- 自动部署Hexo到Coding.net
tags:
- Hexo
- flow.ci
photos:
layout: sticky
---

国内持续集成工具``flow.ci``上线，尝试将其用于``Coding.net``仓库代码的构建与测试。

## 认识 flow.ci

***

[flow.ci](http://flow.ci/) 采用工作流机制，功能与 Travis CI 差不多，被称为国内的 Travis CI。

>融入 Workflow 机制的持续集成，让代码在 Build, Test, Deploy 间轻盈灵动

关于 flow.ci 的更多介绍，可以访问其[官方博客](http://blog.flow.ci/)。

## 配置步骤

***

关于使用 flow.ci 自动部署 Hexo 的方法，网上目前只在 Juglans' Blog 中出现过。而作者提供的方法要把 id_rsa 文件放在博客源码中，如果使用 public 库，此法并不推荐。因为个人网站是双线托管，只拥有 GitHub public，于是要尝试新方法。

### 注册 flow.ci

必要步骤，有兴趣可以去 flow.ci 官网申请内测以获取邀请码。

![flow.ci](https://floretten-1252347631.costj.myqcloud.com/flow.ci/flow.ci001.png)

### 创建项目

在 flow.ci 拉取仓库源码，创建相应的项目进行自动部署，flow.ci de工作流机制让操作变得简单。

具体的按照下面的顺序操作即可：
创建项目 -> 选择代码源 -> 选择用户 -> 选择仓库 -> 创建工作流 -> 选择脚本模板。

![选择模板](https://floretten-1252347631.costj.myqcloud.com/flow.ci/flow.ci003.png)

### 设置触发器

设置自动部署触发器，因为我是把源代码放在放在分支 hexo 中，博客静态文件放在分支 master 中，所以我选设置为 push hexo 时触发。

![触发器](https://floretten-1252347631.costj.myqcloud.com/flow.ci/flow.ci004.png)

### 配置工作流

配置工作流，这里我们把 ``测试`` 部分删掉，然后加上 ``自定义脚本``。

![自定义脚本](https://floretten-1252347631.costj.myqcloud.com/flow.ci/flow.ci005.png)

脚本参考代码如下

```
# 安装Hexo命令行工具
flow_cmd "npm install hexo-cli -g" --echo

# 执行Hexo生成
flow_cmd "hexo clean" --echo
flow_cmd "hexo g" --echo

# 执行Hexo推送，这里没有使用 hexo d，因为没有权限
flow_cmd "cd ./public" --echo
flow_cmd "git init" --echo
flow_cmd "git config user.name "your name" " --echo  #修改name
flow_cmd "git config user.email "your email" " --echo  #修改email
flow_cmd "git add ." --echo
flow_cmd "git commit -m "site update" " --echo
flow_cmd "git push --force --quiet "git@git.coding.net:your name/reponame.git" master:master" --echo # 修改repo
```

### 配置 Token

我们创建项目后，flow.ci 会自动在 Coding.net 中添加部署公钥，但是这个公钥只有只读权限，用于拉取（git clone）仓库代码，并没有推送权限。

![flow.ci](https://floretten-1252347631.costj.myqcloud.com/flow.ci/flow.ci006.png)

所以现在我们把它删除，重新添加这个公钥，并勾选``推送功能``，这样这个公钥就拥有了推送回 Coding.net 的权限了，提高了安全性。

![coding.net](https://floretten-1252347631.costj.myqcloud.com/flow.ci/flow.ci007.png)

### 测试

配置完后可以手动创建来测试一下是否成功，如不成功可以查看构建日志来查找不成功的原因。

![手动创建](https://floretten-1252347631.costj.myqcloud.com/flow.ci/flow.ci008.png)

## 总结

***

本文所提供自动部署 Hexo 方法解决了代码库安全性问题。如此便可专注于写好文章，构建部署就全交给 flow.ci 完成。
