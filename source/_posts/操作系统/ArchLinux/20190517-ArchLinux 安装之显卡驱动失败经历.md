---
title: ArchLinux 安装之显卡驱动（失败）
keywords:
  - ArchLinux
  - 显卡驱动
  - NVIDIA
tags:
  - ArchLinux
featured_image:
---

直接从Nvidia官网下载驱动程序包 .run 运行出错：

注意：运行 .run 之前，请确保已经安装了编译工具，最好先运行

```sh
# pacman -S base-devel
```

来安装编译驱动需要的配置和工具等。

根据报错信息得知，系统已经使用了Nouveau 驱动，导致不兼容致使安装失败，需要手动禁用Nouveau之后重新安装。

```
ERROR: The Nouveau kernel driver is currrently in use by your system.
This driver is incompatible with the NVIDIA driver, and must be disabled before proceeding.
Please consult the NVIDIA driver REMADE and your Linux distribution's documentation
for details on how to correctly disable the Nouveau kernel driver.
```

并且在接下来的WARING信息中得知，关于禁用Nouveau的配置文件已经写好，即 nvidia-installer-disable-nouveau.conf。

```
WARING: One or more modprobe configuration files to disable Nouveau are already present
at: /usr/lib/modprobe.d/nvidia-installer-disable-nouveau.conf, /etc/modprobe.d/nvidia-installer-disable-nouveau.conf.
Please be sure you have rebooted your system since these files were written. ........
```

现在需要根据这个配置文件来重新生成 initramfs image file 。查询官方 WIKI得知，使用 mkinitcpio 来重建 initramfs 镜像文件，而它的主配置文件是 /etc/mkinitcpio.conf ，在这个文件中，用户可以编辑配置文件中的六个变量。

- MODULES 在钩子扩展运行前需要加载的内核模块。
- BINARIES 内存盘镜像中包含的额外的二进制文件
- FILES  内存盘镜像中包含的其他文件。
- HOOKS  要执行的钩子扩展。
- COMPRESSION  内存盘镜像的压缩方式。
- COMPRESSION_OPTIONS  传递给压缩工具的额外参数，不建议使用，可以自动根据压缩算法传递需要的参数(例如对 xz 传递 --check=crc32 to xz), 手动设置了错误的参数可能导致系统无法启动。

在这里需要使用的就是 FILES 变量，这个选项允许用户添加任何文件到镜像中。FILES数组指定了要加入内存盘镜像的文件，可以覆盖钩子扩展提供的文件。

于是就可以把上面的 nvidia-installer-disable-nouveau.conf 文件路径填入到该变量数组中。

```
FILES: [/etc/modprobe.d/nvidia-installer-disable-nouveau.conf]
```

接下来使用mkinitcpio 重新构建 镜像文件。

```
# mkinitcpio -p linux
```

上述命令使用 Arch 默认的内核 linux ，-p 选项定义了要使用的预配置（preset）；多数内核软件包都会提供一套mkinitcpio预配置文件，放在/etc/mkinitcpio.d目录（比如，linux内核是/etc/mkinitcpio.d/linux.preset）。预配置文件中包含内存盘镜像的基本配置。

再次运行 .run 文件，又出现新的错误，无法找到内核源码路径，因为编译驱动是需要内核源码头文件的。

```
Unable to find the kernel source tree for the currently running kernel.
Please make sure you have installed the kernel source files for your kernel and that they are properly configuration;.....
If you know the current kernel source files are installed, you may specify the kernel source path with the '--kernel-source-path' command line option.
```

于是下载和当前系统一致的内核源码（wget下载工具），解压后放到 /usr/src/ 目录下面。

再次运行 .run 并添加 —kernel-source-path 参数，然而再次报错，提示 version.h 文件不存在。

```
Neither the 'usr/src/linux-5.0.2/include/linux/version.h' nor the /usr/src/linux-5.0.2/include/generated/uapi/linux/version.h' kernel header file exists. ....
```

经过查询知道，内核版本是通过 KERNEL_VERSION 宏来确定的，而它是定义在 version.h 头文件中的，而这个头文件是可以直接通过make来生成的。在内核源码目录(/usr/src/)执行：

```
make include/linux/version.h
```

就能生成version.h文件了。

重启后检查 nouveau drive r确保没有被加载

```
# lsmod | grep nouveau
```

参考文章：

[https://wiki.archlinux.org/index.php/Nouveau](https://wiki.archlinux.org/index.php/Nouveau)

[https://wiki.archlinux.org/index.php/Mkinitcpio](https://wiki.archlinux.org/index.php/Mkinitcpio)
