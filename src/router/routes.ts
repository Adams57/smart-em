export const ROUTES = Object.freeze({
  LOGIN: {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/LoginView.vue")
  },

  SSOLOGIN: {
    path: "/sso-callback",
    name: "SsoCallback",
    component: () => import("@/views/auth/SsoCallbackView.vue")
  },

  FORGOT_PASSWORD: {
    path: "/forgot-password",
    name: "Forgot Password",
    component: () => import("@/views/auth/ForgotPasswordView.vue")
  },

  RESET_PASSWORD: {
    path: "/reset-password/:token",
    name: "Reset Password",
    component: () => import("@/views/auth/ResetPassword.vue")
  },

  HOME: {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue")
  },

  DASHBOARD: {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/DashboardView.vue")
  },

  USERS: {
    path: "/users",
    name: "Users",
    component: () => import("@/views/Users.vue")
  },
});
