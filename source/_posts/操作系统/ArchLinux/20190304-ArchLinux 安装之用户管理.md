---
title: ArchLinux 安装之用户管理
keywords:
  - ArchLinux
  - 用户管理
tags:
  - ArchLinux
featured_image:
---

## 1.添加普通用户

新安装的系统只有一个超级用户 root，使用 root 进行日常操作是不安全的，应当创建普通用户进行日常操作，仅在管理系统时使用 root。

执行who命令，可以查看目前已登陆的用户。

执行 passwd -Sa 命令，可以查看系统上的用户。

执行 useradd 命令，可以添加新用户

```sh
# useradd -m -g "初始组" -G "附加组" -s "登陆shell" "用户"
```

**参数解释：**

- -m：创建用户主目录/home/[用户名]；在自己的主目录内，即使不是root用户也可以读写文件、安装程序等。
- -g：设置用户初始组的名称或数字ID；该组必须是存在的；如果没有设置该选项，useradd会根据/etc/login.defs文件中的USERGROUPS_ENAB环境变量进行设置。默认(USERGROUPS_ENAB yes) 会用和用户名相同的名字创建群组，GID 等于 UID.
- -G：用户要加入的附加组列表；使用逗号分隔多个组，不要添加空格；如果不设置，用户仅仅加入初始组。
- -s：用户默认登录shell的路径；启动过程结束后，默认启动的登录shell在此处设定；请确保使用的shell已经安装，默认是 Bash。

例如要添加一个名为hit的用户，并使用bash作为登录shell：

```sh
# useradd -m -G wheel -s /bin/bash hit
```

此命令会自动创建 hit 群组，并成为 hit 的默认登录群组，**建议每一个用户都设置自己的默认群组**

## 2.安装 sudo

```sh
# pacman -S sudo
```

如果之前安装过 base-devel 包，此处不需要再安装 sudo，因为已经安装过了。

编辑sudo配置文件，为新创建的用户添加sudo权限。

具体操作是：去掉 %wheel ALL=(ALL) NOPASSWD: ALL 前面的注释

```sh
# nano /etc/sudoers
%wheel ALL=(ALL) NOPASSWD: ALL
```

安装配置完sudo，使用普通用户登陆系统执行命令时就可以使用sudo来临时获取权限了。如果要切换到root用户可以使用 su 命令。默认配置时，su 将改用 root 用户登录 shell，而 sudo 会给单个命令临时的超级用户权限。
