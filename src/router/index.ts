// index.ts
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { ROUTES } from "./routes";
import { useAuthStore } from "@/store/auth";

const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.LOGIN.path,
    name: ROUTES.LOGIN.name,
    component: ROUTES.LOGIN.component,
    meta: { requiresAuth: false }
  },
  {
    path: ROUTES.FORGOT_PASSWORD.path,
    name: ROUTES.FORGOT_PASSWORD.name,
    component: ROUTES.FORGOT_PASSWORD.component,
    meta: { requiresAuth: false }
  },
  {
    path: ROUTES.RESET_PASSWORD.path,
    name: ROUTES.RESET_PASSWORD.name,
    component: ROUTES.RESET_PASSWORD.component,
    meta: { requiresAuth: false }
  },
  {
    path: ROUTES.SSOLOGIN.path,
    name: ROUTES.SSOLOGIN.name,
    component: ROUTES.SSOLOGIN.component,
    meta: { requiresAuth: false }
  },
  {
    path: ROUTES.HOME.path,
    name: ROUTES.HOME.name,
    component: ROUTES.HOME.component,
    redirect: ROUTES.DASHBOARD.path,
    meta: { requiresAuth: true },
    children: [
      {
        path: ROUTES.DASHBOARD.path,
        name: ROUTES.DASHBOARD.name,
        component: ROUTES.DASHBOARD.component,
        meta: { requiresAuth: false }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  // 1) Always allow the MSAL redirect callback through
  if (to.name === ROUTES.SSOLOGIN.name) {
    return next();
  }
  const authStore = useAuthStore();

  // Check authentication status
  const isAuthenticated = await authStore.checkAuth();

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if route requires auth and user is not authenticated
    next({ name: ROUTES.LOGIN.name });
  } else if (to.name === ROUTES.LOGIN.name && isAuthenticated) {
    // Redirect to home if user is authenticated and trying to access login
    next({ name: ROUTES.HOME.name });
  } else {
    next();
  }
});

export default router;
