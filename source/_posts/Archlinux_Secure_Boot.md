---
title:
date: 2018-08-30 14:34:10
categories:
- Linux
keywords:
- Archlinux
- Secure Boot
- 双系统
tags:
- Archlinux
- Secure Boot
photos:
---

在预装了 Winodws 10 的笔记本上装上了 Archlinux (GPT + UEFI)，然后由于其不支持 Secure Boot，不得已关掉了该选项，但这并不是我想要的，经过一番摸索，终于解决问题。

<!-- more -->

## 介绍

Secure Boot 是 UEFI (Unified Extensible Firmware Interface) 的一个 feature，用于应对 ```boot sector viruses```，这种病毒在开机时执行，难于防范。 Secure Boot 主要原理是使用加密签名，开机时固件会检查其执行的 UEFI 程序是否有加密签名，若签名与 NVRAM 中保存的签名不一致或是被列入 NVRAM 黑名单，那么该 UEFI 程序将被禁止运行，操作系统没有获得计算机控制权自然就无法启动，理论上就阻止了病毒的传播。

关于 Secure Boot 尤其是 for Linux 的更多介绍，可参见 [Managing EFI Boot Loaders for Linux: Dealing with Secure Boot](http://www.rodsbooks.com/efi-bootloaders/secureboot.html)，也正是在该文的引导下解决了 Archlinux 中的 Secure Boot 问题。

## Shim & PreLoader

## 参考

[Managing EFI Boot Loaders for Linux: Dealing with Secure Boot](http://www.rodsbooks.com/efi-bootloaders/secureboot.html)
[Secure Boot in Arch Linux](https://wiki.archlinux.org/index.php/Secure_Boot)
