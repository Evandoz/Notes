---
title: Sublime Text 3 配置文件的中文释义
date: 2016-10-05 16:30:14
categories:
- 工具利器
keywords:
- Sublime Text
- Sublime设置
tags:
- Sublime
photos:
-
---

Sublime Text 由程序员 Jon Skinner 于2008年1月份开发出来的一款文本编辑器，本文将展示Preference.sublime-settings文件中各项设置的中文释义，所用Sublime Txet 3版本为Build 3143。

<!--more-->

## Sublime Text介绍

Sublime Text 只是一个代码编辑器，而不是集成开发环境（IDE）。

>Sublime Text 是一个跨平台的编辑器，同时支持Windows、Linux、Mac OS X等操作系统。

## Sublime Text设置中文释义

Sublime Text 跟很多优秀的代码编辑器一样，并不是通过图形界面来进行设置的，而是根据一行行代码实现的。

以下为 Sublime Settings 的中文版，其内容由本人手动翻译，部分内容参考网上已有解释，如有问题请及时指正。

```
{
	// 设置文本区域颜色主题
	"color_scheme": "Packages/Color Scheme – Default/Monokai.tmTheme",
	// 注意字体和大小的设置会被平台上的特定的设置文件所覆盖，因此在此处设置字体没有效果，你需要在你自己的用户设置中设置字体
	"font_face": "",
	"font_size": 10,
	// 有效选项有：no_bold不显示粗体字，no_italic不显示斜体字，no_antialias关闭反锯齿，gray_antialias开启反锯齿
	// subpixel_antialias亚像素抗锯齿，no_round是OS X系统独有的，gdi和directwrite是windows系统独有的
	"font_options": [],
	// 主题文本的字体。有效选项有： no_antialias关闭反锯齿，
  // gray_antialias开启反锯齿, subpixel_antialias亚像素抗锯齿，gdi和directwrite是windows系统独有的
  "theme_font_options": [],
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
	// 如果translate_tabs_to_spaces为true,use_tab_stops会使制表符和空格插入/删除到下一个焦点上
	"use_tab_stops": true,
	// false时禁止在载入的时候检测制表符和空格
	"detect_indentation": true,
	// 按回车时，自动与制表位对齐
	"auto_indent": true,
	//自动缩进，例如C语言中，在一条if语句后缩进下一行，但要求auto_indent为true
	"smart_indent": true,
	// 缩进时在第一个开括号前加一个空格，要求auto_indent为true
	"indent_to_bracket": false,
	// 显示对齐的白线是否根据回车、tab等操作自动填补
	"trim_automatic_white_space": true,
	// 是否自动换行，如果选auto，需要加双引号
	"word_wrap": "auto",
	// 设置非0数字将文本限制在所设的宽度中，而非占据整个窗口空间
	"wrap_width": 0,
	// 设为false防止文本被缩进到同一行
	"indent_subsequent_lines": true,
	// 使文件居中显示，而非向左对齐
	"draw_centered": false,
	// 自动匹配引号，括号等
	"auto_match_enabled": true,
	// 设置拼写检查的单词列表
	"dictionary": "Packages/Language – English/en_US.dic",
	//设置检查拼写错误的范围
	"spelling_selector": "markup.raw, source string.quoted - punctuation - meta.preprocessor.c.include, source comment - source comment.block.preprocessor, -(source, constant, keyword, storage, support, variable, markup.underline.link, meta.tag)",
	// 设为true可以在代码地图的可视区域部分加上边框，边框的颜色取决于配色主题中的minimapBorder
	"draw_minimap_border": false,
	// 总是显示代码地图框还是在鼠标停留时显示
	"always_show_minimap_viewport": false
	// 突出显示当前光标所在的行
	"highlight_line": false,
	// 设置光标闪动方式，有效选像项有smooth，phase，blink，solid
	"caret_style": "smooth",
	// 设置光标的尺寸
	"caret_extra_top": 0,
  "caret_extra_bottom": 0,
  "caret_extra_width": 0,
	// 设为false将禁止在当前光标所在的括号或头尾闭合标记下添加下划线
	"match_brackets": true,
	// 设为false将仅仅高亮显示光标所在的括号或头尾闭合标记
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
	// 设置每一行顶部，以像素为单位的额外空间，效果相当于行距
	"line_padding_top": 0,
	// 设置每一行底部，以像素为单位的额外空间，效果相当于行距
	"line_padding_bottom": 0,
	// 设置为false时，滚动到文本的最下方时，没有缓冲区
	// 在OS X上会被特定的设置文件所覆盖，因此你需要在你自己的用户设置中填写该条来覆盖它
	"scroll_past_end": true,
	// 控制向上或向下到第一行或最后一行时发生什么
	// 在OS X上会被特定的设置文件所覆盖，因此你需要在你自己的用户设置中填写该条来覆盖它
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
	// 为true时，保存文件时光标会在文件的最后增加一空白行
	"ensure_newline_at_eof_on_save": false,
	// 切换到其它文件标签或点击其它非本软件区域，文件自动保存
	"save_on_focus_lost": false,
	// 通过写入备用文件，然后将其重命名为原始文件
	"atomic_save": false,
	// 无法确定编码时所用的编码，ASCII, UTF-8 和 UTF-16将自动检测
	"fallback_encoding": "Western (Windows 1252)",
	// 保存一个新文件，以及打开一个未定义编码的文件使用的默认编码格式
	// 如果一个文件以某种特定的编码格式打开该设置将被忽略，并且该文件会以其打开时的编码格式保存
	"default_encoding": "UTF-8″,
	// 包含空字节的文件被默认打开为十六进制
	"enable_hexadecimal_encoding": true,
	// 每一行结束的时候用什么字符做终止符
	// 有效选项有system(任意OS可使用)，windows(CRLF)，unix(LF)
	"default_line_ending": "system",
	// 设为true时，鼠标悬停单词上时会弹出其定义的位置
	"show_definitions": true,
	// 设为true时，Tab会根据代码环境进行最佳补全，Shift+Tab会插入一个明确的标签
	// 设为false时，Tab仅仅会触发片段或插入一个制表符
	"tab_completion": true,
	// 自动提示补全
	"auto_complete": true,
	// 代码提示的大小限制
	"auto_complete_size_limit": 4194304,
	// 代码提示延迟显示，单位ms
	"auto_complete_delay": 50,
	// 控制自动补全的范围
	"auto_complete_selector": "meta.tag - punctuation.definition.tag.begin, source - comment - string.quoted.double.block - string.quoted.single.block - string.unquoted.heredoc",
	// 触发代码提示的其他情况
	"auto_complete_triggers": [ {"selector": "text.html", "characters": "<"} ],
	// 默认情况下，选择提示的代码按enter或点击可以自动补全，设true时使用Tab键替换其功能
	// 使用Tab自动补全是更好的选择，因为它避免了回车时自动补全和插入新行的不确定性
	"auto_complete_commit_on_tab": false,
	// 控制是否在代码段处于活动状态时自动完成
	// 仅当auto_complete_commit_on_tab为true有效。
	"auto_complete_with_fields": false,
	// 当自动补全窗口中第一个元素被选中时按up键会发生什么：设为false，窗口将隐藏，否则将选中最后一个元素
	// 最后一个元素被选中同样对down成立
	"auto_complete_cycle": false,
	// 当输入</时，自动闭合HTML或XML标签
	"auto_close_tags": true,
	// 默认情况下，选中多行，使用Shift + tab仅仅取消缩进
	// 在其他情况下，使用Shift + tab将会插入制表符--但要求tab_completion为true
	// 设为true时，使用Shift + tab总是取消缩进，而非插入制表符
	"shift_tab_unindent": false,
	// 设true时，在当前行，复制和剪切命令会分开
	"copy_with_empty_selection": true,
	// 设为true,选中的文本在按Ctrl + f时将自动复制到查找面板的文本框里
	// 在OS X上会被特定的设置文件所覆盖，因此你需要在你自己的用户设置中填写该条来覆盖它
	"find_selected_text": true,
	// 设true时，选中多行文本后，"Find in Selection"标志将自动启用
	"auto_find_in_selection": false,
	// 设true时，点击所选文本将开始拖放操作，Linux下不可用
	"drag_text": true,

  // 用户界面设置

	// 主题
	"theme": "Default.sublime-theme",
	// 设为0将禁用光滑滚动，设在0-1之间会缓慢滚动，设为大于1将快速滚动
	"scroll_speed": 1.0,
	// 左边边栏文件夹展开或关闭动画
	"tree_animation_enabled": true,
	// 控制整个应用程序的动画
	"animation_enabled": true,
	// 高亮修改过的选项卡
	"highlight_modified_tabs": false,
	// 标签页的关闭按钮
	"show_tab_close_buttons": true,
	// 加粗侧边栏文件标签
	"bold_folder_labels": false,
	// 使用自适应主题时，在UI部分之间绘制分隔线
	"adaptive_dividers": true,
	// 针对OS X。有效值有true，false，"auto"。
	// 设为auto，在2560像素以上（包括）的屏幕上将启用该设置
	// 设为true，将使用OpenGL加速。需要重启Sublime Text生效
	"gpu_window_buffer": "auto",
	// 垂直滚动条：system和disabled为默认显示方式，enabled为自动隐藏显示
	"overlay_scroll_bars": "system",
	// 允许选项卡左右滚动
	"enable_tab_scrolling": true,
	// 状态栏显示文件编码
	"show_encoding": false,
	// 状态栏显示行结束
	"show_line_endings": false,

  // 应用程序动作设置

  // 热推出功能！退出时不会提示是否保存文件，而是直接退出
	// 下次打开软件时，文件保持退出前的状态，没来得及保存的内容都在，但并没有真实的写在原文件里
	"hot_exit": true,
	// 全屏模式退出时，下次将以全屏模式启动，设为false时将不会以全屏模式启动
	"remember_full_screen": false,
	// 针对OS X：是否调用用户默认的shell来获取用户自定义变量，或许是个布尔量，也或许是要调用shell的路径
	// 需要重启Sublime Text生效
  "shell_environment": true,
  // 重载文件前始终提示，即使文件未被修改。
	// 默认情况下，文件尚未编辑将自动重载，如果尚未保存修改将始终显示提示。
	"always_prompt_for_file_reload": false,
	// 针对OS X：当从finder中打开文件或者拖拽图标打开文件时，控制是否在新的窗口中打开
	"open_files_in_new_window": true,
	// 针对OS X：控制在启动时是否创建空窗口
	"create_window_at_startup": true,
	// 针对OS X：在Touch Bar中显示最近文件
	"show_navigation_bar": true,
	// 设true时，一旦最后一个文件关闭将关闭程序窗口，除非窗口中打开了文件夹。
	// 在OS X上会被特定的设置文件所覆盖，因此你需要在你自己的用户设置中填写该条来覆盖它
	"close_windows_when_empty": false,
	// 标题栏显示完整路径
	// 在OS X上会被特定的设置文件所覆盖，因此你需要在你自己的用户设置中填写该条来覆盖它
	"show_full_path": true,
	// 显示构建结果面板，设false时，则通过"Tools/Build Results"菜单显示
	"show_panel_on_build": true,
	// 在发生错误的行下显示构建错误
	"show_errors_inline": true,
	// 单机侧边栏文件可预览，双击或编辑预览将打开文件并为其分配选项卡
	"preview_on_click": true,
	// 哪些文件会被显示到侧边栏文件夹中
	"folder_exclude_patterns": [".svn", ".git", ".hg", "CVS"],
	"file_exclude_patterns": ["*.pyc", "*.pyo", "*.exe", "*.dll", "*.obj","*.o", "*.a", "*.lib", "*.so", "*.dylib", "*.ncb", "*.sdf", "*.suo", "*.pdb", "*.idb", ".DS_Store", "*.class", "*.psd", "*.db", "*.sublime-workspace"],
	// 以下二进制文件仍将显示在侧边栏中，但不会包含在Goto/Goto Anything或Find in Files中
	"binary_file_patterns": ["*.jpg", "*.jpeg", "*.png", "*.gif", "*.ttf", "*.tga", "*.dds", "*.ico", "*.eot", "*.pdf", "*.swf", "*.jar", "*.zip"],
	// 文件索引
	"index_files": true,
	// 设置用于索引的编码线程。
	// 值为0将使Sublime基于数量猜测，使用index_files将禁用所有工作
	"index_workers": 0,
	// 指示哪些文件不用索引
	"index_exclude_patterns": ["*.log"],
	// 删除你想要忽略的插件，需要重启, 去掉Vinage开启vim模式
	"ignored_packages": ["Vintage"]
}
```

在编写自己的配置文件时，只需要设置不同的部分即可，避免重复。

**注意**：每行最后用逗号分隔，处最后一行外都不可少，否则会弹出提示，无法保存。
