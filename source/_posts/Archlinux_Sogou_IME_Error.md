---
title: ArchLinux 安装后续之 Sogou 输入法异常
date: 2019-05-23 09:40:38
categories:
- Linux
keywords:
- ArchLinux
- 搜狗输入法
- Sogou
tags:
- ArchLinux
-
photos:
---

Archlinux 安装好搜狗输入法，重启之后出现消息提示：

>搜狗输入法异常！请删除.config/SogouPY 并重启

经查询是因为缺少 fcitx-qt4 导致搜狗输入法无法工作，而 Arch 已经将 fcitx-qt4 从 community [移除](https://www.archlinux.org/packages/community/x86_64/fcitx-qt4/)。

如果要恢复使用，可以通过 [链接](https://archive.archlinux.org/repos/2019/03/31/community/os/x86_64/fcitx-qt4-4.2.9.6-1-x86_64.pkg.tar.xz) 下载其最后一个版本。

参考链接：

[AUR (en) - fcitx-sogoupinyin](https://aur.archlinux.org/packages/fcitx-sogoupinyin/)
