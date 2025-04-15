<template>
  <div
    class="flex items-center justify-between h-10 px-2 border-border border-2 rounded-xl w-[102px]"
    :class="{ 'pointer-events-none opacity-50': disable }"
  >
    <BaseIcon
      class="cursor-pointer"
      name="minus"
      @click="handleCounterDecrement"
    />

    <span class="select-none">{{ _modelValue }}</span>

    <BaseIcon
      class="cursor-pointer"
      name="plus"
      @click="handleCounterIncrement"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/ui/BaseIcon.vue'

const props = defineProps<{
  count: number
  disable?: boolean
}>()

const emit = defineEmits(['change'])

const _modelValue = computed({
  get: () => props.count,
  set: val => emit('change', val),
})

function handleCounterDecrement() {
  _modelValue.value--
}

function handleCounterIncrement() {
  _modelValue.value++
}
</script>
