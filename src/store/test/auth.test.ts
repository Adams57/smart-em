import { setActivePinia, createPinia } from "pinia";
import { useAuthStore } from "@/store/auth";
import ApiService from "@/api/index";
import router from "@/router";
import jwtDecode from "jwt-decode";
import { vi, describe, it, expect, beforeEach, Mock } from "vitest";
import { ROUTES } from "@/router/routes";

// Mock external modules
vi.mock("@/api/index", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn()
  }
}));
vi.mock("@/router", () => ({
  default: {
    push: vi.fn()
  }
}));
vi.mock("jwt-decode", () => ({
  default: vi.fn()
}));

describe("Auth Store", () => {
  let auth: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    auth = useAuthStore();
    localStorage.clear();
    vi.resetAllMocks();
  });

  describe("login", () => {
    it("should set token, user and navigate on successful login", async () => {
      const fakeResponse = {
        data: {
          accessToken: "token123",
          userId: "u1",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          accountType: "admin"
        },
        isSuccessful: true,
        errors: []
      };
      (ApiService.post as Mock).mockResolvedValueOnce(fakeResponse);
      (jwtDecode as unknown as Mock).mockReturnValue({
        exp: Date.now() / 1000 + 3600
      });

      await auth.login({ email: "john@example.com", password: "pass" });

      expect(auth.accessToken).toBe("token123");
      expect(auth.user).toMatchObject({
        id: "u1",
        firstName: "John",
        lastName: "Doe"
      });
      expect(localStorage.getItem("accessToken")).toBe("token123");
      expect(router.push).toHaveBeenCalledWith({ name: ROUTES.HOME.name });
    });

    it("should throw on login error", async () => {
      (ApiService.post as Mock).mockResolvedValueOnce({
        isSuccessful: false,
        errors: ["Bad creds"]
      });
      await expect(auth.login({ email: "x", password: "y" })).rejects.toThrow(
        "Bad creds"
      );
    });
  });

  describe("ssoLogin", () => {
    it("should perform SSO and navigate", async () => {
      const fake = {
        data: {
          accessToken: "t",
          userId: "u",
          firstName: "A",
          lastName: "B",
          email: "",
          accountType: ""
        },
        isSuccessful: true,
        errors: []
      };
      (ApiService.post as Mock).mockResolvedValueOnce(fake);
      (jwtDecode as unknown as Mock).mockReturnValue({
        exp: Date.now() / 1000 + 3600
      });
      await auth.ssoLogin("id-token");
      expect(auth.accessToken).toBe("t");
      expect(auth.user!.id).toBe("u");
      expect(router.push).toHaveBeenCalled();
    });
  });

  describe("requestPasswordReset", () => {
    it("resolves on success", async () => {
      (ApiService.post as Mock).mockResolvedValueOnce({
        isSuccessful: true,
        errors: []
      });
      await expect(
        auth.requestPasswordReset({ email: "e" })
      ).resolves.toBeUndefined();
    });
    it("throws on failure", async () => {
      (ApiService.post as Mock).mockResolvedValueOnce({
        isSuccessful: false,
        errors: ["err"]
      });
      await expect(auth.requestPasswordReset({ email: "e" })).rejects.toThrow(
        "err"
      );
    });
  });

  describe("confirmPasswordReset", () => {
    it("navigates to login on success", async () => {
      (ApiService.post as Mock).mockResolvedValueOnce({
        isSuccessful: true,
        errors: []
      });
      await auth.confirmPasswordReset({ token: "t", password: "p" });
      expect(router.push).toHaveBeenCalledWith({ name: ROUTES.LOGIN.name });
    });
  });

  describe("changePassword", () => {
    it("resolves on success", async () => {
      (ApiService.post as Mock).mockResolvedValueOnce({
        isSuccessful: true,
        errors: []
      });
      await expect(
        auth.changePassword({ oldPassword: "a", newPassword: "b" })
      ).resolves.toBeUndefined();
    });
  });

  describe("logout", () => {
    it("clears state and navigates", async () => {
      (ApiService.post as Mock).mockResolvedValueOnce({});
      auth.user = {
        id: "u1",
        firstName: "",
        lastName: "",
        email: "",
        accountType: ""
      };
      auth.accessToken = "t";
      auth.tokenExpiration = 123;
      localStorage.setItem("accessToken", "t");

      await auth.logout();
      expect(auth.user).toBeNull();
      expect(auth.accessToken).toBeNull();
      expect(localStorage.getItem("accessToken")).toBeNull();
      expect(router.push).toHaveBeenCalledWith({ name: ROUTES.LOGIN.name });
    });
  });

  describe("refreshToken", () => {
    it("refreshes token on success", async () => {
      const fake = {
        data: {
          accessToken: "new-token",
          userId: "",
          firstName: "",
          lastName: "",
          email: "",
          accountType: ""
        },
        isSuccessful: true,
        errors: []
      };
      (ApiService.post as Mock).mockResolvedValueOnce(fake);
      (jwtDecode as unknown as Mock).mockReturnValue({
        exp: Date.now() / 1000 + 3600
      });
      await auth.refreshToken();
      expect(auth.accessToken).toBe("new-token");
      expect(localStorage.getItem("accessToken")).toBe("new-token");
    });

    it("logs out on failure", async () => {
      (ApiService.post as Mock).mockRejectedValueOnce(new Error("fail"));
      const spyLogout = vi.spyOn(auth, "logout");
      await expect(auth.refreshToken()).rejects.toThrow();
      expect(spyLogout).toHaveBeenCalled();
    });
  });

  describe("checkAuth", () => {
    it("returns false with no token", async () => {
      expect(await auth.checkAuth()).toBe(false);
    });

    it("returns true if valid stored token and user", async () => {
      localStorage.setItem("accessToken", "t");
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "u",
          firstName: "x",
          lastName: "y",
          email: "",
          accountType: ""
        })
      );
      (jwtDecode as unknown as Mock).mockReturnValue({
        exp: Date.now() / 1000 + 1000,
        sub: "u"
      });
      expect(await auth.checkAuth()).toBe(true);
      expect(auth.user!.id).toBe("u");
    });
  });
});
