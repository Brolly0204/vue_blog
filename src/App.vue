<template>
<div id="app">
  <NavHeader></NavHeader>
  <router-view></router-view>
  <vue-progress-bar></vue-progress-bar>
</div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
export default {
  name: 'app',
  mounted() {
    this.$Progress.finish()
  },
  created() {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }
      this.$Progress.start();
      next()
    });
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  },
  components: {
    NavHeader
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
