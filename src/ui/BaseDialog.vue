<template>
  <Teleport to="#dialog">
    <Transition
      @after-enter="isInnerBoxVisible = true"
      @after-leave="isInnerBoxVisible = false"
    >
      <div
        v-if="modelValue"
        class="flex w-screen h-screen bg-dialog-bg-mobile md:bg-dialog-bg md:justify-end z-30 relative md:p-4"
      >
        <Transition
          :name="screen.sm ? 'slide-bottom' : 'slide-right'"
          @after-leave="closeModalOverlay"
        >
          <div
            v-if="isInnerBoxVisible"
            class="rounded-xl flex flex-col p-4 bg-white w-full mt-auto"
            :class="{ 'h-full': fullHeight && !screen.sm, 'max-h-[90%]': screen.sm }"
            :style="{ ...(!screen.sm && { width: width ? `${width}px` : '40%' }) }"
          >
            <div class="flex items-center relative h-9">
              <div
                v-if="hasBackBtn && !hideBackBtn"
                class="shadow-md rounded-full w-[26px] h-[26px] rotate-90 flex items-center justify-center p-1.5 absolute left-0 cursor-pointer"
                @click="handleGoBack"
              >
                <BaseIcon name="chevron" />
              </div>

              <span class="font-semibold md:font-bold text-lg md:text-3xl mx-auto">{{ title }}</span>

              <div class="shadow-md rounded-full w-fit p-1.5 absolute right-0 cursor-pointer" @click="handleClose">
                <BaseIcon name="cross" />
              </div>
            </div>

            <slot />

            <slot :close="handleClose" name="footer" />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue'
import { useRouter } from 'vue-router'
import { useScreen } from '@/composables/useScreen.ts'
import BaseIcon from '@/ui/BaseIcon.vue'
import { MODAL_CLOSE_NAVIGATIONS } from '@/constants/common.ts'

const props = defineProps<{
  modelValue: boolean
  title?: string
  width?: number
  fullHeight?: boolean
  hideBackBtn?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const router = useRouter()

const { screen } = useScreen()

const isInnerBoxVisible = ref(false)
const hasBackBtn = computed(() => window.history.state.back)
const afterCloseNavigation = ref(MODAL_CLOSE_NAVIGATIONS.CLOSE)

function handleClose() {
  isInnerBoxVisible.value = false

  afterCloseNavigation.value = MODAL_CLOSE_NAVIGATIONS.CLOSE
}

function handleGoBack() {
  isInnerBoxVisible.value = false

  afterCloseNavigation.value = MODAL_CLOSE_NAVIGATIONS.BACK
}

function closeModalOverlay() {
  if (props.hideBackBtn) {
    emit('update:modelValue', false)
    return
  }

  if (afterCloseNavigation.value === MODAL_CLOSE_NAVIGATIONS.CLOSE) {
    router.push({ name: 'Home' })
    return
  }

  if (afterCloseNavigation.value === MODAL_CLOSE_NAVIGATIONS.BACK)
    router.go(-1)
}
</script>

<style lang="scss">
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
