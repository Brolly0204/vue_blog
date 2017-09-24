import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ArticleList from '@/containers/List'
import SignUp from '@/containers/SignUp'
import SignIn from '@/containers/SignIn'
import Create from '@/containers/Article/Create'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/article',
      name: 'ArticleList',
      component: ArticleList
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/create',
      name: 'Create',
      component: Create,
      meta: {
        needLogin: true
      }
    }
  ]
})
