---
title: 图的邻接表存储
date: 2016-08-26 21:45:54
categories:
- 数据结构
keywords:
- 数据结构
- 无向图
tags:
- 无向图
photos:
---

图是一种经典的数据结构，在实际的生产过程中有广泛的应用，本文将结合代码简单介绍有关图的相关基础知识点。

<!--more-->

## 图的基本概念

***

**图**(Graph)是一种较线性表和树更为复杂的结构。图有两个重要元素构成，顶点和弧边，弧边是相关顶点之间的连线，具有方向性，根据方向性的有无，图可以分为有向图和无向图。

(1) 无向图。在一个图中，如果任意两个顶点构成的偶对（vi, vj）∈E 是无序的，即顶点之间的连线是没有方向的，则称该图为无向图。如下图就是一个无向图。
(2) 有向图。在一个图中，如果任意两个顶点构成的偶对（vi, vj）∈E 是有序的，即顶点之间的连线是有方向的，则称该图为有向图。

![无向图](https://raw.githubusercontent.com/Evandoz/blob/master/Graph/Graph.jpg)

## 图的抽象数据类型定义

***
>ADT  Graph{
数据对象：n=n是具有相同特征的数据元素集合，称为顶点集。
数据关系：DR={<v,w>|v,w∈n且<v,w>表示从v指向w的弧
}

## 图的邻接表存储代码实现

***

邻接表是图的一种最主要存储结构，它由表头结点和表结点两部分组成，其中每个顶点均对应一个存储在数组中的表头结点。简言之，对图的每个顶点建立一个容器（n个顶点建立n个容器），第i个容器中的结点包含顶点Vi的所有邻接顶点。
在有向图中，描述每个点向别的节点连的边（点a->点b这种情况）；在无向图中，描述每个点所有的边(点a-点b这种情况)。

![邻接表](https://raw.githubusercontent.com/Evandoz/blob/master/Graph/AdjacencyList.png)

### 图的顶点及弧的定义

```c
#define MAX_VERTEX_NUM 20

typedef char VertexType;
typedef int Status;

typedef int QElemType;

//边表
typedef struct ArcNode
{
	int adjvex; //该边所指顶点位置
	struct ArcNode *nextarc; //指向下一条弧的指针
} ArcNode;

//顶点表
typedef struct VerNode
{
	VertexType data; //顶点信息
	ArcNode *firstarc; //指向第一条依附该顶点的弧
} VerNode, AdjList[MAX_VERTEX_NUM];

//图定义
typedef struct
{
	AdjList vertices;
	int vexnum, arcnum; //图的当前顶点数和弧数
	//int kind; //图的种类标志
} ALGraph;
```

### 图的创建

```c
int visit[MAX_VERTEX_NUM];

//节点元素定位
int LocateVex(ALGraph *G, VertexType e)
{
	int tmp = -1; int i;
	for (i = 0; i < G->vexnum; i++)
	{
		if (G->vertices[i].data == e)
		{
			tmp = i; break;
		}
	}
	return tmp;
}

//邻接表头插
Status HeadInsertArc(ALGraph *G, int pos, int adjvex)
{
	ArcNode *e;
	e = (ArcNode *)malloc(sizeof(ArcNode));
	e->adjvex = adjvex;
	e->nextarc = G->vertices[pos].firstarc;
	G->vertices[pos].firstarc = e;
	return OK;
}

//邻接表尾插
Status TailInsertArc(ALGraph *G, int pos, int adjvex)
{
	ArcNode *e, *p;
	e = (ArcNode *)malloc(sizeof(ArcNode));
	e->adjvex = adjvex;
	e->nextarc = NULL;
	if (G->vertices[pos].firstarc == NULL)
		G->vertices[pos].firstarc = e;
	else
	{
		p = G->vertices[pos].firstarc;
		while (p->nextarc)
			p = p->nextarc;
		p->nextarc = e;
	}
	return OK;
}

//创建图
Status CreateGraph(ALGraph *G)
{
	int i;
	printf("Please input the vexnum and arcnum:");
	scanf("%d%d", &(G->vexnum), &(G->arcnum));
	getchar();
	for (i = 0; i < G->vexnum; i++)
	{
		G->vertices[i].data = getchar();
		G->vertices[i].firstarc = NULL;
	}
	getchar();
	for (i = 0; i < G->arcnum; i++)
	{
		char arc_s, arc_e;
		arc_s = getchar(); arc_e = getchar();
		int v_s = LocateVex(G, arc_s);
		int v_e = LocateVex(G, arc_e);
		//HeadInsertArc(G, v_s, v_e);
		//HeadInsertArc(G, v_e, v_s);
		TailInsertArc(G, v_s, v_e);
		TailInsertArc(G, v_e, v_s);
	}
	return OK;
}
```

### 深度优先遍历

在G中任选一顶点v为初始出发点(源点)，则深度优先遍历可定义如下：首先访问出发点v，并将其标记为已访问过；然后依次从v出发搜索v的每个邻接点w。若w未曾访问过，则以w为新的出发点继续进行深度优先遍历，直至图中所有和源点v有路径相通的顶点(亦称为从源点可达的顶点)均已被访问为止。若此时图中仍有未访问的顶点，则另选一个尚未访问的顶点作为新的源点重复上述过程，直至图中所有顶点均已被访问为止。

```c
//非递归
Status DFS_Non_Recursion(ALGraph *G, int i)
{
	ArcNode *p;
	printf("%c ", G->vertices[i].data);
	visit[i] = 1;
	p = G->vertices[i].firstarc;

	while (p)
	{
		if (!visit[p->adjvex])
		{
			printf("%c ", G->vertices[p->adjvex].data);
			visit[p->adjvex] = 1;
		}
		p = p->nextarc;
	}
	return OK;
}
//递归
Status DFS_Recursion(ALGraph *G, int i)
{
	ArcNode *p;
	printf("%c ", G->vertices[i].data);
	p = G->vertices[i].firstarc;
	visit[i] = 1;
	while (p)
	{
		if (!visit[p->adjvex])
		{
			DFS_Recursion(G, p->adjvex);
		}
		p = p->nextarc;
	}
	return OK;
}

//深度优先遍历
Status DFSTraverse(ALGraph *G)
{
	int i;
	for (i = 0; i < G->vexnum; i++)
		visit[i] = 0;
	for (i = 0; i < G->vexnum; i++)
		if (!visit[i]) DFS_Non_Recursion(G, i);
	printf("\n");
	return OK;
}
```

### 广度优先遍历

从图中某个顶点V0出发，并访问此顶点；然后访问V0的各个未曾访问的邻接点W1，W2，…,Wk;然后,依次从W1,W2,…,Wk出发访问各自未被访问的邻接点；重复步骤第二个步骤，直到全部顶点都被访问为止。

```c
//广度优先遍历
Status BFSTraverse(ALGraph *G)
{
	int i; LinkQueue Q;
	InitQueue(&Q); //初始化队列
	for (int i = 0; i < G->vexnum; i++) //设置所为顶点为未访问
		visit[i] = 0;
	for (int i = 0; i < G->vexnum; ++i)
	{
		if (0 == visit[i]) //选取未访问的顶点
		{
			visit[i] = 1; //未访问,则(只)访问一次
			printf("%c ", G->vertices[i].data);
			EnQueue(&Q, i); //已访问则进队
			while (!QueueEmpty(&Q)) //队列不为空
			{
				DeQueue(&Q, &i); //出队
				ArcNode *p = G->vertices[i].firstarc; //指向下一个边表结点
				while (p)
				{
					if (!visit[p->adjvex]) //未访问结点
					{
						visit[p->adjvex] = 1;
						printf("%c ", G->vertices[p->adjvex].data);
						EnQueue(&Q, p->adjvex);
					}
					p = p->nextarc; //下一个边表结点
				}
			}
		}
	}
	printf("\n");
	return OK;
}
```

完整代码可参见：[GitHub](https://github.com/Laueray/Data-Structure/tree/master/5.Graph)

 **DONE！**
所示代码如有错误请多加指正，谢谢
