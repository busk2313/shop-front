<template>
  <div class="flex flex-col h-full">
    <Header v-if="!screen.sm" />

    <MobileHeader v-else :shrink="isHeaderShrink" />

    <div ref="listContainer" class="h-full overflow-y-auto md:w-4/5 md:m-auto px-4 md:px-0">
      <RouterView />
    </div>

    <MobileSections v-if="screen.sm" class="absolute bottom-8 right-4" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useScreen } from '@/composables/useScreen.ts'
import MobileHeader from '@/components/header/MobileHeader.vue'
import Header from '@/components/header/Header.vue'
import MobileSections from '@/components/MobileSections.vue'

const { screen } = useScreen()

const isHeaderShrink = ref(false)
const listContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (listContainer.value)
    listContainer.value.addEventListener('scroll', handleListScrollCheck)
})

onUnmounted(() => {
  if (listContainer.value)
    listContainer.value.removeEventListener('scroll', handleListScrollCheck)
})

function handleListScrollCheck() {
  if (listContainer.value)
    isHeaderShrink.value = listContainer.value.scrollTop > 0
}
</script>
