import Vue from 'vue'
import VueRouter from 'vue-router'
import GroupPage from "@/pages/GroupPage.vue";
import InstitutesPage from "@/pages/InstitutesPage.vue";
// import MainPage from "@/pages/MainPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue"

Vue.use(VueRouter)

const routes = [
  // {name: 'main', component: MainPage, path: '/'},
  {name: 'institutes', component: InstitutesPage, path: '/'},
  {name: 'group', component: GroupPage, path: '/group/:group'},
  // {name: 'group', component: GroupPage, path: '/group/:group(\\d-[А-Я]{3,}-\\d{1,})'},
  {name: 'notFound', component: NotFoundPage, path: '*'},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

export default router
