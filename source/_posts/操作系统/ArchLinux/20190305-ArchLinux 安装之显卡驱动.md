---
title: ArchLinux 安装之显卡驱动
keywords:
  - ArchLinux
  - 显卡驱动
  - NVIDIA
tags:
  - ArchLinux
featured_image:
---

## 1.获取显卡情况

```sh
# lspci -k | grep -A 2 -E "(VGA|3D)"
```

## 2.选择合适的显卡驱动

本机显卡 NVIDIA Corporation GF119 [GeForce GT 705]

选择驱动并安装：nvidia-390xx-lts（或者nvidia-390xx）

```sh
    # pacman -S nvidia-390xx
```

官方提供了显卡驱动列表：

[NVIDIA (简体中文) - ArchWiki](https://wiki.archlinux.org/index.php/NVIDIA_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

[NVIDIA - ArchWiki](https://wiki.archlinux.org/index.php/NVIDIA)

## 3.64位系统运行32位程序

在64位的操作系统上，让32位的程序发挥好nvidia-utils的优势，还必须启用multilib源来安装lib32的包（例如lib32-nvidia-utils, lib32-nvidia-340xx-utils 或者 lib32-nvidia-304xx-utils）

```sh
# nano /etc/pacman.conf

[multilib]
Include = /etc/pacman.d/mirrorlist

# pacman -Sy
# pacman -S lib32-nvidia-390xx-utils
```

## 4.重启并配置显卡驱动

重启计算机， 使 NVIDIA 的黑名单生效，该名单禁用了 nouveau 模块。

手动配置

自动配置

使用 NVIDIA 提供的配置命令

```sh
# nvidia-xconfig
```
