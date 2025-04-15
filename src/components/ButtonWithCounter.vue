<template>
  <div class="relative">
    <div
      v-if="bottomPlacement && count"
      class="border-white border-2 bg-decorative-red w-2 h-2 rounded-full absolute -bottom-1 right-0 left-0 m-auto"
    />

    <template v-else>
      <div
        v-if="count"
        class="text-primary md:text-white border-white border-2 flex items-center justify-center -top-1 md:-top-2 bg-accent md:bg-decorative-red w-6 h-6 rounded-full text-xs font-bold absolute -right-4 md:-right-2"
      >
        {{ count }}
      </div>
    </template>

    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  count?: number
  bottomPlacement?: boolean
}>()
</script>
