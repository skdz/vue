<template>
  <!-- <Test/> -->
  
      <!-- <router-link to="/home">Home</router-link><br>
      <router-link to="/about">About</router-link><br><br>
      <router-view></router-view> -->
      <div>
          <MyHeader/>
          <UserInfomation/>
          <MyContent/>
          <MyFooter/>
      </div>
</template>

<script>
import MyHeader from './components/MyHeader'
import UserInfomation from './components/UserInformation'
import MyContent from './components/MyContent'
import MyFooter from './components/MyFooter'
export default {
  name: 'App',
  components: { MyHeader,UserInfomation,MyContent,MyFooter }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
