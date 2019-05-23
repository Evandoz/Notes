---
title: 使用 DiskPart 自定义 Windows 分区大小
date: 2019-01-10 14:12:20
categories:
- Windows
keywords:
- DiskPart
- Windows
- 自定义分区大小
tags:
- Windows
- DiskPart
photos:
---

使用优启安装 Windows 时，创建系统引导分区一般有两种方法：

1. 从优盘启动后，直接使用 Windows 的自动创建功能，它默认会创建相应大小的分区，其大小一般如下（Windows 10）

```
  分区 ###       类型              大小     偏移量
  -------------  ----------------  -------  -------
  分区      1    恢复                 529 MB  1024 KB
  分区      2    系统                 100 MB   530 MB
  分区      3    保留                  16 MB   630 MB
  分区      4    主要                  XX GB   646 MB
  ......
```

**恢复（Recovery）分区**：用于 Windows Recovery，默认大小为 529M，安装好系统后会使用掉 465M 左右，剩余空间 16% 。默认大小有个痛点就是，Windows 10 大版本直接通过系统更新时会出现空间不足，然后它就会从系统盘（C:）扣除，这样一来已经调整好的分区空间就会被破坏（强迫症），当然如果自己下载系统重装就不会出现这种情况了。

**系统（EFI System）分区**：引导分区，非常重要，缺失将无法进入系统，默认大小 100M，用于存放引导文件，当系统本身完好，引导出问题时，可以通过优启打开 CMD 终端，通过 bcdboot 重建引导分区。100M 的默认大小对于安装双系统会是一个痛点，像 Linux、MacOS 一般要求 200M+，如黑苹果双系统，若 ESP 分区小于 200M，MacOS 上如磁盘工具等会无法使用。

**保留（MSR）分区**：未分配分区，默认大小 16M，不是很重要，可有可无。

**主要（Primary）分区**：安装系统、软件的分区，即实际可以被掌控的分区（C:、D:、E:...）。

2. 使用 Windows 自带的 DiskPart 命令行工具手动分配

优盘启动至选择分区时，Shift + F10 打开 CMD 终端，使用命令

```
diskpart
```
即可进入分区工具终端操作界面（大小写不敏感）

显示所有硬盘

```
list disk
```

选择硬盘

```
select disk X （X为硬盘编号）
```

清空磁盘

```
clean
```

转化为 GPT 分区表

```
convert gpt
```

**创建恢复分区**

```
cre part primary size=512
format quick fs=ntfs label="Recovery" （fs=filesystem，格式化为 NTFS）
set id="de94bba4-06d1-4d40-a16a-bfd50179d6ac"  （设置GUID，表示 GPT 分区类型）
gpt attributes=0x8000000000000001  （设置Attribute，表示 GPT 分区属性，此处为其设置特殊保护）
```

**创建系统分区**

```
cre part efi size=256  （建议 256M - 512M，如果装双系统建议设置大一点）
format quick fs=fat32 （fs=filesystem，格式化为 FAT32）
set id="c12a7328-f81f-11d2-ba4b-00a0c93ec93b"  （设置GUID，表示 GPT 分区类型）
```

**创建保留分区**

```
cre part msr size=16 （使用 Windows 10 默认大小）
// set id="e3c9e316-0b5c-4db8-817d-f92df00215ae"  （设置GUID，表示 GPT 分区类型，Windows MSR 分区不支持此操作）
```

注：MSR 分区未格式化，因为它的设定就是未分配空间。

以上命令中使用了简写：

cre === create
part === partition

使用命令

```
list part
```
显示刚创建的分区：

```
  分区 ###       类型              大小     偏移量
  -------------  ----------------  -------  -------
  分区      1    恢复                 512 MB  1024 KB
  分区      2    系统                 256 MB   513 MB
  分区      3    保留                  16 MB   769 MB
  分区      4    主要                  50 GB   785 MB
```

最后，关于 GPT 分区表的内容参见
