---
title: 汇编语言实现进制转换
date: 2016-11-05 13:30:35
categories:
- 汇编编程
keywords:
- 十到十六的进制转换
- 汇编编程
tags:
- 汇编
photos:
---

8086 汇编是一种经典的底层语言，本文将结合代码简单介绍使用汇编语言来实现子程序的设计，以十六进制显示输出寄存器中二进制内容。

<!--more-->

## 题目要求

编制一个过程把AL寄存器内的二进制数用十六进制的形式在屏幕上显示出来。

## 设计思路

我们知道计算机里存储的是二进制，但显示的时候是通过转换成ASCII码显示出来的，所以我们要做的就是把这些二进制数每四位一组转换成对应数字的ASCII码值并将其赋值给DL，调用21H中断将其显示输出即可。具体的转换过程可以参考代码注释部分。

## 参考代码

```
DATA	SEGMENT
		COUNT  EQU  5
		ARRAY  DB  12H, 34H, 24H, 86H, 47H
DATA	ENDS
CODE	SEGMENT
		ASSUME CS:CODE
START:
		MOV  AX, DATA
		MOV  DS, AX
		MOV  BX, OFFSET ARRAY
		MOV  CX, COUNT
DISPLP:
		MOV  AL, [BX]
		CALL ALDISP
		MOV  AL, ',';逗号分隔，不过输出结果很让人意外
		MOV  AH, 02H
		INT  21H
		INC  BX
		LOOP DISPLP
EXIT:
		MOV  AH, 4CH
		INT  21H

ALDISP	PROC		;实现AL内容的显示
		PUSH AX
		PUSH CX
		PUSH DX		;子程序使用到的寄存器压栈以保护
		PUSH AX		;暂存AX，稍后转换低四位

		MOV  DL, AL ;转换AL高四位
		MOV  CL, 4	;(CL)=4(0000HHHH)
		SHR  DL, CL	;(0-9)(30H-39H)(A-F)(41H-46H)
		OR   DL, 30H;(0000HHHH)(00110000)高四位变成3
		CMP  DL, 39H
		JBE  ALDISP1;显示数字(0-9)
		ADD  DL, 7	;显示数字(A-F)
ALDISP1:
		MOV  AH, 02H
		INT  21H
		POP  DX		;恢复AX保存到DX

		AND  DL, 0FH;转换AL低四位(HHHHLLLL)(00001111)
		OR   DL, 30H;(0000LLLL)(00110000)高四位变成3
		CMP  DL, 39H
		JBE  ALDISP2
		ADD  DL, 7
ALDISP2:
		MOV  AH, 02H
		INT  21H
		POP  DX
		POP  CX
		POP  AX
		RET
ALDISP	ENDP

CODE	ENDS
		END 	START
```

## 运行结果

![result](https://raw.githubusercontent.com/Evandoz/blob/master/Assembly/exchange.png)

**说明**：代码中本来想用逗号分割的，结果输出的不知道是什么鬼，不过不影响功能的实现。
