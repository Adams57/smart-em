<template>
  <div class="p-4 pb-0 whitespace-nowrap flex-1 h-full flex flex-col">
    <slot name="header" />
    <slot name="table" />
    <slot name="dialogs" />
    <slot name="paginator" />
  </div>
</template>
