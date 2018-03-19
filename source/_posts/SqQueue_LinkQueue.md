---
title: 顺序队列与链队列的实现
date: 2016-08-15 10:08:14
categories:
- 数据结构
keywords:
- 数据结构
- 队列
tags:
- 队列
photos:
-
---

队列是一种基本的数据结构，可以认为是线性表的变种，但它又有自己的独特之处，本文将结合代码简单介绍两种队列的实现方式。

<!--more-->

## 队列的定义

与栈相反，队列(queue)是一种**先进先出**(first in first out,缩写为FIFO)的线性表。这和我们日常生活中的排队是一致的，最早进入队列的元素最早离开。在队列中，允许插入的一端叫做**队尾**(rear)，允许删除的一端叫做**队头**(front)。

## 抽象数据类型定义

ADT Queue{
	数据对象：D={ai|ai∈ElemSet, i=1,2, …,n, n≥0}
	数据关系：R1={&lt;ai-1,ai&gt;|ai-1,ai∈D, i=1,2, …,n }
	约定a1为队列头，an为队列尾。
}

## 代码实现

### 顺序队列(SqQueue)

```c
#include <stdio.h>
#include <stdlib.h>

#define MAXQSIZE 100 //队列最大长度

#define OK 1
#define ERROR 0

typedef int QElemType;
typedef int Status;

//顺序队列定义
typedef struct
{
	QElemType *base;
	int front;
	int rear;
}SqQueue;

//初始化
Status InitQueue(SqQueue *Q)
{
	Q->base = (QElemType *)malloc(MAXQSIZE * sizeof(QElemType));
	if (!Q->base) return ERROR;
	Q->front = Q->rear = 0;
	return OK;
}

int Length(SqQueue *Q)
{
	return (Q->rear - Q->front + MAXQSIZE) % MAXQSIZE;
}

//队满
Status QueueFull(SqQueue *Q)
{
	if ((Q->rear + 1) % MAXQSIZE == Q->front)
		return OK;
	return ERROR;
}

//队空
Status QueueEmpty(SqQueue *Q)
{
	if (Q->front == Q->rear)
		return OK;
	return ERROR;
}

//入队
Status EnQueue(SqQueue *Q, QElemType e)
{
	if (QueueFull(Q))
		return ERROR;
	Q->base[Q->rear] = e;
	Q->rear = (Q->rear + 1) % MAXQSIZE;
	return OK;
}

//出队
Status DeQueue(SqQueue *Q, QElemType *e)
{
	if (QueueEmpty(Q))
		return ERROR;
	(*e) = Q->base[Q->front];
	Q->front = (Q->front + 1) % MAXQSIZE;
	return OK;
}

//遍历
Status Traverse(SqQueue *Q)
{
	int i = 0;
	while (i < Length(Q))
	{
		printf("%d ", Q->base[i]);
		i++;
	}
	printf("\n");
	return OK;
}
```

完整代码可参见：[GitHub](https://github.com/Laueray/Data-Structure/blob/master/3.Queue/SqQueue.c)

![queue](http://floretten-1252347631.costj.myqcloud.com/Queue/SqQueue.jpg)


### 链队列(LinkQueue)

```c
#include <stdio.h>
#include <stdlib.h>

#define OK 1
#define ERROR 0

typedef int QElemType;
typedef int Status;

//节点定义
typedef struct QNode
{
	QElemType data;
	struct QNode *next;
}QNode, *QueuePtr;

//链队列定义
typedef struct
{
	QueuePtr front;
	QueuePtr rear;
	int length;
}LinkQueue;

//初始化
Status InitQueue(LinkQueue *Q)
{
	Q->front = Q->rear = (QueuePtr)malloc(sizeof(QNode));
	if (!Q->front) return ERROR;
	Q->front->next = NULL;
	Q->length = 0;
	return OK;
}

//入队
Status EnQueue(LinkQueue *Q, QElemType e)
{
	QueuePtr p;
	p = (QueuePtr)malloc(sizeof(QNode));
	if (!p) return ERROR;
	p->data = e;
	p->next = NULL;
	Q->rear->next = p;
	Q->rear = p;
	Q->length++;
	return OK;
}

//队空
Status QueueEmpty(LinkQueue *Q)
{
	if (Q->front == Q->rear) return OK;
	return ERROR;
}

//出队
Status DeQueue(LinkQueue *Q, QElemType *e)
{
	QueuePtr p;
	if (QueueEmpty(Q)) return ERROR;
	p = Q->front->next;
	*e = p->data;
	Q->front->next = p->next;
	if (p == Q->rear) Q->front = Q->rear;
	free(p);
	Q->length--;
	return OK;
}

//销毁
Status Destroy(LinkQueue *Q)
{
	while (Q->front)
	{
		Q->rear = Q->front->next;
		free(Q->front);
		Q->front = Q->rear;
	}
	return OK;
}

//遍历
Status Traverse(LinkQueue *Q)
{
	QueuePtr p;
	p = Q->front->next;
	while (p)
	{
		printf("%d ", p->data);
		p = p->next;
	}
	printf("\n");
	return OK;
}
```

![LinkQueue](http://floretten-1252347631.costj.myqcloud.com/Queue/LinkQueue.png)

完整代码可参见：[GitHub](https://github.com/Laueray/Data-Structure/blob/master/3.Queue/LinkQueue.c)

 **DONE！**

所示代码如有错误请多加指正，谢谢
