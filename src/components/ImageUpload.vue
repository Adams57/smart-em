<template>
  <div
    class="w-[304px] h-[150px] border-1 border-[#8F8F91] border-dashed rounded-2xl flex items-center justify-center relative cursor-pointer"
    @dragover.prevent
    @dragenter.prevent
    @drop="handleDrop">
    <button
      v-if="uploadedImage"
      @click="removeUserImage"
      type="button"
      class="absolute -top-0 -right-0 bg-red-500 cursor-pointer text-white rounded-full w-5 h-5 hover:bg-red-600 transition-colors grid place-items-center">
      <v-icon name="io-close" scale="0.8" />
    </button>
    <input
      type="file"
      ref="fileInput"
      class="hidden"
      @change="handleFileInputChange" />
    <div
      class="flex flex-col items-center justify-center px-10 text-center"
      @click="openFilePicker"
      v-if="!uploadedImage">
      <div class="bg-[#F6F6F6] rounded-xl p-3 w-fit">
        <img src="../assets/image-icon.svg" />
      </div>
      <h1 class="font-bold text-lg mb-2">Upload photo</h1>
      <p class="text-sm">
        Drag & drop your image file here, or
        <span class="text-[#0C8CE9]">click</span> to select one.
      </p>
    </div>
    <img
      v-else
      :src="uploadedImage"
      alt="Uploaded"
      class="max-w-full max-h-full object-cover rounded-2xl" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const fileInput = ref<HTMLInputElement | null>(null);
  const uploadedImage = ref<string | null>(null);

  function openFilePicker() {
    if (fileInput.value) {
      fileInput.value.click();
    }
  }

  function handleFile(file: Blob) {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      uploadedImage.value = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  }

  const removeUserImage = (): void => {
    uploadedImage.value = null;
    if (fileInput.value) {
      fileInput.value.value = "";
    }
  };

  const handleFileInputChange = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      handleFile(file);
    }
  };
</script>
