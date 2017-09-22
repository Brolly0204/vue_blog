<template>
  <div id="form-container">
    <h1>登陆</h1>
    <div class="form-panel">
      <el-form :label-positon="labelPosition" ref="ruleForm" label-width="80px" :rules="rules" :model="user">
        <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入用户名" v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input placeholder="请输入密码" type="password" v-model="user.pass"></el-input>
        </el-form-item>
        <div class="operator">
          <el-button class="submit" type="primary" @click="submitForm('ruleForm')">登陆</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: "SignIn",
  data() {
     return {
       labelPosition: 'top',
       user: {
         name: '',
         pass: ''
       },
       rules: {
         name: [
           {required: true, message: '用户名不能为空', trigger: 'blur'},
           {min: 3, max: 7, message: '长度在 3 到 7 个字符之间', trigger: 'blur'}
         ],
         pass: [
           {required: true, message: '密码不能为空', trigger: 'blur'},
         ]
       }
     }
  },
  methods: {
    ...mapActions(['login']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
          if(valid) {
            // 用户登录处理
            this.$api.SDK.User.logIn(this.user.name, this.user.pass).then(loginUser => {
                this.login(loginUser);
                this.$router.push('/');
                this.$message.success('登陆成功');
            }).catch(err => {
              console.log(err);
              this.$message.error('用户名或密码输入错误~~');
            })
          } else {
            this.$message.error('用户名或密码输入错误');
            return false
          }
      })
    }
  }
}
</script>
<style lang="less" scoped>
#form-container {
    position: absolute;
    top: 60px;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 60px 10%;
    background: #fafafa;
    /*     min-height: calc(100vh - 180px); */
    h1 {
        text-align: center;
        font-weight: 100;
        font-size: 40px;
        margin-bottom: 35px;
    }
    .from-panel {
        width: 50%;
        margin: 0 auto;
    }
    .operator {
        margin-top: 30px;
        text-align: center;
    }
}
</style>
