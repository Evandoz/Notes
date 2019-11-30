---
title: ArchLinux 安装之 GPT+UEFI+Windows10 双系统
keywords:
  - Windwows
  - ArchLinux
  - 双系统
tags:
  - ArchLinux
featured_image:
---

参考官方 Wiki：[Installation guide](https://wiki.archlinux.org/index.php/Installation_guide)

## 1.验证启动模式

如果以在 UEFI 主板上启用 UEFI 模式，Archiso 将会使用 systemd-boot 来 启动 Arch Linux。可以列出 efivars 目录以验证启动模式。

```sh
# ls /sys/firmware/efi/efivars
```

如果目录不存在，系统可能以 BIOS 或 CSM 模式启动。

## 2.连网

（1）检查网络接口

```sh
# ip link
```

（2）有线网动态IP（DHCP）

```sh
# dhcpcd enp5s0 // enp5s0 是在上一步中获取的有线网接口
```

（3）验证联网是否成功

```sh
# ping -c 4 archlinux.org
```

## 3.更新系统时间

使用 timedatectl确保系统时间是准确的

```sh
# timedatectl set-ntp true
```

可以使用 timedatectl status 检查服务状态

## 4.硬盘分区及格式化分区

```sh
# cfdisk
```

对于一个选定的设备，以下的分区是必须要有的：

（1）一个根分区（挂载在根目录）/
（2）如果 UEFI 模式被启用，你还需要一个 EFI 系统分区

**注：**由于在已经安装Windows10的双系统上安装Arch形成双系统，此处不再另外建立EFI分区。当然也可以另外再建立一个属于Arch的EFI分区，但是双系统在启动时会比较麻烦，因为两个系统的引导不在一个地方，不会被计算机自动加载成一个列表，需要手动选择引导。

当分区建立好了，这些分区都需要使用适当的**文件系统进行格式化。**

如：在根分区 /dev/sdX1 上使用 ext4 文件系统，运行mkfs.ext4进行初始化；而在EFI分区 /dev/sdX2 上使用 fat32文件系统，运行mkfs.fat进行初始化。

```sh
# mkfs.ext4 /dev/sdX1
# mkfs.fat -F32 /dev/sdX2
```

另：如果创建了交换分区（例如 /dev/sdX3），运行 mkswap 进行初始化：

```sh
# mkswap /dev/sdX3
# swapon /dev/sdX3
```

## 5.挂载分区

将根分区挂载到 /mnt

```sh
# mount /dev/sdX1 /mnt
```

在/mnt下创建挂载点，挂载efi分区

```sh
# mkdir /mnt/boot
# mount /dev/sdX2 /mnt/boot # 这个在之后安装GRUB引导时会用到
```

其他分区依此类推。

## 6.选择镜像源并安装系统

文件 /etc/pacman.d/mirrorlist 定义了镜像源，在 LiveCD 启动的系统上，所有的镜像都被启用，并且在镜像被制作时，制作人员已经通过他们的同步情况和速度进行排序排序。在列表中越前的镜像有越高的优先被选择权。

可以相应的修改文件 /etc/pacman.d/mirrorlist，并将地理位置最近的镜像源挪到文件的头部，同时也可能应该考虑一些其他标准。

```sh
# nano /etc/pacman.d/mirrorlist
```

nano 是 Archlinux 默认编辑器（类似vi/vim），使用 Ctrl+K 进行剪切、Ctrl+U进行粘贴、Ctrl+O保存、Ctrl+X退出，可安装选用其他编辑器如 vi 等进行编辑。

这个文件接下来还会被 pacstrap 拷贝到新系统里，所以请确保设置正确。

使用 pacstrap 脚本，安装 base 组：

```sh
# pacstrap /mnt base
```

这个组并没有包含全部 live 环境中的程序，有些需要额外安装。如果还想安装其他软件包组比如 base-devel，请将他们的名字添加到 pacstrap 后，并用空格隔开。

当然可以在 # chroot 之后使用 pacman 手动安装软件包或组，不过此处建议将 base-devel 包一块安装，因为 base-devel 软中大部分包在后续安装中都会用到，base-devel 软件包列表可参见以下链接。

[Arch Linux - base-devel (x86_64) - Group Details](https://www.archlinux.org/groups/x86_64/base-devel/)

注：最新更新

使用 pacstrap 脚本，安装 base 组、Linux kernel以及通用固件 firmware

```sh
# pacstrap /mnt base linux linux-firmware
```

## 7.配置Fstab并切换到新安装的系统

用以下命令生成 fstab 文件 (用 -U 或 -L 选项设置UUID 或卷标)：

```sh
# genfstab -U /mnt >> /mnt/etc/fstab
```

强烈建议 在执行完以上命令后，后检查一下生成的 /mnt/etc/fstab 文件是否正确

Change Root 到新安装的系统

```sh
# arch-chroot /mnt
```

## 8.设置时区：

```sh
# ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
```

例如：

```sh
# ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

运行 hwclock 以生成 /etc/adjtime：

```sh
# hwclock --systohc
```

这个命令假定硬件时间已经被设置为 UTC时间。

如果是Windows+Linux双系统设置时间时一定要特别留意，因为Windows默认当前硬件时间为本地时间（LocalTime），而Linux默认但当前硬件时间为世界协调时间（UTC），于是系统显示时会根据时区进行换算。

如：在中国就是UTC+8，这样一来当切换系统时就会出现 8 个小时的时差。因此要么将Windows改成UTC，要么将Linux改成LocalTime，从而来避免时差的尴尬。

通过如下命令可以检查当前设置，systemd 默认硬件时钟为协调世界时（UTC）。

```sh
# timedatectl status | grep local
```

使用 hwclock 命令将硬件时间设置为 localtime：

```sh
# timedatectl set-local-rtc true
```

硬件时间设置成 UTC（恢复默认设置）

```sh
# timedatectl set-local-rtc false
```

上述命令会自动生成/etc/adjtime，无需单独设置。如果不存在 /etc/adjtime，systemd 会假定硬件时间按 UTC 设置。

## 9.本地化

本地化的程序与库若要本地化文本，都依赖 Locale，后者明确规定地域、货币、时区日期的格式、字符排列方式和其他本地化标准等等。在下面两个文件设置：locale.gen 与 locale.conf。

/etc/locale.gen 是一个仅包含注释文档的文本文件。指定您需要的本地化类型，只需移除对应行前面的注释符号（＃）即可，选择带 UTF-8 的项：

```sh
# nano /etc/locale.gen
en_US.UTF-8 UTF-8
zh_CN.UTF-8 UTF-8
```

接着执行 locale-gen ，/etc/locale.gen 会生成指定的本地化文件

```sh
# locale-gen
```

这一步很重要，如果未生成本地化文件，后续应用在执行时可能会出现 locale.Error 错误。

创建 locale.conf 并编辑 LANG 这一 变量，比如：

```sh
# nano /etc/locale.conf
LANG=en_US.UTF-8  // 不推荐在此设置任何中文 locale，会导致 TTY 乱码。
```

将系统 locale 设置为 en_US.UTF-8，系统的 Log 就会用英文显示，这样更容易问题的判断和处理。

## 10.网络

创建 hostname 文件:

```sh
# nano /etc/hostname
myhostname
```

添加对应的信息到 hosts

```sh
/etc/hosts
127.0.0.1	localhost
::1		localhost
127.0.0.1	myhostname.localdomain	myhostname
```

## 11.Root 密码

```sh
# passwd
```

## 12.安装引导程序

由于使用了GPT+UEFI的方式，因此使用GRUB来引导（windows8之后，未通过微软数字签名的系统无法加入到Windows的启动项中，因此使用GRUB来引导，注意区别于GRUB Legacy）。

（1）安装grub、efibootmgr和os-prober

```sh
# pacman -S grub efibootmgr os-prober
```

其中 grub 是 UEFI引导器本身，efibootmgr 是 EFI管理器，os-prober 用于检测其他系统， 双系统必需的管理器（可选）。

（2）接下来，进行grub-install，这一步至关重要，一定要找到自己想要安装grub的磁盘的EFI分区，即ESP，对于双系统来说，基本上这个分区是已经存在的。

```sh
# grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
```

--efi-directory参数后的值是第 5 步中挂在EFI分区的位置，不可出错，因为该分区的类型是EFI System，因此如果填入了错误的值时通常会有提示。

--bootloader-id参数后的值根据自己喜好填入即可。

（3）安装完grub后还需要生成grub配置文件，否则是不起作用的

```sh
# grub-mkconfig -o /boot/grub/grub.cfg
```

GRUB的界面比较简陋，如果想让GRUB更漂亮，可以进行美化，这个属于额外的操作。

## 13.完成安装退出重启

```sh
# exit // 后者 Ctrl+D
# umount -R /mnt
# reboot // 记得移除安装介质（拔掉优盘）
```

## 14.后续操作
后续操作：桌面环境、启动管理器、驱动、GRUB美化等等。


