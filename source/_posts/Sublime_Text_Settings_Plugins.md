---
title: Sublime Text 设置与常用插件
date: 2016-10-05 16:30:14
categories:
- 工具利器
keywords:
- Sublime Text
- Sublime设置
- Sublime插件
tags:
- Sublime
photos:
-
---

Sublime Text 由程序员 Jon Skinner 于2008年1月份开发出来的一款文本编辑器，功能强大，本文将分享使用 Sublime 的相关设置及常用插件。

<!--more-->

## Sublime Text

Sublime Text 只是一个代码编辑器，而不是集成开发环境（IDE）。

>Sublime Text 是一个跨平台的编辑器，同时支持Windows、Linux、Mac OS X等操作系统。

## Sublime 设置

Sublime Text 跟很多优秀的代码编辑器一样，并不是通过图形界面来进行设置的，而是根据一行行代码实现的。

以下为 Sublime Settings 的中文版详细内容

```
{
	// 设置文本区域颜色主题
	"color_scheme": "Packages/Color Scheme – Default/Monokai.tmTheme",
	// 设置字体和大小
	"font_face": "",
	"font_size": 10,
	// 有效选项有：no_bold不显示粗体字，no_italic不显示斜体字，no_antialias关闭反锯齿，gray_antialias开启反锯齿
	// subpixel_antialias和no_round是OS X系统独有的，gdi和directwrite是windows系统独有的
	"font_options": [],
	// 在文字上双击会全选当前的内容，如果里面出现以下字符，就会被截断
	"word_separators": "./\\()\"'-:,.;<>~!@#$%^&*|+=[]{}`~?",
	// 是否显示行号
	"line_numbers": true,
	// 是否显示行号边栏
	"gutter": true,
	// 行号边栏和文字的间距
	"margin": 4,
	// 是否显示代码折叠按钮
	"fold_buttons": true,
	// 除非鼠标悬停行号边栏，否则代码折叠按钮将隐藏
	"fade_fold_buttons": true,
	// 列显示垂直标尺，在中括号里填入数字，宽度按字符计算
	"rulers": [],
	// 是否打开拼写检查
	"spell_check": false,
	// Tab键制表符宽度
	"tab_size": 4,
	// 设为true时，缩进和遇到Tab键时使用空格替代
	"translate_tabs_to_spaces": false,
	// 否则作用于单个空格
	"use_tab_stops": true,
	 // false时禁止在载入的时候检测制表符和空格
	"detect_indentation": true,
	// 按回车时，自动与制表位对齐
	"auto_indent": true,
	//针对C语言的
	"smart_indent": true,
	// 需要启用auto_indent
	"indent_to_bracket": false,
	// 显示对齐的白线是否根据回车、tab等操作自动填补
	"trim_automatic_white_space": true,
	// 是否自动换行，如果选auto，需要加双引号
	"word_wrap": auto,
	// 设置窗口内文字区域的宽度
	"wrap_width": 0,
	// 防止被缩进到同一级的字换行
	"indent_subsequent_lines": true,
	// 如果没有定义过，则文件居中显示
	"draw_centered": false,
	// 自动匹配引号，括号等
	"auto_match_enabled": true,
	// 拼写检查的单词列表路径
	"dictionary": "Packages/Language – English/en_US.dic",
	"spelling_selector": "markup.raw, source string.quoted - punctuation - meta.preprocessor.c.include, source comment - source comment.block.preprocessor, -(source, constant, keyword, storage, support, variable, markup.underline.link, meta.tag)",
	// 代码地图的可视区域部分是否加上边框，边框的颜色可在配色方案上加入minimapBorder键
	"draw_minimap_border": false,
	// 是否一直显示代码地图框
	"always_show_minimap_viewport": false
	// 突出显示当前光标所在的行
	"highlight_line": false,
	// 设置光标闪动方式
	"caret_style": "smooth",
	// 设置光标的尺寸
	"caret_extra_top": 0,
    "caret_extra_bottom": 0,
    "caret_extra_width": 0,
	// 是否特殊显示当前光标所在的括号、代码头尾闭合标记
	"match_brackets": true,
	// 设为false时，只有光标在括号或头尾闭合标记的两端时，match_brackets才生效
	"match_brackets_content": true,
	// 是否突出显示圆括号，match_brackets为true生效
	"match_brackets_square": true,
	// 是否突出显示大括号，match_brackets为true生效
	"match_brackets_braces": true,
	// 是否突出显示尖括号，match_brackets为true生效
	"match_brackets_angle": false,
	// html和xml下突出显示光标所在标签的两端，影响HTML、XML、CSS等
	"match_tags": true,
	// 全文突出显示和当前选中字符相同的字符
	"match_selection": true,
	// 设置每一行到顶部，以像素为单位的间距，效果相当于行距
	"line_padding_top": 0,
	// 设置每一行到底部，以像素为单位的间距，效果相当于行距
	"line_padding_bottom": 0,
	// 设置为false时，滚动到文本的最下方时，没有缓冲区
	"scroll_past_end": true,
	// 控制向上或向下到第一行或最后一行时发生什么
	"move_to_limit_on_up_down": false,
	// 按space或tab时，实际会产生白色的点（一个空格一个点）或白色的横线（tab_size设置的制表符的宽度），选中状态下才能看到
	// 设置为none时，什么情况下都不显示这些点和线
	// 设置为selection时，只显示选中状态下的点和线
	// 设置为all时，则一直显示
	"draw_white_space": "selection",
	// 制表位的对齐白线是否显示，颜色可在主题文件里设置（guide，activeGuide，stackGuide）
	"draw_indent_guides": true,
	// 制表位的对齐白线，draw_normal为一直显示，draw_active为只显示当前光标所在的代码控制域
	"indent_guide_options": ["draw_normal"],
	// 为true时，保存文件时会删除每行结束后多余的空格
	"trim_trailing_white_space_on_save": false,
	// 为true时，保存文件时光标会在文件的最后向下换一行
	"ensure_newline_at_eof_on_save": false,
	// 切换到其它文件标签或点击其它非本软件区域，文件自动保存
	"save_on_focus_lost": false,
	"atomic_save": false,
	// 编码时不能自动检测编码时，将自动检测ASCII, UTF-8 和 UTF-16
	"fallback_encoding": "Western (Windows 1252)",
	// 默认编码格式
	"default_encoding": "UTF-8″,
	// 包含空字节的文件被打开默认为十六进制
	"enable_hexadecimal_encoding": true,
	// 每一行结束的时候用什么字符做终止符
	"default_line_ending": "system",
	// 通过写入备用文件，然后将其重命名为原始文件
	"show_definitions": true,
	// 设置为enabled时，在一个字符串间按Tab将插入一个制表符
	// 设置为true时，按Tab会根据前后环境进行代码自动匹配填补
	"tab_completion": true,
	// 代码提示
	"auto_complete": true,
	// 代码提示的大小限制
	"auto_complete_size_limit": 4194304,
	// 代码提示延迟显示
	"auto_complete_delay": 50,
	"auto_complete_selector": "meta.tag - punctuation.definition.tag.begin, source - comment - string.quoted.double.block - string.quoted.single.block - string.unquoted.heredoc",
	// 触发代码提示的其他情况
	"auto_complete_triggers": [ {"selector": "text.html", "characters": "<"} ],
	// 设false时，选择提示的代码按enter或点击可以自动补全，设true时将自动直接换行，功能由tab键替换
	"auto_complete_commit_on_tab": false,
	// 控制是否在代码段处于活动状态时自动完成
	// 仅当auto_complete_commit_on_tab为true有效。
	"auto_complete_with_fields": false,
	// 控制当选择自动完成窗口中第一个元素时会发成什么：设false时，窗口将隐藏，否则将选中最后一个元素
	"auto_complete_cycle": false,
	// 当输入</时，自动闭合HTML或XML标签
	"auto_close_tags": true,
	// 设置为false，使用Shift + tab总是插入制表符
	"shift_tab_unindent": false,
	// 设true时，在当前行，复制和剪切命令会分开
	"copy_with_empty_selection": true,
	// 选中的文本按Ctrl + f时，自动复制到查找面板的文本框里
	"find_selected_text": true,
	// 设true时，选中多行文本后，"Find in Selection"标志将自动启用
	"auto_find_in_selection": false,
	// 设true时，点击所选文本将开始拖放操作，Linux下不可用
	"drag_text": true,
	// 主题
	"theme": "Default.sublime-theme",
	// 滚动的速度
	"scroll_speed": 1.0,
	// 左边边栏文件夹动画
	"tree_animation_enabled": true,
	// 控制应用程序的动画
	"animation_enabled": true,
	// 高亮修改过的选项卡
	"highlight_modified_tabs": false,
	// 标签页的关闭按钮
	"show_tab_close_buttons": true,
	// 加粗侧边栏文件标签
	"bold_folder_labels": false,
	// 针对OS X
	"use_simple_full_screen": false,
	// 针对OS X
	"gpu_window_buffer": "auto",
	// 水平垂直滚动条：system和disabled为默认显示方式，enabled为自动隐藏显示
	"overlay_scroll_bars": "system",
	// 允许选项卡左右滚动
	"enable_tab_scrolling": true,
	// 状态栏显示文件编码
	"show_encoding": false,
	// 状态栏显示行结束
	"show_line_endings": false,
	// 热推出功能！退出时不会提示是否保存文件，而是直接退出
	// 下次打开软件时，文件保持退出前的状态，没来得及保存的内容都在，但并没有真实的写在原文件里
	"hot_exit": true,
	// 全屏模式退出时，下次将以全屏模式启动
	"remember_full_screen": false,
	// 重载文件前始终提示，即使文件未被修改。
	// 默认情况下，文件尚未编辑将自动重载，如果尚未保存修改将始终显示提示。
	"always_prompt_for_file_reload": false,
	// 针对OS X
	"open_files_in_new_window": true,
	// 针对OS X
	"create_window_at_startup": true,
	// 设true时，一但最后一个文件关闭将关闭程序窗口，除非窗口中打开了文件夹。
	"close_windows_when_empty": false,
	// 标题栏显示完整路径
	"show_full_path": true,
	// 显示构建结果面板，设false时，则通过"Tools/Build Results"菜单显示
	"show_panel_on_build": true,
	// 在发生错误的行下显示构建错误
	"show_errors_inline": true,
	// 单机侧边栏文件可预览，双击或编辑预览将打开文件分配选项卡
	"preview_on_click": true,
	// 哪些文件会被显示到侧边栏文件夹中
	"folder_exclude_patterns": [".svn", ".git", ".hg", "CVS"],
	"file_exclude_patterns": ["*.pyc", "*.pyo", "*.exe", "*.dll", "*.obj","*.o", "*.a", "*.lib", "*.so", "*.dylib", "*.ncb", "*.sdf", "*.suo", "*.pdb", "*.idb", ".DS_Store", "*.class", "*.psd", "*.db", "*.sublime-workspace"],
	// 以下二进制文件仍将显示在侧边栏中，但不会包含在Goto/Goto Anything或Find in Files中
	"binary_file_patterns": ["*.jpg", "*.jpeg", "*.png", "*.gif", "*.ttf", "*.tga", "*.dds", "*.ico", "*.eot", "*.pdf", "*.swf", "*.jar", "*.zip"],
	// 文件索引
	"index_files": true,
	// 设置用于索引的编码线程。
	// 值为0将使Sublime 基于数量猜测，使用index_files将禁用所有工作
	"index_workers": 0,
	// 指示哪些文件不用索引
	"index_exclude_patterns": ["*.log"],
	// 删除你想要忽略的插件，需要重启, 去掉Vinage开启vim模式
	"ignored_packages": ["Vintage"]
}
```

在编写自己的配置文件时，只需要设置不同的部分即可，避免重复。

**注意**：每行最后用逗号分隔，处最后一行外都不可少，否则会弹出提示，无法保存。

## Sublime 插件

1.Boxy Theme

一款为Sublime Text 3 3103以上版本开发的主题，该主题使用``A File Icon``图标库，所以要想更完整的使用该主题，可以安装该图标插件。插件详情可访问 [Package Control](https://packagecontrol.io/packages/Boxy%20Theme) 官网

2.SideBarEnhancements

侧边栏增强插件，能给侧边栏增加很多选项。插件详情可访问 [Package Control](https://packagecontrol.io/packages/SideBarEnhancements) 官网，或者 [SideBarEnhancements](https://github.com/titoBouzout/SideBarEnhancements/tree/st3) 开源库。

3.SyncedSidebarBg

这是用来使侧边栏与主面板颜色主题同步的插件，如果安装了其他的颜色主题便可不比在使用该插件。

4.Emmet

前身为 ``Zen Coding``，是个能大幅提高开发效率的工具，主要快捷键：``Tab``用于标签自动补全。完整的快捷方式可访问 [Emmet 快捷方式查询](http://emmet.evget.com/)

5.CSScomb

CSScomb 是一个超级爽的前端css属性排序工具，用来规则CSS。另外，可以去官网定制自己喜欢的 CSS 样式规则，详情访问[CSScomb在线配置参数](http://csscomb.com/config)。

**提醒**：使用 CSScomb 需要 ``node.js`` 的支持，同时要在 CSScomb 中设置 node.js 路径，它默认只有 linux 下的路径，没有 Windows 的，可以参考以下格式：

```
"node-path" : "D:\\Nodejs\\node_modules\\npm\\bin",
```

6.DocBlockr

用来生成注释的插件，定义一个函数f(a,b){}，然后在它前面输入

```
/**
```

然后 ``Tab`` 一下，就能生成：

```
/**
 * [fun description]
 * @param  a [description]
 * @param  b [description]
 * @return   [description]
 */
int fun(int a, int b)
{

}
```

如果不想生成那么多内容，可以只输入

```
/*
```

然后生成如下内容：

```
/*

 */
int fun(int a, int b)
{

}
```

7.SublimeTmpl

文件模板插件，帮助我们生成相应的模板，提高效率，目前支持 ``html/js/css/php/python/ruby`` ，快捷方式：

```
Ctrl+Alt+H html
Ctrl+Alt+J javascript
Ctrl+Alt+C css
Ctrl+Alt+P php
Ctrl+Alt+R ruby
Ctrl+Alt+Shift+P python
```

详情可访问 [Kairyou's Blog](http://www.fantxi.com/blog/archives/sublime-template-engine-sublimetmpl/) 或 [SublimeTmpl](https://github.com/kairyou/SublimeTmpl)

8.ConvertToUTF8

让 Sublime 支持 Unicode 编码，防止出现中文乱码。

9.HTML/CSS/JS Prettify

HTML/CSS/JS 代码格式化插件，快捷方式：

```
Ctrl+Shift+H
```

10.Anaconda

Python 开发的小伙伴都知道，由于该插件使用``PEP8``编码规范，每行长度不超过80，所以代码中会出现很多白框，这个可以在插件配置中关掉。

```
"anaconda_linting": false,
```

11.NASM x86 Assembly

Assembly插件，用于编写汇编(x86架构)程序。

12.OminiMarkupPreviewer

``Markdown`` 文件预览插件，主要快捷方式：

```
Ctrl+Alt+O
```

## 参考资料

- [CSScomb的安装和参数配置以及消除空行](https://segmentfault.com/a/1190000004577644)
- [sublime text 3 插件：DocBlockr与javascript注释规范](http://frontenddev.org/article/sublime-does-text-3-plug-in-docblockr-with-javascript-comments-specification.html)