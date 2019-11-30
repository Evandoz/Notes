---
title: ArchLinux 安装之 AUR
keywords:
  - ArchLinux
  - AUR
tags:
  - ArchLinux
  - AUR
featured_image:
---

AUR 全称 Arch User Repository，是为用户而建、由用户主导的 Arch 软件仓库，相当于Debian/Ubuntu 下的 PPA。为了简化的AUR软件包的安装流程，随之诞生了AUR工具，称之为AUR Helper。

在使用 Arch 用户软件仓库时，AUR 工具可以自动完成某些任务。大多数工具可以自动下载包的 PKGBUILD 并构建软件包。大多数情况下，pacman 不会为 AUR 软件包检查更新，所以一些工具也可以自动从 AUR 检查更新并再次构建新版本的软件包。

注意，即使软件包自身并没有更新，但由于某些库文件的更新，您可能仍需重新构建某些软件包。由于AUR工具并不被官方支持，所以它们不在官方软件仓库中提供。

Archlinux 官方文档中列举了相应的 AUR 工具：

[https://wiki.archlinux.org/index.php/AUR_helpers](https://wiki.archlinux.org/index.php/AUR_helpers)

另外，来自 Linux 中国的推荐与介绍：

[Yaourt 已死！在 Arch 上使用这些替代品](https://linux.cn/article-9925-1.html)
