<template>
<div id="header-container">
  <el-menu :router="true" :default-active="active" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/" class="logo">番薯</el-menu-item>
    <el-menu-item index="/list"><i class="fa fa-flag" aria-hidden="true"></i> 探索</el-menu-item>
    <template v-if="user">
       <el-menu-item index="6" class="right" @click="handleExit"><i  class="fa fa-sign-out" aria-hidden="true"></i>注销</el-menu-item>
        <el-submenu index="5" class="right">
         <!-- user.getUsername 是用户信息对象自带的方法 -->
         <span slot="title"> {{ user.getUsername() }} </span>
         <el-menu-item index="5-1">个人中心</el-menu-item>
         <el-menu-item index="5-2">发布文章</el-menu-item>
         <el-menu-item index="5-3">消息</el-menu-item>
       </el-submenu>
     </template>

    <template v-else>
      <el-menu-item index="/signUp" class="right"><i class="fa fa-user-o" aria-hidden="true"></i> 注册</el-menu-item>
      <el-menu-item index="/signIn" class="right"><i class="fa fa-key" aria-hidden="true"></i> 登陆</el-menu-item>
    </template>

  </el-menu>
</div>
</template>
<script>
import {
  mapState,
  mapActions
} from 'vuex';
export default {
  name: "NavHeader",
  created() { // 解决路由编程式跳转和刷新高亮问题 active 等于哪个路由path 对应router-link就会高亮
    this.active = this.$route.path;
    this.$router.afterEach((to, from) => {
      this.active = to.path;
    });
  },
  computed: mapState(['user']),
  data() {
    return {
      active: '/',
    };
  },
  methods: {
    ...mapActions(['exit']),
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleExit() {
      this.exit(); // 修改vuex状态
      this.$api.SDK.User.logOut(); // 用户退出 （将localStorage中存储的当前用户信息移除）
      this.$message.success('成功退出');
    }
  }
}
</script>
<style lang="less" scoped>
#header-container {
    padding: 0 10%;
    background: #eef1f6;
    .right {
        float: right;
    }
    .el-menu-item.is-active {
        background-color: #bddcf4;
    }
    .el-menu-item.logo {
        margin-left: 0;
        font-size: 25px;
        font-weight: 300;
        color: #fff;
        background: #20a0ff;
        &:hover {
            background: #20a0ff;
        }
    }
}
</style>
