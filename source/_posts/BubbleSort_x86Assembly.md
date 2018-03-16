---
title: 汇编语言实现冒泡排序
date: 2016-10-28 15:30:10
categories:
- 汇编编程
keywords:
- 冒泡排序
- 汇编编程
tags:
- 汇编
- 冒泡排序
photos:
-
---

回顾最近所学知识，用汇编语言实现冒泡排序。

<!--more-->

## 题目要求

***

数据区存放一组数据，要求采用冒泡法对数据区的数据按递增排序，并且从最后一位开始向前比较，排序完成后把数据按排序后的递增顺序放回。

## 设计思路

***

冒泡排序在高级语言中同时要使用双重循环，这里也不例外。因此一层一层的来。

先实现**内层循环**，即一个一个相邻的数进行比较，该调换顺序的调换顺序，不用调换的直接进行下一位比较，具体看代码中**SORT..LOOP**部分。

再实现**外层循环**，根据冒泡排序，每进行一次内层循环，就会有一个最小的数到达它该到达的位置，这样一来下一趟排序循环的次数就减一，于是在外层循环中我们就控制内层循环的次数**(CX)**，内层循环进行一次退出后，在外层循环将循环次数减一**(DEC CX)**再让其进入循环，直到循环次数为 0 **(CMP CX, 0)**退出。另外还有一个要保存的是每次循环开始的位置**(PUSH SI)**。

## 参考代码

***

```
DATA 	SEGMENT
		ORG	3000H
		COUNT EQU 6
		STR DB 12H, 78H, 62H, 50H, 22H, 33H
DATA	ENDS
CODE	SEGMENT
		ASSUME DS:DATA, CS:CODE
START:
		MOV AX, DATA
		MOV DS, AX		;装载段地址
		MOV SI, OFFSET STR	;偏移地址
		ADD SI, COUNT
		DEC SI		;跳到最后一个位置，这里是实验题目要求，不要奇怪博主为何从后往前比较
		MOV CX, COUNT

W:					;外层循环开始
		PUSH CX		;保存一趟排序要比较的次数，即循环次数，下一趟排序时减一
		PUSH SI		;保存一趟排序开始的位置，需要保持不变

SORT:				;内层循环开始，一趟排序开始
		MOV BL, [SI]
		CMP BL, [SI-1] 		;当前位置与其下一个位置比较
		JB  A
		JMP B

	A:
		XCHG BL, [SI-1] 	;当前位置比下一位小，交换
		MOV  [SI], BL

	B:
		DEC  SI
		LOOP SORT	;内层循环结束，一趟排序结束

		POP SI		;恢复排序开始位置
		POP CX
		DEC CX		;下一趟循环，比较次数减一
		CMP CX, 0	;CX大于0，说明还需要继续冒泡
		JA  W
		JMP EXIT	;外层循环结束

EXIT:
		MOV AH, 4CH
		INT 21H		;返回系统

CODE	ENDS
		END 	START
```