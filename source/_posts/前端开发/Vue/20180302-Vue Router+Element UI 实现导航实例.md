---
title: Vue Router+Element UI 实现导航实例
keywords:
  - vue-router
  - Element UI
tags:
  - Vue
photos:
---

Element UI是饿了么团队打造的一个前端UI库，其中实现了很多常用的组件，导航栏或者叫菜单栏就属于一种。

<!--more-->

在Element UI提供的NavMenu组件中，其提供了一个属性：default-active，它表示当前激活菜单的index。使用该属性可以保持菜单中当前激活的项与当前的页面是一致的，而这其中的关键就在于设置该属性的值。由于页面跳转变化，所以这个属性的值也需要随着当前页面路由的改变而改变，Vue.js官方提供的vue-router刚好可以解决此问题。

vue-router中提供了一个路由对象(route object)，它表示当前激活的路由的状态信息，包含了当前URL解析得到的信息，还有URL 匹配到的路由记录(route records)。该路由对象有很多属性，诸如$route.path，$route.params，$route.query等，更多详情可以参见[官方文档](https://router.vuejs.org/zh-cn/api/route-object.html)。在这里我们使用$route.path即可，返回值位字符串(string)，对应当前路由的路径，然后将NavMenu中各项的index值设置为相应的路由即可。

```
:default-active="$route.path"
```

**注意**：

1. 冒号(:)不可少，这属于Vue.js的语法问题，不再赘述
2. 不设置default-active属性时，点击菜单项虽然当前点击项会被激活，但刷新页面后其选中效果就会丢失，页面跟菜单项无法保持一致。

完整代码实例如下：

```
<el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
  <el-menu-item index="/page1">page1</el-menu-item>
  <el-menu-item index="/page2">page2</el-menu-item>
  <el-menu-item index="/page3">page3</el-menu-item>
  <el-menu-item index="/page4">page4</el-menu-item>
</el-menu>
```
