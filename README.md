# fanshu

> A Vue.js project (vue2.0 + vue-router + vuex + element-ui + 后端leancloud)

## 后端 [leancloud 云服务器使用](https://leancloud.cn/)
```
JavaScript SDK 安装指南
https://leancloud.cn/docs/sdk_setup-js.html

数据存储开发指南 · JavaScript
https://leancloud.cn/docs/leanstorage_guide-js.html

数据管理
https://leancloud.cn/dashboard/data.html?appid=nkRGTpHYitaoULUMk4eJ8Q8b-gzGzoHsz#/_User
```

## leancloud Usage
### 1.SDK初始配置 api/index.js
```
import AV from 'leancloud-storage'

const appId = 'nkRGTpHYitaoULUMk4eJ8Q8b-gzGzoHsz';
const appKey = 'WsRHjfOmSnibXhT51yKg65nC';
AV.init({ appId, appKey });

export default {SDK: AV};
```
### 2.SDK API 注入 main.js
```
import api from './api'

// 开启leancloud debug调试
localStorage.setItem('debug', 'leancloud*');
Vue.mixin({
  beforeCreate() {
    if (!this.$api) {
      this.$api = api;
    }
  }
})
```
### 3.SDK 用户信息 持久化存储 main.js
```
// 从localStorage里获取当前user信息 保存到vuex vuex中页面刷新全局状态就不存在
let user = api.SDK.User.current();
// console.log(user);
if(user) {
   store.commit('setUser', user);
}

```
### 4.用户注册处理 containers/SignUp.vue
```
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
```
### 5.用户登录处理 containers/SignIn.vue
```
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
```
### 6.用户退出处理 component/NavHeader.vue
```
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
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
