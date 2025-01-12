<template>
  <ChatPage/>
  <!-- <HelloWorld msg="Welcome to Your Vue.js Apps"/>

  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> | 
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view>  <!- 这里会显示当前路由对应的组件 ->
  </div> -->

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ChatPage from './components/ChatPage.vue'
export default {
  name: 'App',
  components: {
    // HelloWorld,
    ChatPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
