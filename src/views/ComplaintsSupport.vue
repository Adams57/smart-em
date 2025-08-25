<template>
  <div class="p-7 flex flex-col gap-6">
    <pr-tabs v-model:value="selectedTab">
      <pr-tab-list>
        <pr-tab :value="0">Raise Complaint</pr-tab>
        <pr-tab :value="1">My Ticket</pr-tab>
        <pr-tab :value="2">Live Support</pr-tab>
        <pr-tab :value="3">FAQ & Help</pr-tab>
      </pr-tab-list>
      <pr-tab-panels>
        <pr-tab-panel :value="0">
          <div
            class="flex-1 flex flex-col gap-7 mx-[-18px] mt-[-15px] px-4 py-6 card-color">
            <h2 class="text-xl font-semibold">Prepaid Recharge</h2>
            <form @submit.prevent="submitForm">
              <div class="flex flex-col gap-4">
                <div>
                  <div class="flex justify-between">
                    <label
                      for="complaintCategory"
                      class="font-medium text-[16px]"
                      >Complaint Category</label
                    >
                  </div>
                  <pr-select
                    id="complaintCategory"
                    v-model="complaintCategory"
                    class="w-full"
                    autocomplete="off"
                    placeholder="Select category" />
                </div>
                <div>
                  <div class="flex justify-between">
                    <label for="priority" class="font-medium text-[16px]"
                      >Priority</label
                    >
                  </div>
                  <pr-select
                    id="priority"
                    v-model="priority"
                    class="w-full"
                    autocomplete="off"
                    placeholder="Select priority" />
                </div>
                <div>
                  <div class="flex justify-between">
                    <label for="priority" class="font-medium text-[16px]"
                      >Description</label
                    >
                  </div>
                  <pr-textarea
                    id="priority"
                    v-model="priority"
                    rows="8"
                    class="w-full"
                    autocomplete="off"
                    placeholder="Describe your issue in detail" />
                </div>
              </div>
            </form>
            <div class="flex items-center justify-end">
              <pr-button
                label="Save Schedule"
                class="w-[200px]"
                @click="submitForm" />
            </div>
          </div>
        </pr-tab-panel>
        <pr-tab-panel :value="1">
          <div
            class="flex-1 flex flex-col gap-7 mx-[-18px] mt-[-15px] px-4 py-6 card-color">
            <div
              v-for="value in tickets"
              :key="value.title"
              class="flex justify-between p-2 border border-[var(--color-border-300)] dark:border-[#555] rounded-[10px]">
              <div>
                <h2 class="mb-3 text-[16px] font-semibold">
                  {{ value.subject }}
                </h2>
                <h2 class="text-xl font-semibold">{{ value.title }}</h2>
                <h2
                  class="font-medium text-[16px] mt-1 text-[#606060] dark:text-gray-300">
                  {{ value.ticketId }}
                </h2>

                <h2
                  class="font-medium text-[16px] mt-5 text-[#606060] dark:text-gray-300">
                  {{ value.message }}
                </h2>
                <h2
                  class="font-medium text-[16px] mt-1 mb-3 text-[#606060] dark:text-gray-300">
                  {{ value.date }}
                </h2>
              </div>
              <p class="font-semibold" :style="{ color: value.color }">
                {{ value.status }}
              </p>
            </div>
          </div>
        </pr-tab-panel>
        <pr-tab-panel :value="2">
          <div class="mx-[-18px] mt-[-15px] px-4 py-4 card-color">
            <h2 class="text-xl font-semibold">Prepaid Recharge</h2>
            <div class="mx-[-16px] mb-[-40px] mt-[-15px] px-4 py-6 card-color">
              <div
                class="border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-[10px]">
                <div class="mx-3 my-5 text-right">
                  <p>Hello Support</p>
                  <p>Good afternoon</p>
                </div>

                <div
                  class="border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]"></div>
                <div class="flex mx-3 my-5 items-center">
                  <p>
                    <span class="text-[#0768C2] font-medium"
                      >Support Agent: </span
                    >Hello. Good afternoon. How can we help you
                  </p>
                </div>

                <div
                  class="border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]"></div>
                <div class="mx-3 my-5 text-right">
                  <p>
                    My complaint with ticket number #47848879 - blocked meter is
                    yet to be attended to.
                  </p>
                  <p>
                    I will be grateful if this issue is resolved as soon as
                    possible.
                  </p>
                </div>

                <div
                  class="border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]"></div>
                <div class="flex mx-3 my-5 items-center">
                  <p>
                    <span class="text-[#0768C2] font-medium"
                      >Support Agent: </span
                    >We are so sorry about the delay. We will escalate it for
                    urgent attention
                  </p>
                </div>

                <div
                  class="border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]"></div>
                <div class="mx-3 my-5 text-right">
                  <p>Alright. Thank you very much for your prompt response.</p>
                  <p>I will be waiting.</p>
                </div>

                <div
                  class="border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]"></div>
                <div class="flex mx-3 my-5 items-center">
                  <p>
                    <span class="text-[#0768C2] font-medium"
                      >Support Agent: </span
                    >Thank you very much for your patience. Do have a nice day.
                  </p>
                </div>

                <div
                  class="mb-7 border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]"></div>
              </div>
            </div>
          </div>

          <div
            class="flex-1 mt-4 mb-[-18px] mx-[-18px] pt-14 px-6 bg-[#F6F6F6] dark:bg-dark-200">
            <div
              class="flex items-center px-2 py-1 bg-white dark:bg-[var(--p-content-border-color)] border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-[10px]">
              <!-- Input -->
              <pr-input-text
                id="liveMessage"
                v-model="liveMessage"
                class="flex-1 border-none focus:ring-0"
                autocomplete="off"
                placeholder="Type your message" />

              <!-- Send Icon -->
              <button
                type="button"
                class="text-blue-500 hover:text-blue-600 ml-2"
                @click="sendMessage">
                <v-icon name="fa-telegram-plane" scale="1.4" />
              </button>
            </div>
          </div>
        </pr-tab-panel>
        <pr-tab-panel :value="3">
          <div class="flex-1 mx-[-18px] mt-[-15px] px-4 py-6 card-color">
            <div
              class="border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] rounded-[10px]">
              <h2 class="mx-3 my-5 text-xl font-semibold">
                Frequently asked Questions
              </h2>
              <div class="mx-3 my-5">
                <p class="font-bold text-[18px]">
                  How do I read my smart meter?
                </p>
                <p class="text-[15px] text-gray-400">
                  Your smart meter displays real-time usage data. The main
                  screen shows current consumption in kW...
                </p>
              </div>
              <div
                class="border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]"></div>

              <div class="mx-3 my-5">
                <p class="font-bold text-[18px]">
                  What payment methods are accepted?
                </p>
                <p class="text-[15px] text-gray-400">
                  We accept credit cards, bank transfer, and digital wallets for
                  both prepaid and postpaid payments...
                </p>
              </div>
              <div
                class="border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)]"></div>

              <div class="mx-3 my-5">
                <p class="font-bold text-[18px]">
                  How do I report a power outage?
                </p>
                <p class="text-[15px] text-gray-400">
                  You can report outage through the app website, or by calling
                  our emergency lines...
                </p>
              </div>
              <div
                class="border border-[var(--color-border-300)] dark:border-[var(--p-content-border-color)] mb-7"></div>
            </div>
          </div>
        </pr-tab-panel>
      </pr-tab-panels>
    </pr-tabs>
  </div>
</template>

<script setup lang="ts">
  import { tickets } from "@/components/dummyData";
  import { ref } from "vue";
  const selectedTab = ref(0);
  const complaintCategory = ref("");
  const priority = ref("");
  const liveMessage = ref("");

  const submitForm = () => {
    //
  };

  const sendMessage = () => {
    //
  };
</script>

<style scoped>
  :deep(.p-tablist-tab-list) {
    background-color: transparent;
  }

  :deep(.p-tab-active) {
    background-color: white;
  }

  :deep(.p-tabpanels) {
    border-radius: 10px;
    border-top-left-radius: 0px;
  }

  :deep(.p-inputtext) {
    border: none;
    box-shadow: none;
  }

  @media (prefers-color-scheme: dark) {
    :deep(.p-tab-active) {
      background-color: var(--color-dark-100) /* #2f2f35 */;
    }
    :deep(.p-tablist-tab-list) {
      background-color: transparent;
    }
    .card-color {
      background-color: var(--color-dark-100) /* #2f2f35 */;
    }
  }
</style>
