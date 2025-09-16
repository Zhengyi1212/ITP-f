<template>
  <!-- 路由视图出口，所有匹配的路由组件将在这里渲染 -->
  <router-view />
</template>

<script setup>
// 这个根组件非常简单，它的主要职责就是提供一个 <router-view> 让 Vue Router 来挂载页面。
</script>

<style>
/* 这里可以放置一些影响整个应用的最高级别的样式，但推荐在 assets/styles/main.css 中管理全局样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
