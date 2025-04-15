<template>
  <div
    v-if="screen.sm && _modelValue"
    class="bg-dialog-bg-mobile fixed top-0 bottom-0 right-0 left-0 z-10"
    @click="handleManualClose"
  />

  <Transition :name="screen.sm ? 'slide-bottom' : 'slide-right'">
    <div v-if="_modelValue" class="p-6 absolute bottom-0 md:bottom-4 md:right-4 w-full md:w-[398px] bg-white rounded-2xl shadow-xl z-20">
      <template v-if="isProcessing">
        <div class="w-full h-1.5 rounded-2xl bg-accent-surface">
          <div class="w-0 h-full bg-accent rounded-2xl" :style="{ width: `${progress}%` }" />
        </div>

        <Button
          button-style="secondary"
          class="w-full mt-6"
          size="l"
          @click="handleManualClose"
        >
          Отменить оформление
        </Button>
      </template>

      <template v-else>
        <template v-if="isError">
          <div class="flex flex-col items-center justify-center">
            <img
              alt="error"
              class="mb-3"
              src="../../../assets/icon/error.svg"
            >

            <span class="text-label text-base">Ошибка при оформлении</span>
          </div>

          <Button
            button-style="secondary"
            class="w-full mt-8"
            size="l"
            @click="handleManualClose"
          >
            Закрыть
          </Button>
        </template>

        <template v-else>
          <div class="flex flex-col items-center justify-center">
            <img
              alt="error"
              class="mb-3"
              src="../../../assets/icon/success.svg"
            >

            <span class="text-label text-base">Заказ оформлен</span>
          </div>

          <div class="mt-8 flex justify-center">
            <Button
              button-style="secondary"
              class="mr-3 w-full"
              size="l"
              @click="handleManualClose"
            >
              Закрыть
            </Button>

            <Button
              class="w-full"
              size="l"
            >
              Перейти к заказу
            </Button>
          </div>
        </template>
      </template>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Button } from 'beeline-design-system-vue3'
import { useScreen } from '@/composables/useScreen.ts'

const props = defineProps<{
  modelValue: boolean
  orderId: number
}>()

const emit = defineEmits(['update:modelValue'])

const { screen } = useScreen()

const isError = ref(false)
const isProcessing = ref(true)
const progress = ref(0)
const intervalId = ref(0)
const timeoutId = ref(0)

const _modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

watch(_modelValue, (val) => {
  if (val)
    setCustomInterval()
  else
    clearCustomInterval()
})

function setCustomInterval() {
  clearCustomInterval()

  intervalId.value = window.setInterval(() => {
    progress.value += 1
  }, 100)

  timeoutId.value = window.setTimeout(() => {
    clearInterval(intervalId.value)

    isProcessing.value = false
  }, 10000)
}

function clearCustomInterval() {
  if (intervalId.value && timeoutId.value) {
    clearInterval(intervalId.value)
    clearTimeout(timeoutId.value)
    intervalId.value = 0
    timeoutId.value = 0
    progress.value = 0
  }
}

function handleManualClose() {
  _modelValue.value = false
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
