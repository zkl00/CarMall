import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('../views/login/Login.vue')//登陆
const Index = () => import('../views/index/index.vue')//首页
const Main = () => import('../views/main/Main.vue')//内容部分
const FormList = () => import('../views/formList/FormList')//基本表单
const Form = () => import('../views/form/Form')
const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: "/login",
  name: 'login',
  component: Login,
},
{
  path: "/index",
  name: 'index',
  component: Index,
  redirect: '/main',
  children: [{
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/formList',
    name: 'formList',
    component: FormList

  },
  {
    path: '/form',
    name: 'form',
    component: Form
  }
  ]
}
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  // from 从那个路径跳转过来
  // next 是一个函数  next()//放行   next('/login')//强制跳转
  if (to.path == '/login')  return next()
  const token = sessionStorage.getItem("token")
  console.log(token)
  if (!token) return  next('/login')
    next()
  

});

export default router