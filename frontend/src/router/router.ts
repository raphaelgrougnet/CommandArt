import { createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import {useAuthStore} from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/views/LoginView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isLogged) {
          return next("/")
        }
        return next()
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("@/views/RegisterView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isLogged) {
          return next("/")
        }
        return next()
      }
    },
    {
      path: '/admin/categories',
      name: 'categories',
      component: () => import("@/views/admin/CategoriesView.vue"),
      beforeEnter: async (to, from, next) => {
        const authStore = useAuthStore();

        if (!authStore.isLogged) {
          return next("/login")
        }
        if (!authStore.currentUser?.isAdmin) {
          return next("/")
        }
        await authStore.getCurrentUser()
        return next()
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: { template: '<div></div>' },
      beforeEnter: async (to, from, next) => {
        const authStore = useAuthStore();
        await authStore.logout();
        return next({name : 'login'});
      },
    } as RouteRecordRaw
  ],
})

export default router
