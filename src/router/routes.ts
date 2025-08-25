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
    name: "User Account",
    component: () => import("@/views/Users.vue")
  },

  METER_CONSUMPTION: {
    path: "/meter-consumption",
    name: "Meter & Consumption",
    component: () => import("@/views/MeterConsumption.vue")
  },

  BILLING_PAYMENTS: {
    path: "/billing-payments",
    name: "Billing & Payments",
    component: () => import("@/views/BillingPayments.vue")
  },

  UNITS_SHARING: {
    path: "/units-sharing",
    name: "Units Sharing",
    component: () => import("@/views/UnitsSharing.vue")
  },

  UNITS_PORTABILITY: {
    path: "/units-portability",
    name: "Units Portability",
    component: () => import("@/views/UnitsPortability.vue")
  },

  NOTIFICATION_ALERTS: {
    path: "/notification-alerts",
    name: "Notification & Alerts",
    component: () => import("@/views/NotificationAlerts.vue")
  },

  REMOTE_CONTROL: {
    path: "/remote-control",
    name: "Remote Control",
    component: () => import("@/views/RemoteControl.vue")
  },

  COMPLAINTS_SUPPORT: {
    path: "/complaints-support",
    name: "Complaints & Support",
    component: () => import("@/views/ComplaintsSupport.vue")
  },
});
