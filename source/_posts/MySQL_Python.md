---
title: Python 2.7 解决 MySQL 连接问题
date: 2017-04-03 15:32:12
categories:
- Python
keywords:
- Python
- MySQL
tags:
- Python
- MySQL
photos:
---

问题出现在使用Django(Python 2.7 64 Bit)构建Web应用的过程中，由于使用MySQL作为数据库，所以需要安装Python与MySQL连接的中间件MySQL-Python。

<!--more-->

## 缺少MySQLdb模块

没有安装该中间件会报错缺少MySQLdb的模块

```
django.core.exceptions.ImproperlyConfigured: Error loading MySQLdb module: No module named MySQLdb
```

## 命令行安装MySQL-Python

根据提示及网上建议，使用pip来安装该模块

```
pip install MySQL-python
```

然而问题再次出现，需要Microsoft Visual C++ 9.0

```
error: Microsoft Visual C++ 9.0 is required. Get it from http://aka.ms/vcpython27
```

根据提示安装VC++ 9.0后，再次尝试，依然失败。

```
error: command 'C:\\Users\\RAY\\AppData\\Local\\Programs\\Common\\Microsoft\\Visual C++ for Python\\9.0\\VC\\Bin\\amd64\\cl.exe' failed with exit status 2
```

## EXE方式安装MySQL-python

问题多多，放弃该方法，按网上所说直接下载已经编译好的exe包。访问[Python Package](https://pypi.python.org/pypi/MySQL-python/1.2.5)，下载了MySQL-python-1.2.5.win32-py2.7.exe，安装完成后，不在报错缺失模块，但出现了utf-8字符编码的问题

```
'utf8' codec can't decode byte 0xb2 in position 20: invalid start byte
```

经过一番探究，发现可能是因为我使用的是Python 2.7，而MySQL-python是32位的，版本不匹配，然而Python Package网站上只有32位的安装包。

上网搜索64位安装包，终于发现了一个新网站：[Unofficial Windows Binaries for Python Extension Packages](https://www.lfd.uci.edu/~gohlke/pythonlibs/#mysql-python)，下载**MySQL_python-1.2.5-cp27-none-win_amd64.whl**到本地，然后使用pip安装

```
pip install MySQL_python-1.2.5-cp27-none-win_amd64.whl
```
安装完成后，尝试运行Django，不在报错完美运行

## 最后

最后说明一下，MySQL-python支持Python 2，如果使用Python 3，需要使用pymysql作为连接中间件，其安装方法简单，不会由上述一系列问题，具体步骤可上网搜索，此处不再赘述。

吐槽一下，Python 2对中文太不友好了，大家还是迁移到Python 3吧，Python官方已将于2020年停止维护Pyhton 2系列版本，著名科学计算包NumPy也不再维护Python 2版本，经典Web框架Django 2系列版本也不再支持Python2，这些都说明Python 3正在发展壮大，所以还是快快使用潮流吧！！！
