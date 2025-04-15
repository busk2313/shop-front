<template>
  <Transition :name="screen.sm ? 'slide-bottom' : 'slide-right'">
    <div v-if="visible" class="p-3 absolute bottom-0 md:bottom-4 md:right-4 w-full md:w-[398px] bg-white rounded-2xl shadow-xl z-50">
      <div class="flex items-center">
        <img
          v-if="type === 'error'"
          alt="error"
          src="@/assets/icon/error-toast.svg"
        >

        <img
          v-else
          alt="success"
          src="@/assets/icon/success-toast.svg"
        >

        <span class="text-primary text-base font-bold mx-3">{{ text }}</span>

        <BaseIcon
          class="cursor-pointer ml-auto shrink-0 text-label-secondary"
          name="cross"
          @click="handleManualClose"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useScreen } from '@/composables/useScreen.ts'
import BaseIcon from '@/ui/BaseIcon.vue'

defineProps<{
  type: string
  text: string
}>()

const { screen } = useScreen()

const visible = ref(false)

onMounted(() => {
  visible.value = true

  setTimeout(() => {
    visible.value = false
  }, 2000)
})

function handleManualClose() {
  visible.value = false
}
</script>

<style lang="scss" scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all .2s;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  margin-right: 0;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: all .2s;
}

.slide-bottom-enter-from,
.slide-bottom-leave-to {
  transform: translateY(100%);
}
</style>
