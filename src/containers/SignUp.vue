<template>
<div id="form-container">
  <h1>注册</h1>
  <div id="form-panel">
    <el-form :label-position="labelPosition" ref="ruleForm" label-width="80px" :rules="rules" :model="user">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="邮件" prop="email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="user.pass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="user.checkPass"></el-input>
      </el-form-item>
      <div class="operator">
        <el-button class="submit" type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </el-form>
  </div>
</div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
export default {
  name: "SignUp",
  created() {

  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.user.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.user.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      labelPosition: 'top',
      user: {
        name: '',
        email: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        name: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 7,
            message: '长度在 3 到 7 个字符之间',
            trigger: 'blur'
          }
        ],
        email: [{
            required: true,
            message: '请填写邮箱',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '必须是合法的邮箱格式',
            trigger: 'blur'
          }
        ],
        pass: [{
            required: true,
            message: '必须填写',
            trigger: 'blur'
          },
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        checkPass: [{
            required: true,
            message: '必须填写',
            trigger: 'blur'
          },
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // ...mapMutations(['setUser']),
    ...mapActions(['login']),
    submitForm(formName) { // 用户注册处理
      this.$refs[formName].validate(valid => {
        if (valid) {
          // https://leancloud.cn/docs/leanstorage_guide-js.html#用户名和密码注册
          // this.$api.SDK => AV
          let user = new this.$api.SDK.User();
          // 设置用户名
          user.setUsername(this.user.name);
          // 设置密码
          user.setPassword(this.user.pass);
          // 设置邮箱
          user.setEmail(this.user.email);

          user.signUp().then((loginUser) => {
            // console.log(loginUser);
            // this.$store.commit('setUser', loginUser); // 保存到 Vuex 中
            // this.setUser(loginUser);
            this.login(loginUser);
            this.$message.success("注册成功！")

            // this.$router.go(-1) // 回到上一页
            this.$router.push('/');
          }).catch(error => {
            // console.error(error)
            this.$message.error(error.message)
          })
        } else {
          // console.log('submit error!!');
          this.$message.error('错了哦，您填写的信息有误，请按提示修改。')
          return false;
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
