---
title: Vue.js+Django前后分离快速构建Web应用
date: 2018-03-02 10:08:53
categories:
- Vue
keywords:
- Vue.js
- Django
- Web
tags:
- Vue.js
- Django
photos:
layout: sticky
---

Vue.js是一套用于构建用户界面的渐进式框架，特点是数据驱动，区别传统DOM操作，核心库只关注视图层，易与第三方库或既有项目整合，。而Django由Python的一种经典Web应用框架，采用了MTV模式。两者结合或许能使Web的开发更加高效快捷。

## 背景说明

本文将采用Vue.js快速搭建前端页面，使用Django提供服务后端的数据接口，从而实现前后端的分离，快速构建Web应用。

## 环境搭建

1. Django环境
Python 2.7 + Django 1.9 + MySQL 5.7 + Python-MySQL连接件
**说明**：关于Python与MySQL的连接件可以直接使用pip包管理器安装(Linux上推荐)，也可以直接[下载安装包](https://pypi.python.org/pypi/MySQL-python/1.2.5)(Windows上推荐)

2. Vue.js环境
Node.js 6.1 + Vue.js 2.0
**说明**：关于Node.js的版本去官方中文网站下载安装包即可，推荐使用稳定版本，Vue.js的安装可以访问[官网](https://cn.vuejs.org/v2/guide/installation.html)查看安装说明。

## 构建Django工程

1. 构建一个工程，使用命令行和PyCarm集成开发环境均可。

```
django-admin startproject Blog
```

2. 进入目录创建一个应用。

```
python manage.py startapp Article
```

3.  将该应用加入到settings的INSTALLED_APPS列表。

```
INSTALLED_APPS = [
    '...',
    'Article',
]
```

4.  修改数据库配置，将默认sqlite3数据库更改为MySQL

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'Blog',
        'USER': 'root',
        'PASSWORD': '1234',
        'HOST': 'localhost',
    }
}
```
