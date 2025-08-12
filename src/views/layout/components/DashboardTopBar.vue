<template>
  <div class="flex items-center gap-4 p-4 justify-between">
    <header class="flex gap-2 items-center">
      <img src="/soma.svg" />
      <h1 class="text-2xl font-bold mr-15 text-[#0084FF]">SmartEM</h1>
      <h1 class="font-semibold text-4xl ml-15">{{ routeName }}</h1>
    </header>
    <div class="flex gap-3 items-center">      
      <div class="text-[#0084FF] text-2xl font-medium">
        {{ firstName ? 'Welcome' : '' }}
        <span class="font-bold">{{ firstName }}</span>
      </div>
      <!-- Notification with dropdown-->
      <div class="relative group">
        <button
          class="relative cursor-pointer w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center"
          @click="openNotifications">
          <v-icon scale="1.2" name="fa-regular-bell" />
          <span
            class="bg-blue-400 w-1.5 h-1.5 absolute right-2.5 top-1.5 rounded-full" />
        </button>

        <!-- Notifications -->
        <div
          class="absolute right-0 top-full mt-2 pt-2 px-2 w-130 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 transition-all duration-200 z-50 flex flex-col max-h-[80vh]"
          v-if="showNotifications">
          <button
            class="my-1 ml-auto cursor-pointer"
            @click="closeNotifications">
            <v-icon scale="1.2" name="bi-x-lg" />
          </button>
          <div
            class="flex justify-between rounded-md p-1 bg-[#F6F6F6] text-center">
            <div
              @click="activeTab = 'all'"
              class="w-1/2 rounded-md p-1 cursor-pointer"
              :class="activeTab === 'all' ? 'bg-white text-primary' : ''">
              All
            </div>
            <div
              @click="activeTab = 'unread'"
              class="w-1/2 rounded-md p-1 cursor-pointer"
              :class="activeTab === 'unread' ? 'bg-white text-primary' : ''">
              Unread (7)
            </div>
          </div>
          <div class="content overflow-y-auto px-2 py-3 flex-1">
            <div>
              <p class="text-[#626265] my-4">RECENT</p>
              <div
                v-for="i of activeTab === 'all' ? 3 : 10"
                :key="i"
                class="flex gap-2 items-start border-b border-neutral-200 dark:border-neutral-700 p-3">
                <div
                  class="relative w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <v-icon scale="1.2" name="fa-regular-bell" />
                </div>
                <div>
                  <p class="text-[15px]">
                    Activity <b>‘Well Servicing’</b> is due on 25th May 2025
                  </p>
                  <p class="text-xs text-[#626265]">6 hours ago</p>
                </div>
                <span
                  v-if="activeTab === 'unread'"
                  class="bg-blue-400 w-1.5 h-1.5 mt-3 rounded-full ml-auto" />
              </div>
            </div>
            <div>
              <p class="text-[#626265] my-4">OLDER</p>
              <div
                v-for="i of 3"
                :key="i"
                class="flex gap-2 items-start border-b border-neutral-200 dark:border-neutral-700 p-3">
                <div
                  class="relative w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <v-icon scale="1.2" name="fa-regular-bell" />
                </div>
                <div>
                  <p class="text-[15px]">
                    A new look at the <b>Task Master</b> layout. View the
                    updates now.
                  </p>
                  <p class="text-xs text-[#626265]">17th Apr, 2025 09:20AM</p>
                </div>
                <span
                  v-if="activeTab === 'unread'"
                  class="bg-blue-400 w-1.5 h-1.5 mt-3 rounded-full" />
              </div>
            </div>
          </div>
          <div
            class="flex justify-between p-4 pt-2 border-t border-neutral-200 dark:border-neutral-700">
            <pr-button
              type="submit"
              variant="text"
              form="form"
              class="flex items-center"
              ><v-icon scale="1.2" name="bi-check2-all" />
              <span>Mark all as read</span>
            </pr-button>
            <pr-button
              type="button"
              label="See all notifications"
              variant="outlined" />
          </div>
        </div>
      </div>

      <!-- Avatar with dropdown -->
      <div class="relative group">
        <button
          class="relative cursor-pointer w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
          <pr-avatar v-if="userImage" :image="userImage" shape="circle" />
          <pr-avatar v-else shape="circle" size="medium">{{
            initials
          }}</pr-avatar>
          <span
            class="bg-green-400 w-3 h-3 absolute right-1.5 bottom-1.5 rounded-full border-2 border-white" />
        </button>

        <!-- Dropdown menu -->
        <div
          class="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <!-- User info section -->
          <div class="p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div class="flex items-center gap-3">
              <pr-avatar
                v-if="userImage"
                :image="userImage"
                shape="circle"
                size="small" />
              <pr-avatar v-else shape="circle" size="small">{{
                initials
              }}</pr-avatar>
              <div class="flex-1">
                <p
                  class="font-semibold whitespace-nowrap overflow-ellipsis max-w-[170px] overflow-hidden">
                  {{ fullName }}
                </p>
                <p
                  class="text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap overflow-ellipsis max-w-[170px] overflow-hidden">
                  {{ userEmail }}
                </p>
              </div>
            </div>
          </div>

          <!-- Menu items -->
          <div class="py-1">
            <a
              href="#"
              class="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">
              <v-icon name="fa-user" class="mr-3 text-neutral-500" />
              Profile
            </a>
            <a
              href="#"
              class="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">
              <v-icon name="fa-cog" class="mr-3 text-neutral-500" />
              Settings
            </a>
            <a
              href="#"
              class="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">
              <v-icon name="fa-question-circle" class="mr-3 text-neutral-500" />
              Help
            </a>
          </div>

          <!-- Logout -->
          <div class="p-2 border-t border-neutral-200 dark:border-neutral-700">
            <button
              @click="handleLogout"
              class="w-full flex items-center justify-center px-4 py-2 text-sm text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
              <v-icon name="fa-sign-out-alt" class="mr-3" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from "vue";
  import { useRoute } from "vue-router";
  import { useAuthStore } from "@/store/auth";
  import { useToast } from "primevue/usetoast";
  const route = useRoute();
  const authStore = useAuthStore();
  const toast = useToast();
  const showNotifications = ref(false);
  const activeTab = ref<"all" | "unread">("all");

  const openNotifications = () => {
    showNotifications.value = true;
  };

  const closeNotifications = () => {
    showNotifications.value = false;
  };

  const routeName = computed(() => {
    const name = route.name as string;
    if (!name) return "";
    if (name.includes("Settings")) {
      return "Settings";
    }
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
  });

  // Get user info from auth store
  const fullName = computed(() => authStore.fullName || "Guest");
  const firstName = computed(() => authStore.firstName || "Guest");
  const userEmail = computed(() => authStore.user?.email || "");

  // **NEW** initials and image getters
  const initials = computed(() => {
    if (!authStore.user) return "";
    const [f, l] = [authStore.user.firstName, authStore.user.lastName];
    return `${f?.[0] || ""}${l?.[0] || ""}`.toUpperCase();
  });

  const userImage = computed(() => {
    // return authStore.user?.imageUrl || "https://primefaces.org/cdn/primevue/images/organization/walter.jpg";
    return authStore.user?.imageUrl || null;
  });

  // Handle logout
  const handleLogout = async () => {
    try {
      await authStore.logout();
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Successfully signed out",
        life: 3000
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Logout failed";
      toast.add({
        severity: "error",
        summary: "Error",
        detail: errorMessage,
        life: 3000
      });
    }
  };
</script>
