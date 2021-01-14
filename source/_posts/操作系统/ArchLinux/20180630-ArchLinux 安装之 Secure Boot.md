---
title: 在 ArchLinux 中使用 Secure Boot
keywords:
  - ArchLinux
  - Secure Boot
  - 安全启动
  - 双系统
tags:
  - ArchLinux
  - Secure Boot
photos:
---

双系统下使用 Archlinux，由于数字签名信任的问题，无法使用 Secure Boot，不过可以使用可信任的数字签名来解决问题。

## 安全启动(Secure Boot)

Secure Boot 是 UEFI (Unified Extensible Firmware Interface) 的一个 feature，用于应对 ```boot sector viruses```，这种病毒在开机时执行，难于防范。 Secure Boot 主要原理是使用加密签名，开机时固件会检查其执行的 UEFI 程序是否有加密签名，若签名与 NVRAM 中保存的签名不一致或是被列入 NVRAM 黑名单，那么该 UEFI 程序将被禁止运行，操作系统没有获得计算机控制权自然就无法启动，理论上就阻止了病毒的传播。

## 安全启动状态检查

检查 Secure Boot 是否启用有两种途径。

### 启动前检查

通过在引导启动时按一个特殊的键来访问固件配置，这个特殊键取决于设备厂商的固件设置，一般是 Esc，F2，Del 或者其他 Fn 键。大部分设备在启动开始时，会有按某个按键进入固件配置的提示。一般地，在机器启动后需要一直间断不停地按下这个键，甚至在屏幕实际有显示之前要一直按。进入固件设置后，通常在设置屏幕的底部有按键功能导航说明，根据说明可以找到 Secure Boot 设置状态。

### 启动后检查

系统启动后可以使用如下命令检查计算机是否已使用安全引导引导

```sh
$ od --address-radix=n --format=u1 /sys/firmware/efi/efivars/SecureBoot-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```

--format=u1 参数后面的**是数字 1，不是字母 l**，XXXX 表示的字符因机器而异，可以使用 Tab 自动补全。

如果该命令返回的 5 个整数列表中的最后一个整数是 1，表示启用了安全引导，否则未启用。

```sh
6  0  0  0  1
```

如果要检查详细状态，还可以执行如下命令：

```sh
$ bootctl status
```

## 使用签名引导程序

两种已知的带签名的引导加载程序 PreLoader 和 Shim，它们的目的是链式加载其他 EFI 二进制文件（通常是引导加载程序）。PreLoader 和 Shim 使用称为 Machine Owner Key list(MokList) 的白名单机制，即 如果二进制文件（预加载程序和填充程序）或密钥的SHA256哈希值（用shim）签名的二进制文件位于 MokList 中，则执行该代码，否则，它们将启动密钥管理实用程序，该实用程序允许注册哈希值或密钥。

### PreLoader

1.运行原理

PreLoader 运行时尝试启动 loader.efi，如果 loader.efi 的哈希值不在 MokList 中，PreLoader 将启动 HashTool.efi。在 HashTool 中，需要注册将要启动的 EFI 二进制文件的哈希值，即 loader.efi 和 Kernel 的哈希值。

> 注意：每次更新二进制文件(引导加载程序或内核)时，都需要重新注册它们的新的哈希值。

2.安装配置

efitools 软件包中的 PreLoader.efi 和 HashTool.efi 未签名，因此使用会受到限制，因此可以从 [preloader-signed[AUR]](https://aur.archlinux.org/packages/preloader-signed/) 获得签名的 PreLoader.efi 和 HashTool.efi 或者 [手动下载](https://blog.hansenpartnership.com/linux-foundation-secure-boot-system-released/)。

安装 preloader-signed[AUR] 并将 PreLoader.efi 和 HashTool.efi 复制到引导加载程序目录，供 systemd-boot 使用；

```sh
# cp /usr/share/preloader-signed/{PreLoader,HashTool}.efi esp/EFI/systemd
```

然后复制引导加载程序二进制文件，并将其重命名为 loader.efi，供 systemd-boot 使用；

```sh
# cp esp/EFI/systemd/systemd-bootx64.efi esp/EFI/systemd/loader.efi
```

最后，创建一个新的 NVRAM 条目来启动 PreLoader.efi。

```sh
# efibootmgr --verbose --disk /dev/sdX --part Y --create --label "PreLoader" --loader /EFI/systemd/PreLoader.efi
```

其中 X，Y 分别是``EFI系统分区``所在的驱动器号和分区号，具体的与安装系统时的分区设置有关。

此项应作为第一个引导项添加到列表中，可以使用 efibootmgr 命令检查并在必要时调整引导顺序。

### Shim

参考

[Managing EFI Boot Loaders for Linux: Dealing with Secure Boot](http://www.rodsbooks.com/efi-bootloaders/secureboot.html)
[Secure Boot in Arch Linux](https://wiki.archlinux.org/index.php/Secure_Boot)
