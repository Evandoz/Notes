---
title: GPT 分区表
date: 2019-01-11 20:01:10
categories:
- Windows
keywords:
- Windows
- GPT
-
tags:
- Windows
- GPT
photos:
---

GPT分区表用于存储GPT硬盘分区信息，分区表中的分区信息中有一段区域用来表示分区类型（16字节，即128位）,用于区别分区的用途。

Windows下常见的GUID分区类型主要有：

GUID | 分区类型 | 可设置的磁盘类型 | 备注
:--:|:--|:--:|:--
00000000-0000-0000-0000-000000000000 [PARTITION_ENTRY_UNUSED_GUID] | 无分区 | 基本磁盘/动态磁盘 | X
C12A7328-F81F-11D2-BA4B-00A0C93EC93B [PARTITION_SYSTEM_GUID] | EFI系统分区 | 基本磁盘/动态磁盘 | 使用UEFI引导必须的分区
DE94BBA4-06D1-4D40-A16A-BFD50179D6AC [PARTITION_MSFT_RECOVERY_GUID] | 微软恢复分区 | 基本磁盘/动态磁盘 | X
E3C9E316-0B5C-4DB8-817D-F92DF00215AE [PARTITION_MSFT_RESERVED_GUID] | 微软保留（MSR）分区 | 基本磁盘/动态磁盘 | X
EBD0A0A2-B9E5-4433-87C0-68B6B72699C7 [PARTITION_BASIC_DATA_GUID] | 基本数据分区 | 基本磁盘 | 由Windows创建和识别的数据分区类型，只能为此类型的分区分配驱动器号、卷GUID路径、挂载文件夹等
5808C8AA-7E8F-42E0-85D2-E1E90434CFB3 [PARTITION_LDM_METADATA_GUID] | 逻辑磁盘管理工具元数据分区 | 动态磁盘 | Logical Disk Manager (LDM)
AF9B60A0-1431-4F62-BC68-3311714A69AD [PARTITION_LDM_DATA_GUID] | 逻辑磁盘管理工具数据分区 | 动态磁盘 | X
37AFFC90-EF7D-4e96-91C3-2D7AE055B174 | IBM通用并行文件系统(GPFS)分区 | X | X
E75CAF8F-F680-4CEE-AFA3-B001E56EFC2D | 存储空间（Storage Spaces）分区 | X | X
BFBFAFE7-A34F-448A-9A5B-6213EB736C22 | Lenovo OEM分区（一键还原启动分区） | X | X
F4019732-066E-4E12-8273-346C5641494F | Sony OEM分区（一键还原启动分区） | X | X

**【备注】**

EBD0A0A2-B9E5-4433-87C0-68B6B72699C7 [PARTITION_BASIC_DATA_GUID]：
只能在基本磁盘设置，但有一个例外，如果基本磁盘上的分区设置了PARTITION_BASIC_DATA_GUID和GPT_ATTRIBUTE_PLATFORM_REQUIRED，当该磁盘被转换为动态磁盘，该分区仍然是基本分区，即使磁盘的其余部分是动态磁盘。这是因为该分区被认为是GPT磁盘上的OEM分区。

除了分区类型外，GPT分区表中的分区信息中还有另一段区域来表示分区属性（8字节，即64位），其作用如下：

属性值 | 可设置的磁盘类型 | 含义
:--:|:--:|:--
0x0000000000000001（ 0位）[GPT_ATTRIBUTE_PLATFORM_REQUIRED] | 基本磁盘/动态磁盘 | 分区为计算机正常运行必需分区；对于OEM分区，必须设置此属性。如果为基本磁盘上的分区设置该属性，当磁盘转换为动态磁盘时，该分区仍然是基本分区，即使磁盘其余部分是动态磁盘，因为该分区被认为是GPT磁盘上的OEM分区。
0x8000000000000000（63位）[GPT_BASIC_DATA_ATTRIBUTE_NO_DRIVE_LETTER] | 基本磁盘/动态磁盘 | 当硬盘被挂载到另一台电脑 或者第一次被识别时默认不分配盘符。此属性在存储区域网络（SAN）环境中很有用。
0x4000000000000000（62位）[GPT_BASIC_DATA_ATTRIBUTE_HIDDEN] | 基本磁盘/动态磁盘 | 分区不会被检测到，那么分区就不会分配驱动器号、卷GUID路径、挂载文件夹等，磁盘碎片整理程序等应用程序无法访问该分区。
0x2000000000000000（61位）[GPT_BASIC_DATA_ATTRIBUTE_SHADOW_COPY] | 基本磁盘/动态磁盘 | 分区为另一个分区的卷影副本。
0x1000000000000000（60位）[GPT_BASIC_DATA_ATTRIBUTE_READ_ONLY] | 基本磁盘 | 分区设置为只读，写入分区请求都将失败；文件系统以只读方式挂载；为动态磁盘设置该属性可能会导致I/O错误并阻止文件系统正确安装。

Windows 常用分区类型和分区属性组合：

分区 | GUID | 属性值
:--|:--:|:--:
普通数据分区 | EBD0A0A2-B9E5-4433-87C0-68B6B72699C7 | 0x0000000000000000
OEM分区 | 无特定GUID值，OEM决定 | 0x8000000000000001
WinRE分区 | DE94BBA4-06D1-4D40-A16A-BFD50179D6AC | 0x8000000000000001
EFI系统分区 | C12A7328-F81F-11D2-BA4B-00A0C93EC93B | 0x8000000000000001
MSR保留分区 | E3C9E316-0B5C-4DB8-817D-F92DF00215AE | 0x8000000000000000
恢复/备份分区 | DE94BBA4-06D1-4D40-A16A-BFD50179D6AC | 0x8000000000000001
