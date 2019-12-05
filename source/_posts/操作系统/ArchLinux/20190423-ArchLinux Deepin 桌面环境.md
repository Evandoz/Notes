---
title: ArchLinux 安装之 Deepin 桌面环境
keywords:
  - DDE
  - Deepin Desktop Environment
  - 深度桌面环境
tags:
  - ArchLinux
  - DDE
photos:
---

安装 Deepin 桌面环境

```sh
$ sudo pacman -S deepin
```

修改 lightdm.conf 使用登录管理器

```sh
$ nano /etc/lightdm/lightdm.conf

[Seat *]
greeter-session=lightdm-deepin-greeter
```

需要注意的是，非 root 用户需要**存在有效的主目录**才能使 greeter 工作。

实测，如果只有 root 用户，没有普通用户，登录界面会是白屏。

开机启动

```sh
$ sudo systemctl enable lightdm
```

如果安装的双系统，打开 Deepin 文件管理器后总是会提示挂载 Windows 盘需要输入密码认证，如果感觉很烦，不想挂载，可以点击右上角设置按钮，在设置中取消勾选自动挂载。
