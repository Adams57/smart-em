export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  operationsUnitId?: string;
  operationsUnitName?: string;
  departmentName?: string;
  imageUrl?: string;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  accountType: string;
  operationsUnitId: string;
}

export interface UpdateUserRequest {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  operationsUnitId: string;
}

export interface LoginResponseData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  accessToken: string;
}

export interface JwtPayload {
  exp: number;
  sub?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  roles?: string;
}

// API endpoint constants
export const AUTH_ENDPOINTS = (
  data?: unknown
): {
  LOGIN: string;
  SSO_LOGIN: string;
  LOGOUT: string;
  PASSWORD_RESET_TOKEN: string;
  PASSWORD_RESET: string;
  CHANGE_PASSWORD: string;
  GET_USER_BY_ID: string;
  REFRESH: string;
} => {
  return {
    LOGIN: "/authentication/login",
    SSO_LOGIN: "/authentication/login/sso",
    LOGOUT: "/authentication/logout",
    PASSWORD_RESET_TOKEN: `/authentication/password-reset/token?email=${data}`,
    PASSWORD_RESET: "/authentication/password-reset",
    CHANGE_PASSWORD: "/authentication/change-password",
    GET_USER_BY_ID: `/Users/${data}`,
    REFRESH: "/authentication/refresh-token"
  };
};
