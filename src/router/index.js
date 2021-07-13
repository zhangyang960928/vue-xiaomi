import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/Login',
    name:'Login',
    component: () => import('../views/login/Login.vue'),
    meta:{
      title:'登录',
    }
  },
  {
    path:'/Register',
    name:'Register',
    component: () => import('../views/register/Register.vue'),
    meta:{
      title:'注册',
    }
  },
  {
    path:'',
    component:Layout,
    children:[
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta:{
          title:'首页',
          index:'/'
        }
      },
      {
        path: '/Publish',
        name: 'Publish',
        component: () => import('../views/publish/Publish.vue'),
        meta:{
          title:'已发布',
          index:'/Publish'
        }
      },
      {
        path: '/Census',
        name: 'Census',
        component: () => import('../views/census/Census.vue'),
        meta:{
          title:'统计',
          index:'/Census'
        }
      },
      {
        path: '/Article',
        name: 'Article',
        component: () => import('../views/article/Article.vue'),
        meta:{
          title:'发表文章',
          index:'/Article'
        }
      },
      {
        path: '/Tag',
        name: 'Tag',
        component: () => import('../views/tag/Tag.vue'),
        meta:{
          title:'标签页',
          index:'/Tag'
        }
      },
      {
        path: '/Derive',
        name: 'Derive',
        component: () => import('../views/derive/Derive.vue'),
        meta:{
          title:'导出excel',
          index:'/Derive'
        }
      },
      {
        path: '/Servlet',
        name: 'Servlet',
        component: () => import('../views/servlet/Servlet.vue'),
        meta:{
          title:'图片上传',
          index:'/Servlet'
        }
      },
      {
        path: '/Signout',
        name: 'Signout',
        component: () => import('../views/signout/Signout.vue'),
        meta:{
          title:'退出系统',
          index:'/SignoutSignout'
        }
      },
      {
        path: '/Edit',
        name: 'Edit',
        component: () => import('../views/edit/Edit.vue'),
        meta:{
          title:'编辑',
          index:'/Publish'
        }
      },
      {
        path: '/See',
        name: 'See',
        component: () => import('../views/see/See.vue'),
        meta:{
          title:'查看',
          index:'/Publish',
        }
      },
    ]
  },
  {
    path:'*',
    component: () => import('../views/404/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from ,next) => {
  let user=localStorage.getItem('vue-name')
  console.log(user);
  document.title=to.meta.title
  if(to.path === '/Login' || to.path === '/Register') {
    next()
  }else {
    user? next() :next('/Login')
  }



})
export default router
