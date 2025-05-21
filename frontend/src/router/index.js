import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import Upload from '@/pages/Upload.vue';
import Projects from '@/pages/Projects.vue';
import Admin from '@/pages/Admin.vue';
import { useAuthStore } from '@/store/auth';

const routes = [
  { path: '/login', component: Login },
  { path: '/upload', component: Upload, meta: { auth: true } },
  { path: '/projects', component: Projects, meta: { auth: true, admin: true } },
  { path: '/admin', component: Admin, meta: { auth: true, admin: true } },
  { path: '/', redirect: '/upload' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const token = localStorage.getItem('token');
  if (token && !auth.token) auth.login(token);
  if (to.meta.auth && !auth.token) return next('/login');
  if (to.meta.admin && !auth.user.isAdmin) return next('/upload');
  next();
});

export default router;
