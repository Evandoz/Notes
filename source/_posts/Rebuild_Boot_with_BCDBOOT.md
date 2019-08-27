---
title: 使用 bcdboot 重建 Windows 系统引导
date: 2019-01-18 11:32:21
categories:
- Windows
keywords:
- bcdboot
- Windows
- 系统引导
tags:
- bcdboot
- Windows
photos:
---

Windows 上自带的 bcdboot 应用程序一种用于快速设置系统分区或修复系统分区上的启动环境的工具，它通过从已安装的 Windows 系统文件夹中复制一小部分启动环境文件来设置/修复系统，此外，它还能够在系统分区上创建引导配置 BCD 文件，该文件存储了启动引导项，用于选择引导已安装的 Windows。

## bcdboot 工作原理
bcdboot 程序通常在 %WINDIR%\System32 文件夹内，运行后它从已有的 Windows 映像复制一套启动环境文件到``启动分区或目录``中，该启动环境文件包括：

``%WINDIR%\boot\efi`` 文件夹和 ``%WINDIR%\System32\boot`` 文件夹

此外，bcdboot 以 ``%WINDIR%\System32\Config\BCD-Template`` 文件为模板，在系统启动分区上创建新的 BCD（启动菜单）文件，并初始化 BCD 启动环境文件，可在 BCD-Template 文件中定义特定的 BCD 设置（需要BCB文件编辑器）。

1. BIOS 引导的系统

固件标识的系统启动分区是 MBR 格式磁盘上的``活动分区``[2]，bcdboot 会在分区上创建 \Boot 目录，并将所有需要的引导环境文件复制到该目录中。

2. UEFI 引导的系统

固件标识的系统启动分区为 GPT 格式磁盘上的``EFI 系统分区（ESP）``[3]，bcdboot 会在分区上创建 \EFI\Microsoft\Boot 目录，并将所有需要的引导环境文件复制到该目录中。

**注：**

[1]. 系统分区可通过 Windows 系统自带 DiskPart 创建，且不必为其指定驱动器号，bcdboot 工具可以自动识别查找系统分区。

[2]. BIOS 无法识别 GPT 磁盘，所以 BIOS 下 GPT 磁盘不能用于启动操作系统，在操作系统提供支持的情况下可用于数据存储，故只见于 MBR 磁盘。

[3]. UEFI 可同时识别 MBR 和 GPT 磁盘，所以 UEFI下 MBR 磁盘和 GPT 磁盘都可用于启动操作系统和数据存储。但由于微软限制，UEFI 下使用 Windows 安装程序只能将系统安装在 GPT 磁盘中，故只见于 GPT 磁盘。


bcdboot 可将现有的启动环境更新到系统分区，Windows 映像中较新的文件版本会复制到系统分区中。

如果系统分区中已存在 BCD 存储，

1. bcdboot 将根据 BCD-Template 文件中的设置，在现有的 BCD 存储中创建一个新启动项，并删除引用同一个 Windows 映像的所有重复的启动项。

2. 如果已存在 Windows 映像的启动项，并且除了默认值以外还对该启动项启用了其他 BCD 设置，则下次运行 BCDboot 时，可使用 /m 选项将 OS 加载程序 GUID 所标识的现有启动项合并到 BCDboot 创建的新启动项，以此来保留这些设置。

## bcdboot 命令（bcdboot.exe 程序）

bcdboot 命令格式

```
bcdboot <source> [/l <locale>] [/s <volume-letter> [/f <firmware>]]
```

bcdboot 命令选项（只列举常用选项，更多选项可在 Windows 终端中输入``bcdboot``查看）

选项 | 描述
:--|:--
source | 指定作为源的 Windows 根目录的位置，将从该目录中复制启动环境文件
/l | 可选，指定初始化 BCD 存储时可选区域设置，默认值为英语（美国）
/s | 可选，指定复制引导文件目标系统分区的卷号，默认值是固件所标识的系统分区
/f | 与 /s 一起使用，指定目标系统分区的固件类型，选项有``UEFI``、``BIOS`` 或``全部``
/v | 可选，启用详细模式
/m | 可选，如果指定了 OS Loader GUID，则合并给定的加载程序对象和系统模板，以生成可启动项，默认情况下，只合并全局对象
/p | 可选，指定 Windows 引导管理器固件项应保留位置。如果条目不存在，新条目将添加到第一个位置
/c | 可选，指定由模板描述的任何现有对象不应迁移

示例：

1. BIOS+MBR 常用

```
bcdboot C:\Windows /l zh-cn
```
从系统盘 C:\Windows 目录中复制启动文件，并创建 BCD（中文）启动菜单。

2. UEFI+GPT 常用

```
bcdboot C:\Windows /s H: /f UEFI /l zh-cn
```
从系统盘 C:\Windows 目录中复制启动文件到 ESP 中，使用 UEFI 引导。
此处指定了 ESP 的驱动器号 H（可选），前提是已经使用 DiskPart 等工具将 ESP 分区装载为 H 盘。

## 使用 bcdboot 的条件

1. 系统启动分区存在（可以通过 Diskpart 工具创建，可参见[使用 DiskPart 自定义 Windows 分区大小](/Evandoz/2019/DiskPart_Custom_Partition_Type_Size/)）

2. windows安装盘中启动文件存在（一般系统本身正常，没要遭到破坏的话，启动文件就是正常存在的）

## 使用 bcdboot 的场景

1. 无法进入系统

优盘启动至选择分区时，Shift + F10 可打开 CMD 终端，然后就能够使用 bcdboot 工具。

2. 已经进入系统

直接打开终端，使用 bcdboot 工具。
