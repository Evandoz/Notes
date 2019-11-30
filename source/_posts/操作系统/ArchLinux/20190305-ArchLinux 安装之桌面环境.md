---
title: ArchLinux 安装之桌面环境
keywords:
  - ArchLinux
  - 桌面环境
  - Xorg
  - KDE
tags:
  - ArchLinux
  - Xorg
  - KDE
featured_image:
---

## 1.安装 Xorg

XOrg 项目提供了 X 窗口系统的开源实现，已经成为图形用户程序的必备条件，桌面环境（如KDE）在它基础上运行，因此要先安装Xorg。

Xorg 可以通过 xorg-server 包安装。此外，xorg-apps 组提供了一些程序以完成某些特定的配置工作。

也可以直接安装软件包组 xorg，它包含了 Xorg server 包，以及 xorg-apps 中的软件包和字体.

```sh
# pacman -S xorg-server
```

**注意：安装完xorg后最好进行测试，如果xorg无法正常运行，之后安装的KDE是无法正常起作用的。**

这里曾经遇见的问题就是无法登录，原因在于没有session，这个在登陆界面左上角session中可以直观的看到。正常情况下，该session选项框显示的是**Plasma（安装了KDE Plasma）**，而由于xorg无法正常运行，session的值就为空，也就无法登录。

注意：实测时发现 root 用户无法通过桌面环境登录，必须创建普通用户，否则就会出现上述的无法登录，根本不显示登录框（KDE），或者一片空白（Deepin）

驱动安装

INTEL NVIDIA AMD

## 2.运行

Xorg 通常不知直接运行，而是使用显示管理器（自动）或者 xinit （手动）来启动 X server，这样就不需要额外的安装和配置。

## 3.配置

Arch 提供了位于 /usr/share/X11/xorg.conf.d 的默认配置文件。通常情况下，用户无需进行额外的配置与修改即可正常使用，Xorg 通过 xorg.conf 和 .conf文件初始化配置。

此外，显卡驱动可能提供了自动配置工具，例如 NVIDIA 提供了 nvidia-xconfig，ATI 提供了 aticonfig。

使用 xconfig 生成 .conf 文件

```sh
# nvidia-xconfig
```

## 4.安装KDE Plasma桌面及KDE应用

在安装 Plasma 之前，请确保 Xorg 已经被安装到您的系统中并可以正常工作

```sh
# pacman -S plasma kde-applications
```

plasma组用于安装桌面，kde-applications用于安装 KDE 的全套应用。

**注意：**kde-applications仅仅安装应用程序，并不会安装 Plasma 桌面。

## 5.安装显示管理器SDDM

Simple Desktop Display Manager (SDDM) 是 KDE Plasma桌面环境首选的显示管理器。

```sh
# pacman -S sddm sddm-kcm // 安装
# systemctl enable sddm // 自启动
```

SDDM的配置文件为 /etc/sddm.conf ，在使用了 systemd 的系统中, 由于 SDDM 默认使用 systemd-logind 管理会话，无需作额外的设置，因此安装SDDM时将不会产生配置文件。

如果需要修改配置文件，SDDM提供了一个命令用于产生一个包含了默认设置的配置文件样本:

```sh
# sddm --example-config > /etc/sddm.conf
```

## 6.安装字体优化体验

```sh
# pacman -S wqy-microhei wqy-microhei-lite adobe-source-han-sans-cn-fonts adobe-source-han-serif-cn-fonts
```

## 7.更换网络连接服务

之前使用的一直都是netctl这个自带的网络服务，而桌面环境使用的是 NetworkManager 这个网络服务（图形化管理），所以需要禁用 netctl 并启用 NetworkManager：

```sh
$ sudo systemctl disable netctl
$ sudo systemctl enable dhcpcd NetworkManager （注意大小写）
```

可能需要安装

```sh
$ sudo pacman -S networkmanager
```

如果需要安装工具栏工具来显示网络设置图标（视情况而定，桌面环境可能已安装）：

```sh
$ sudo pacman -S network-manager-applet
```

之后就可以在图形界面下配置网络了。
