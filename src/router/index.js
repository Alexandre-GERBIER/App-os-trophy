import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Welcome from '@/views/Welcome'

import Ranking from '@/views/Ranking'

// student vues
import StudHome from '@/views/student/Home'
import StudProfile from '@/views/student/Profile'
import StudTrophy from '@/views/student/Trophy'
import StudTrophies from '@/views/student/Trophies'
import StudModules from '@/views/student/Modules'
import StudModule from '@/views/student/Module'

// teacher routes
import TeachHome from '@/views/teacher/Home'
import TeachProfile from '@/views/teacher/Profile'
import TeachTrophy from '@/views/teacher/Trophy'
import TeachModules from '@/views/teacher/Modules'
import TeachModule from '@/views/teacher/Module'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/student',
      component: StudHome,
      children: [
        {
          path: 'profile',
          component: StudProfile
        },
        {
          path: 'ranking',
          component: Ranking
        },
        {
          path: 'trophy/:id',
          component: StudTrophy
        },
        {
          path: 'trophy',
          component: StudTrophies
        },
        {
          path: 'module/:id',
          component: StudModule
        },
        {
          path: 'module',
          component: StudModules
        }
      ]
    },
    {
      path: '/teacher',
      component: TeachHome,
      children: [
        {
          path: 'profile',
          component: TeachProfile
        },
        {
          path: 'ranking',
          component: Ranking
        },
        {
          path: 'trophy/:id',
          component: TeachTrophy
        },
        {
          path: 'module/:id',
          component: TeachModule
        },
        {
          path: 'module',
          component: TeachModules
        }
      ]
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.replace('/welcome')
export default router
