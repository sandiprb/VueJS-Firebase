import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Signup from '../views/Signup'
import Dashboard from '../views/Dashboard'

const routes = [
{ path: '/', component: Home },
{ path: '/login', component: Login },
{ path: '/signup', component: Signup },
{ path: '/dashboard', component: Dashboard }
]

Vue.use(Router)

const router = new Router({
  routes
})

export default router
