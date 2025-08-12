import { defineStore } from "pinia";
import { ROUTES } from "@/router/routes";
import ApiService from "@/api/index";
import {
  User,
  LoginCredentials,
  LoginResponseData,
  PasswordResetRequest,
  PasswordResetConfirm,
  ChangePassword,
  JwtPayload,
  AUTH_ENDPOINTS
} from "@/types/auth";
import router from "@/router";
import { jwtDecode } from "jwt-decode";

interface State {
  user: User | null;
  accessToken: string | null;
  tokenExpiration: number | null;
  logoutTimer: ReturnType<typeof setTimeout> | null;
}

const decodeJwt = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};

const handleApiError = (error: unknown) => {
  if (error instanceof Error) {
    throw error;
  }
  throw new Error(error as string);
};

export const useAuthStore = defineStore("auth", {
  state: (): State => ({
    user: null,
    accessToken: null,
    tokenExpiration: null,
    logoutTimer: null
  }),

  getters: {
    fullName: (state): string => {
      if (!state.user) return "";
      return `${state.user.firstName} ${state.user.lastName}`.trim();
    },
    firstName: (state): string => {
      if (!state.user) return "";
      return state.user.firstName.trim();
    },
    userId: (state): string | undefined => state.user?.id
  },

  actions: {
    scheduleAutoLogout(expiration: number) {
      if (this.logoutTimer) {
        clearTimeout(this.logoutTimer);
      }

      const currentTime = Date.now();
      const expiryTime = expiration * 1000; // convert to ms

      const timeUntilExpiry = expiryTime - currentTime;

      if (timeUntilExpiry > 0) {
        this.logoutTimer = setTimeout(() => {
          this.checkAuth();
        }, timeUntilExpiry);
      }
    },

    /**
     * Sets the user in the store.
     * @param user - The user object or null.
     */
    setUser(user: User | null) {
      this.user = user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    },

    /**
     * Checks if the access token is expired.
     * @returns True if the token is expired or missing, false otherwise.
     */
    isTokenExpired(): boolean {
      if (!this.tokenExpiration) return true;
      const currentTime = Date.now() / 1000; // convert to seconds
      // Check if the current time is greater than or equal to the token expiration time
      const isExpired = currentTime >= this.tokenExpiration;
      return isExpired;
    },

    /**
     * Authenticates a user with email and password credentials.
     * @param credentials - The user's email and password.
     * @throws Error if login fails.
     */
    async login(credentials: LoginCredentials): Promise<void> {
      try {
        const response = await ApiService.post<LoginResponseData>(
          AUTH_ENDPOINTS().LOGIN,
          credentials
        );
        const { data, isSuccessful, errors } = response;

        if (!isSuccessful || errors.length > 0) {
          const errorMsg = errors.join(", ");
          throw new Error(
            errorMsg.includes("locked")
              ? "Your account is locked. Please contact support."
              : errorMsg.includes("An unexpected error occurred")
                ? "Unable to connect. Please try again."
                : "Incorrect email or password. Please check your credentials or reset your password."
          );
        }

        this.accessToken = data.accessToken;
        const user = {
          id: data.userId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          accountType: data.accountType
        };
        this.setUser(user);

        const decodedToken = decodeJwt(data.accessToken);
        this.tokenExpiration = decodedToken?.exp || null;

        if (this.tokenExpiration) {
          this.scheduleAutoLogout(this.tokenExpiration);
        }

        localStorage.setItem("accessToken", data.accessToken);
        router.push({ name: ROUTES.HOME.name });
      } catch (error) {
        const errorMsg = (error as Error).message;
        throw handleApiError(
          errorMsg === "locked"
            ? "Your account is locked. Please contact support."
            : errorMsg.includes("An unexpected error occurred")
              ? "Unable to connect. Please try again."
              : "Incorrect email or password. Please check your credentials or reset your password."
        );
      }
    },

    /**
     * Authenticates a user via SSO using an ID token.
     * @param idToken - The SSO ID token.
     * @throws Error if SSO login fails.
     */
    async ssoLogin(idToken: string): Promise<void> {
      try {
        const response = await ApiService.post<LoginResponseData>(
          AUTH_ENDPOINTS().SSO_LOGIN,
          {},
          {
            headers: { Authorization: `Bearer ${idToken}` }
          }
        );
        const { data, isSuccessful, errors } = response;

        if (!isSuccessful || errors.length > 0) {
          throw new Error(
            "An error occurred during Microsoft account login. Try again."
          );
        }

        this.accessToken = data.accessToken;
        const user = {
          id: data.userId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          accountType: data.accountType
        };
        this.setUser(user);

        const decodedToken = decodeJwt(data.accessToken);
        this.tokenExpiration = decodedToken?.exp || null;

        if (this.tokenExpiration) {
          this.scheduleAutoLogout(this.tokenExpiration);
        }

        localStorage.setItem("accessToken", data.accessToken);
        router.push({ name: ROUTES.HOME.name });
      } catch (error) {
        const errorMsg = (error as Error).message;
        throw handleApiError(
          errorMsg.includes("An unexpected error occurred")
            ? "Unable to connect. Please try again."
            : "An error occurred during Microsoft account login. Try again."
        );
      }
    },

    /**
     * Requests a password reset link.
     * @param data - The password reset request data.
     * @throws Error if the request fails.
     */
    async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
      try {
        const response = await ApiService.post<null>(
          AUTH_ENDPOINTS(data.email).PASSWORD_RESET_TOKEN,
          data
        );
        const { isSuccessful, errors } = response;

        if (!isSuccessful || errors.length > 0) {
          throw new Error(
            "Failed to send password reset email. Please try again."
          );
        }
      } catch {
        throw handleApiError(
          "Failed to send password reset email. Please try again."
        );
      }
    },

    /**
     * Confirms a password reset with a new password.
     * @param data - The password reset confirmation data.
     * @throws Error if the reset fails.
     */
    async confirmPasswordReset(data: PasswordResetConfirm): Promise<void> {
      try {
        const response = await ApiService.post<null>(
          AUTH_ENDPOINTS().PASSWORD_RESET,
          data
        );
        const { isSuccessful, errors } = response;

        if (!isSuccessful || errors.length > 0) {
          throw new Error(
            "Failed to reset password. The link may be invalid or expired."
          );
        }
        router.push({ name: ROUTES.LOGIN.name });
      } catch {
        throw handleApiError(
          "Failed to reset password. The link may be invalid or expired."
        );
      }
    },

    /**
     * Changes the user's password.
     * @param data - The new password data.
     * @throws Error if the change fails.
     */
    async changePassword(data: ChangePassword): Promise<void> {
      try {
        const response = await ApiService.post<null>(
          AUTH_ENDPOINTS().CHANGE_PASSWORD,
          data
        );
        const { isSuccessful, errors } = response;

        if (!isSuccessful || errors.length > 0) {
          throw new Error("Failed to change password");
        }
      } catch {
        throw handleApiError("Failed to change password");
      }
    },

    /**
     * Logs out the user and clears the session.
     * @throws Error if the logout API call fails.
     */
    async logout(): Promise<void> {
      try {
        await ApiService.post<null>(AUTH_ENDPOINTS().LOGOUT);
      } catch (error) {
        throw handleApiError(error || "Logout failed");
      } finally {
        if (this.logoutTimer) {
          clearTimeout(this.logoutTimer);
          this.logoutTimer = null;
        }
        this.setUser(null);
        this.accessToken = null;
        this.tokenExpiration = null;
        localStorage.removeItem("accessToken");
        router.push({ name: ROUTES.LOGIN.name });
      }
    },

    /**
     * Refreshes the access token using a refresh token.
     * @throws Error if token refresh fails.
     */
    async refreshToken(): Promise<void> {
      try {
        const response = await ApiService.get<LoginResponseData>(
          AUTH_ENDPOINTS().REFRESH
        );
        const { data, isSuccessful, errors } = response;

        if (!isSuccessful || errors.length > 0) {
          throw new Error(errors.join(", ") || "Token refresh failed");
        }

        this.accessToken = data.accessToken;
        const decoded = decodeJwt(data.accessToken);
        this.tokenExpiration = decoded?.exp || null;

        // if (this.tokenExpiration) {
        //   this.scheduleAutoLogout(this.tokenExpiration);
        // }

        localStorage.setItem("accessToken", data.accessToken);
      } catch (error) {
        await this.logout();
        throw handleApiError(error || "Token refresh failed");
      }
    },

    /**
     * Checks the authentication status and fetches user data if needed.
     * @returns True if the user is authenticated, false otherwise.
     */
    async checkAuth(): Promise<boolean> {
      if (this.accessToken && !this.isTokenExpired()) {
        return true;
      }

      const storedAccessToken = localStorage.getItem("accessToken");
      if (storedAccessToken) {
        try {
          this.accessToken = storedAccessToken;
          const decodedToken = decodeJwt(storedAccessToken);
          this.tokenExpiration = decodedToken?.exp || null;

          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            this.user = JSON.parse(storedUser);
          }

          if (!this.isTokenExpired()) {
            if (!this.user) {
              const userResponse = await ApiService.get<User>(
                AUTH_ENDPOINTS(this.userId).GET_USER_BY_ID
              );
              const { data, isSuccessful, errors } = userResponse;
              if (!isSuccessful || errors.length > 0) {
                throw new Error(
                  errors.join(", ") || "Failed to fetch user data"
                );
              }
              this.setUser(data);
            }
            return true;
          }
          // Token expired, attempt refresh
          await this.refreshToken();
          return true;
        } catch (error) {
          console.warn("Auth check failed:", error);
        }
      }

      // no valid token: clear out
      this.accessToken = null;
      this.tokenExpiration = null;
      localStorage.removeItem("accessToken");
      this.setUser(null);
      return false;
    }
  }
});
