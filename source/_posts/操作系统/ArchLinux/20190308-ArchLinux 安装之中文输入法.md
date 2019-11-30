---
title: ArchLinux 安装之中文输入法
keywords:
  - ArchLinux
  - 中文输入法
  - 搜狗输入法
  - Sogou
tags:
  - ArchLinux
featured_image:
---

## 1.安装fcitx输入法引擎

```sh
$ sudo pacman -S fcitx
```

注意：为了在 Gtk+ 和 Qt 上获得更好的体验，还需要安装如下几个包。虽然不安装也可以使用，但很可能出现各种奇怪问题，例如无法光标跟随、无法显示预编辑字符串、无法输入甚至卡死等情况。

```sh
$ sudo pacman -S fcitx-gtk2 fcitx-gtk3 fcitx-qt4 fcitx-qt5
```

## 2.配置fcitx

fcitx 提供了若干图形界面的配置程序：KDE 中的 kcm-fcitx，基于 GTK3 的 fcitx-configtool。

```sh
$ sudo pacman -S fcitx-configtool
$ sudo pacman -S kcm-fcitx
```

安装完配置工具 fcitx-configtool 之后打开配置工具即可添加输入法。

对于新安装的英文系统，要取消只显示当前语言的输入法（Only Show Current Language），才能看到和添加中文输入法(Pinyin, Libpinyin等)。

如果要手工编辑 fcitx 的配置文件，请确保系统中并没有在运行 fcitx ，否则手工编辑的配置内容可能丢失。

## 3.安装搜狗拼音

添加 archlinuxcn 的源

```sh
$ nano /etc/pacman.conf
[archlinuxcn]
SigLevel = Optional TrustAll
Server = https://cdn.repo.archlinuxcn.org/$arch
```

然后同步软件库并添加 PGP keys

```sh
$ sudo pacman -Syy && sudo pacman -S archlinuxcn-keyring
```

关于 archlinuxcn 参见

[archlinuxcn/repo](https://github.com/archlinuxcn/repo)

此外，还可以使用 清华、浙大等其他镜像库。

[archlinuxcn/mirrorlist-repo](https://github.com/archlinuxcn/mirrorlist-repo)

注意：安装 fcitx-sogoupinyin 前，需要引入 Archlinuxcn 软件源。

```sh
$ sudo pacman -S fcitx-sogoupinyin
```

## 4.配置搜狗输入法

重启后 fcitx 引擎自动启动，在图形界面配置中将搜狗输入法添加进去即可。
