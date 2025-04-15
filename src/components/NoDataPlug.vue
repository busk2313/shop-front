<template>
  <div class="flex flex-col items-center justify-center gap-3">
    <img alt="no-data" src="@/assets/icon/no-data.svg">

    <span class="text-label text-sm md:text-base">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>
