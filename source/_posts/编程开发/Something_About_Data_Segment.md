---
title: 空数据段引发的问题及思考
date: 2016-11-11 16:30:14
categories:
- 编程开发
keywords:
- 汇编语言
- 段重叠
tags:
- 汇编
thumbnail:
---

之前使用``Dosbox``环境编写汇编程序遇到的一个问题，经过摸索已基本搞清楚原因。

<!--more-->

## 问题引入

***

原题目很简单，就是将 00F~0FH 共 16 个数字写入内存 3000H 开始的连续 16 个存储单元，但是我当时很纳闷为什么要写在 3000H 开始的内存中，于是就直接写在 0000H 开始的内存单元中，而且为了省事把前一个代码的数据段、代码段定义部分直接搬过来，但是写完后发现数据段并没有用到，心想也没有什么影响，就没有管它，然后就出错了。

**代码如下：**

```
DATA 	SEGMENT

DATA 	ENDS
CODE 	SEGMENT
		ASSUME 	CS:CODE, DS:DATA
START:
		MOV AX,DATA
		MOV DS,AX
		MOV DI,0
		MOV CX,16
		MOV AL,0
CWRITE:
		MOV [DI],AL
		INC AL
		INC DI
		LOOP CWRITE
EXIT:
		MOV AH,4CH
		INT 21H
CODE 	ENDS
END 	START
```
## 问题发现
***
**出错结果：**

![errorview](https://raw.githubusercontent.com/Evandoz/blob/master/Assembly/DosBox001.png)

程序运行结束时 ``CX=0002``，也就是说循环 ``LOOP`` 提前退出，这很奇怪！！！

![errorview](https://raw.githubusercontent.com/Evandoz/blob/master/Assembly/DosBox002.png)

而且我们查看当前内存单元的内容发现，我们的数据并没有正确写入，最后两个数据是不正确的。

## 问题解析
***
为了搞清楚问题出在哪，接下来进行单步调试，来一步一步看程序是如何执行的，尤其看一下 ``CX=0002`` 时，程序究竟在干嘛！！！

![trackview](https://raw.githubusercontent.com/Evandoz/blob/master/Assembly/DosBox003.png)

单步执行开始，此时 ``CX=000F``，继续向下，中间部分都符合程序正常逻辑。

![trackview](https://raw.githubusercontent.com/Evandoz/blob/master/Assembly/DosBox004.png)

现在来到 ``CX=0002``，往下应该是继续执行循环体，**但是**，问题出现了！！！
1. 首先，冒出了一句程序中没有的代码 ``OR AX, 05FE``，并且发现``05FE`` 就是之前查看内存时，被错误写入的那两个数据；
2. 接着看一下这条指令在内存中的位置 ``076A:000D`` ，单步调试开始的时候，``076A:000D`` 中的指令是 ``MOV [DI], AL``。也就是说，当执行若干次循环到 ``CX=0002`` 的时候，该内存单元的内容被修改；
3. 最后来看这块连续内存(000D-000F)中存储的内容，此时这块内存中内容为 ``OD05FE``，而单步调试开始的时候，该连续内存中的内容是 ``8805``。

通过上述三点分析，已经不难发现，我们的程序在执行的后期被我们的数据修改了，数据从 ``0000`` 单元开始写入，当写到 ``000D`` 单元时，刚好碰到代码区，将原本的循环体内容覆盖，导致本该循环执行的指令出现差错，程序异常退出。
但是新的问题又出现了，数据段与代码段开始的地方为什么会离得这么近以至于出现如此近距离的冲突，我们做进一步探究...

## 深入探究
***
在程序开始时我们看一下数据段与代码段在内存中的位置

![errorview](https://raw.githubusercontent.com/Evandoz/blob/master/Assembly/DosBox005.png)

程序开始前，数据段 ``DS=075A``，代码段 ``CS=076A``，两者相差 ``100H``，即 256 个内存单元；然而当执行完装段操作(MOV DS, AX)后，数据段与代码段却变成一样的了(076A)，难怪会出现重叠。那么就是说我们定义的数据段和代码段是同一个位置开始的，那如果把数据段去掉结果会如何呢？

**代码如下：**

去掉 ``DATA 	SEGMENT`` 的定义

```
CODE 	SEGMENT
		ASSUME 	CS:CODE
START:
		MOV DI,0
		MOV CX,16
		MOV AL,0
		...
```
**结果展示：**

![rightview](https://raw.githubusercontent.com/Evandoz/blob/master/Assembly/DosBox006.png)

去掉数据段之后，结果是正确的，只是这时数据是写在 ``075A:0000`` 开始的位置了。难道我们定义了数据段就会出现这样的问题，那么当年 Intel 的工程师们也太弱了吧，居然会出现这么严重的 Bug，但接下来的探究证明 Intel 毕竟是 Intel，不然 8086 也不会成为一代经典之作。

## 进一步发现
***
在之前的代码中虽然定义了数据段，但是并没有在其中定义数据，也就是说我们定义了一个空数据段，那么现在我们在数据段中定义一个数据，虽然我们不用它。

**代码如下：**
```
DATA 	SEGMENT
		A DB 00H ;定义数字
DATA 	ENDS

CODE 	SEGMENT
		ASSUME 	CS:CODE, DS:DATA
START:
		MOV AX,DATA
		MOV DS,AX
		MOV DI,0
		MOV CX,16
		MOV AL,0
		...
```
**结果展示：**

![rightview](https://raw.githubusercontent.com/Evandoz/blob/master/Assembly/DosBox007.png)

加上 ``DATA 	SEGMENT`` 的定义，并且在其中定义变量之后，结果正确，那么看一下此时代码段与数据段的位置。

![rightview](https://raw.githubusercontent.com/Evandoz/blob/master/Assembly/DosBox008.png)

此时，数据段 ``DS=076A``，代码段 ``CS=076B``，并且装段前后皆如此，他们之间相差 ``10H``，即 16 个内存单元。这里我们只定义了一个字节型数据，系统默认为我们空出 16 个字节的，那么若是定义两个，三个会如何呢？
通过测试发现它是根据我们定义数据所占用内存单元的大小来为我们留出相应空间的，并且是以 16 个字节为一个单位，例如，当我们定义了 17 个字节型数据，它默认留出的空间是 32 个内存单元，当我们定义了 17 个字型数据，它默认留出的空间是 48 个内存单元，以此类推。

下面是定义了 17 个字节型数据的代码及演示结果。

**代码如下：**

```
DATA 	SEGMENT
		A DB 17 DUP(00H) ;定义数字
DATA 	ENDS

CODE 	SEGMENT
		ASSUME 	CS:CODE, DS:DATA
START:
		MOV AX,DATA
		MOV DS,AX
		MOV DI,0
		MOV CX,16
		MOV AL,0
		...
```
**结果展示：**

![rightview](https://raw.githubusercontent.com/Evandoz/blob/master/Assembly/DosBox009.png)

## 总结
***
血淋林的教训告诉我们没事别定义空数据段，然后把它晾在那，不然出现的问题会让人很意外！！！

以上便是本次编程经历的全部发现，如有问题或者类似的发现可一起交流探讨。
