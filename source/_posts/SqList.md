---
title: 顺序表的实现与操作
date: 2016-07-02 12:08:14
categories:
- 数据结构
keywords:
- 数据结构
- 顺序表
tags:
- 顺序表
photos:
-
---

整理数据结构代码，回顾顺序表的实现方法

<!--more-->

## 认识线性表

线性表(Linear_list)是最常用且最简单的一种数据结构。简言之，一个线性表就是n个数据元素的有限序列。线性表根据存储方式可分为顺序表和链表，本文将实现顺序表(Sqlist)的相关操作，链表将在以后实现。

## 代码实现

***

```c
#include <stdio.h>
#include <stdlib.h>

#define MAXSIZE 10
#define INCREMENT 10

#define OK 1
#define ERROR 0

 typedef int Status;
 typedef int ElemType;

 typedef struct
 {
 	ElemType *data; //节点数据
 	int length; //顺序表长度
 	int size; //顺序表大小
 }SqList;

//初始化
Status InitList(SqList *L)
{
	L->data = (ElemType *)malloc(MAXSIZE*sizeof(ElemType));
	if(!L->data) return ERROR;
	L->length = 0;
	L->size = MAXSIZE;
	return OK;
}

//清空
Status Clear(SqList *L)
{
	if(!L->data) return ERROR;
	L->length = 0;
	return OK;
}

//销毁
 Status Destroy(SqList *L)
 {
 	if(L->data)
 	{
 		free(L->data);
 		L = NULL;
 		return OK;
 	}
 	return ERROR;
 }

//根据位置返回元素
Status GetElem(SqList *L,int pos,ElemType* e)
{
	if(pos<1||pos>L->length) return ERROR;
	(*e) = L->data[pos-1];
	return OK;
}

//根据元素返回位置
Status GetPos(SqList *L,ElemType e,int* pos)
{
	int i = 0;
	if(!L->data) return ERROR;
	while(i < L->length)
	{
		if(e == L->data[i])
		{
			(*pos) = i+1;
			return OK;
		}
		i++;
	}
	(*pos) = -1;
	return ERROR;
}

//表空
Status ListEmpty(SqList *L)
{
	return L->length == 0?1:0;
}

//根据位置插入元素
Status Insert(SqList *L,int pos,ElemType e)
{
	ElemType* newBase;
	int i = 0;
	if(pos < 1||pos > L->length+1)
		return ERROR;
	if(L->length >= L->size)
	{
		newBase = (ElemType *)realloc(L->data,(L->size+INCREMENT)*sizeof(ElemType));
		L->data = newBase;
		L->size+=INCREMENT;
	}
	for(i=L->length-1;i>=pos-1;i--)
		L->data[i+1] = L->data[i]; //后移
	L->data[pos-1] = e;
	L->length++;
	return OK;
}

//创建
Status Create(SqList *L,int n)
{
    ElemType e;
	int i = 0;
	while(i < n)
	{
	    scanf("%d",&e);
		Insert(L,i+1,e);
		i++;
	}
	return OK;
}

//根据位置删除元素
Status DeleteAccordToPos(SqList *L,int pos,ElemType* e)
{
	int i = 0;
	if(!L->data) return ERROR;
	if(pos < 1||pos > L->length)
		return ERROR;
	(*e) = L->data[pos-1];
	for(i = pos-1;i < L->length;++i)
		L->data[i] = L->data[i+1];
	L->length--;
	return OK;
}

//根据值删除元素
Status DeleteAccordToElem(SqList *L,ElemType e,int* pos)
{
    int i = 0;
	if(!L->data) return ERROR;
	while(i < L->length)
	{
		if(e == L->data[i])
		{
			(*pos) = i+1;
			while(i < L->length)
            {
                L->data[i] = L->data[i+1];
                i++;
            }
            L->length--;
			return OK;
		}
		i++;
	}
	(*pos) = -1;
	return ERROR;
}

// 合并
/*Status Merge(SqList *L_1,SqList L_2,SqList L)
{

}*/

//遍历
Status Traverse(SqList *L)
{
	int i = 0;
	while(i < L->length)
	{
		printf("%d ",L->data[i]);
		i++;
	}
	printf("\n");
	return OK;
}
```
完整代码可参见：[GitHub](https://github.com/Laueray/Data-Structure/blob/master/1.List/Sqlist.c)
**DONE！**
所示代码如有错误请多加指正，谢谢