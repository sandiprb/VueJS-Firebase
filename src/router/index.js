import Vue from 'vue'
import Router from 'vue-router'

import store from '../store';
import Home from '../views/Home'
import Login from '../views/Login'
import Signup from '../views/Signup'
import NotFound from '../views/NotFound'
import Dashboard from '../views/Dashboard'

const STORE = store.getters

function loggedIn (to, from, next) {
    !STORE.isLoggedIn ? next() : next({path: '/dashboard'})
}

const routes = [
{path: '/', component: Home, beforeEnter: (to, from, next) => { loggedIn(to, from, next) }},
{path: '/login', component: Login, beforeEnter: (to, from, next) => { loggedIn(to, from, next) }},
{path: '/signup', component: Signup, beforeEnter: (to, from, next) => { loggedIn(to, from, next) }},
{
    path: '/user', // user path is only for authenticated
    name: 'user',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
        STORE.isLoggedIn ? next() : next({path: '/'})
    },
    children: [{path: '/dashboard', component: Dashboard}]
},
{path: '/*', name: 'not-found', component: NotFound}
]

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes
})

export default router
