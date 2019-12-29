---
title: ArchLinux 安装之用户管理
keywords:
  - ArchLinux
  - 用户管理
tags:
  - ArchLinux
photos:
---

## 添加普通用户

新安装的系统只有一个超级用户 root，使用 root 进行日常操作是不安全的，应当创建普通用户进行日常操作，仅在管理系统时使用 root。

执行 who 命令，可以查看目前已登陆的用户。

执行 passwd -Sa 命令，可以查看系统上的用户。

执行 useradd 命令，可以添加新用户

```sh
# useradd -m -g [initial_group] -G [additional_groups] -s [login_shell] [username]
```

**参数解释：**

- -m/--create-home：创建用户主目录 /home/[username] ；在用户自己的主目录内，即使不是root用户也可以读写文件、安装程序等；
- -g：设置用户初始组的名称或 ID，该组必须是存在的；如果没有设置该选项，useradd 会根据 /etc/login.defs 文件中的 USERGROUPS_ENAB 环境变量进行设置。默认(USERGROUPS_ENAB yes) 会用和用户名相同的名字创建群组，GID 等于 UID；
- -G/--groups：用户要加入的附加组列表；使用逗号分隔多个组，中间不要添加空格；如果不设置，用户仅仅加入初始组；
- -s/--shell：用户默认登录 shell 的路径；启动过程结束后，会默认启动此处设定的 shell；请确保设置的 shell 已安装，默认是 Bash。

> 注意：
> 为了能正常登录，选择的 shell 必须位于 /etc/shells 列表中，否则 PAM 的 pam_shell 模块会阻止登录请求。不要使用 /usr/bin/bash 替代 /bin/bash，除非这个路径已经在 /etc/shells 中正确配置。

例如要添加一个用户名为 exp 的用户，并使用 bash 作为登录 shell：

```sh
# useradd -m -G wheel -s /bin/bash exp
```

此命令会自动创建 exp 群组，并成为 exp 的默认登录群组，**建议每一个用户都设置自己的默认群组**

> wheel 是管理组，通常用于授予执行管理操作的权限。它拥有对日志文件的完全读访问权，并有权管理CUPS中的打印机。也可以用来访问sudo和su实用程序(默认情况下都不使用)。

之后通过 passwd 命令设置用户密码，虽然不是必须的，但还是强烈建议设置密码

```sh
# passwd exp
```

## 修改用户登陆名或主目录

1.如下命令修改用户主目录：

```sh
# usermod -d /my/new/home -m username
```

-m 选项会自动创建新目录并移动内容。

> Tip:
> 创建从用户原目录到新目录的链接，这样做将允许程序找到具有硬编码路径的文件。

```sh
# ln -s /my/new/home/ /my/old/home
```

注：确保 ``/my/old/home`` 结尾没有 /。

2.如下命令更改用户登录名：

```sh
# usermod -l newname oldname
```

> 注：
> 此处需要确保没有用当前要更改的用户名登录，具体操作为打开一个新的 tty，以根用户或另一个用户的身份登录并提升为根用户，这样可以防止误操作。

## 安装 sudo

```sh
# pacman -S sudo
```

如果之前安装过 base-devel 包，此处不需要再安装 sudo，因为已经安装过了。

编辑 sudo 配置文件 ``/etc/sudoers``，为新创建的用户添加 sudo 权限。不过 ``visudo`` 会锁定 sudoers 配置文件，保存修改到临时文件，然后检查文件格式，确保正确后才会覆盖 sudoers 文件，必须保证 sudoers 格式正确，否则 sudo 将无法运行。任何 /etc/sudoers 格式错误会导致 sudo 不可用，通常使用 visudo 编辑该文件防止出错。

visudo 调用的默认编辑器是 vi，官方仓库里的 sudo 编译时开启了``--with-env-editor``，会采用环境变量 VISUAL 和 EDITOR 的设置。如果设置了 VISUAL 就不会使用 EDITOR。

如果要临时使用其他编辑器，在该命令前加上 EDITOR 环境变量即可,如要使用 vim 作为编辑器调用 visudo ：

```sh
# EDITOR=vim visudo
```

允许 wheel 用户组成员无密码使用 sudo：去掉 %wheel ALL=(ALL) NOPASSWD: ALL 前面的注释

```sh
%wheel ALL=(ALL) NOPASSWD: ALL
```

安装配置完sudo，使用普通用户登陆系统执行命令时就可以使用 sudo 来临时获取权限了。如果要切换到 root 用户可以使用 su 命令。默认配置时，su 将改用 root 用户登录 shell，而 sudo 会给单个命令临时的超级用户权限。

参考WIKi：

[Users and groups](https://wiki.archlinux.org/index.php/Users_and_groups)
