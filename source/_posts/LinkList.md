---
title: 链表的实现与操作
date: 2016-07-03 13:11:14
categories:
- 数据结构
keywords:
- 数据结构
- 链表
tags:
- 链表
photos:
-
---

整理数据结构代码，回顾链表的实现方法。

<!--more-->

## 认识链表

上一篇实现了线性表的顺序存储，本篇将实现线性表的链式存储，即链表(Linklist)的实现。链式存储的特点是用一组任意的存储单元存储线性表的数据元素。因此，为了表示每个数据元素与其直接后继元素之间的逻辑关系，对该数据元素来说，除存储本身的信息之外，还需要存储一个指示其直接后继的信息(即直接后继的存储位置)。

## 代码实现

***
```c
#include <stdio.h>
#include <stdlib.h>

#define OK 1
#define ERROR 0

typedef int Status;
typedef int ElemType;

//节点定义
typedef struct LNode
{
	ElemType data;
	struct LNode *next;
}LNode,*LinkList;

//初始化
Status InitList(LinkList *L)
{
	*L = (LNode *)malloc(sizeof(LNode));
	if(!(*L)) return ERROR;
	(*L)->next = NULL;
	return OK;
}

//头插法
Status HeadInsertCreate(LinkList L,int n)
{
	ElemType e;
	while(n--)
	{
	    scanf("%d",&e);
		LNode *p;
		p = (LNode *)malloc(sizeof(LNode));
		p->data = e;
		p->next = L->next;
		L->next = p;
	}
	return OK;
}

//尾插法
Status TailInsertCreate(LinkList L,int n)
{
	LinkList tail;
	tail = L;
	ElemType e;
	while(n--)
	{
	    scanf("%d",&e);
		LNode *p;
		p = (LNode *)malloc(sizeof(LNode));
		p->data = e;
		p->next = NULL;
		tail->next = p;
		tail = p;
	}
	return OK;
}

//根据位置返回元素
Status GetElem(LinkList L,int pos,ElemType* e)
{
	LNode *p;
	p = L->next;
	int i = 1;
	while(p && i < pos)
	{
		p = p->next;
		i++;
	}
	if(!p || i > pos) return ERROR;
	(*e) = p->data;
	return OK;
}

//根据元素返回位置
Status GetPos(LinkList L,ElemType e,int* pos)
{
	LNode *p;
	int i = 1;
	p = L->next;
	while(p)
	{
		if(p->data == e)
		{
			(*pos) = i;
			return OK;
		}
		p = p->next;
		i++;
	}
	return ERROR;
}

//根据位置插入元素
Status Insert(LinkList L,int pos,ElemType e)
{
	LNode *pre;
	pre = L;
	int i = 0;
	while(pre && i < pos-1)
	{
		pre = pre->next;
		i++;
	}
	if(!pre || i > pos-1) return ERROR;
	LNode *p;
	p = (LNode *)malloc(sizeof(LNode));
	p->data = e;
	p->next = pre->next;
	pre->next = p;
	return OK;
}

//根据位置删除元素
Status DeleteAccordToPos(LinkList L,int pos,ElemType* e)
{
	LNode *pre;
	pre = L;
	int i = 0;
	while(pre->next && i < pos-1)
	{
		pre = pre->next;
		i++;
	}
	if(!pre->next || i > pos-1) return ERROR;
	LNode *p;
	p = pre->next; pre->next = p->next;
	(*e) = p->data;
	free(p);
	return OK;
}

//根据值删除元素，返回位置
Status DeleteAccordToElem(LinkList L,ElemType e,int* pos)
{
	LNode *pre,*p;
	int i = 1;
	pre = L;
	p = L->next;
	while(p)
	{
		if(p->data == e)
		{
			pre->next = p->next;
			(*pos) = i;
			free(p);
			return OK;
		}
		pre = p; //记录它的前驱节点
		p = p->next;
		i++;
	}
	return ERROR;
}

//长度
int Length(LinkList L)
{
	LNode *p;
	int length = 0;
	p = L;
	while(p->next)
	{
		length++;
		p = p->next;
	}
	if(!p) length = 0;
	return length;
}

//销毁
Status Destroy(LinkList L)
{
	LNode *p;
	p = L;
	while(p)
	{
		LNode *tmp;
		tmp = p;
		p = p->next;
		free(tmp);
	}
	return OK;
}

//逆置
Status Inverse(LinkList L)
{
	LNode *p,*q,*tmp;
	p = L->next;
	q = p->next;
	tmp = NULL;
	while(q)
	{
		tmp = q->next;
		q->next = p;
		p = q;
		q = tmp;
	}
	L->next->next = NULL;
	L->next = p;
	return OK;
}

//遍历
Status Traverse(LinkList L)
{
	LNode *p;
	p = L->next;
	while(p)
	{
		printf("%d ",p->data);
		p = p->next;
	}
	printf("\n");
	return OK;
}
```
完整代码可参见：[GitHub](https://github.com/Laueray/Data-Structure/blob/master/1.List/Linklist.c)
**DONE！**
所示代码如有错误请多加指正，谢谢