import { defineStore } from "pinia";
import ApiService from "@/api";
import type { PaginatedResponse } from "@/types/responses";
import type { CreateUserRequest, UpdateUserRequest, User } from "@/types/auth";
import { handleApiError, type Pagination } from "@/types";

export const useUserStore = defineStore("users", {
  state: () => ({}),
  actions: {
    async fetchUsers(pagination: Pagination, usePaginationLastKey: boolean) {
      const params = new URLSearchParams();
      params.append(
        "PaginatedRequest.PageNumber",
        pagination.pageNumber.toString()
      );
      params.append(
        "PaginatedRequest.PageSize",
        pagination.pageSize.toString()
      );

      if (pagination.lastKey && usePaginationLastKey) {
        params.append("PaginatedRequest.LastKey", pagination.lastKey);
      }

      const { data } = await ApiService.get<
        PaginatedResponse<User & { departmentName: string; jobTitle: string }>
      >(`/Users?${params.toString()}`);
      return data;
    },
    async createNewUser(user: CreateUserRequest) {
      try {
        const { data } = await ApiService.post<User>("/Users", user);
        return data;
      } catch (error) {
        handleApiError(error || "Error creating user");
      }
    },
    async updateUser(user: UpdateUserRequest) {
      try {
        const { data } = await ApiService.put<User>("/Users", user);
        return data;
      } catch (error) {
        handleApiError(error || "Error update user");
      }
    },
    async downloadImportTemplate() {
      try {
        const response = await ApiService.get(
          `Users/download-import-template`,
          { responseType: "blob" }
        );
        const fileName = "Users_Import_Template";
        const url = window.URL.createObjectURL(response as unknown as Blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); // Set the download filename
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url); // Clean up
      } catch (error) {
        handleApiError(error || "Error downloading user template");
      }
    },
    async fetchUserById(id: string) {
      try {
        const { data } = await ApiService.get<User>(`/Users/${id}`);
        return data;
      } catch (error) {
        console.log("Error fetching user by ID:", error);
      }
    },
    async deleteUsers(ids: Array<string>) {
      try {
        const payload = {
          ids: Array.isArray(ids) ? ids : [ids]
        };
        const { data, errors, isSuccessful } = await ApiService.delete<User>(
          "/Users",
          {
            data: payload
          }
        );
        if (!isSuccessful) {
          handleApiError(errors?.join(", ") || "Error deleting users");
        }
        return data;
      } catch (error) {
        handleApiError(error || "Error deleting users");
      }
    }
  },
  getters: {}
});
