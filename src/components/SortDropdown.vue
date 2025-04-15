<template>
  <div class="relative">
    <Button
      button-style="secondary"
      class="!min-w-0"
      icon-align="right"
      :label="selectedLabel"
      size="m"
      @click="handleDropdownToggle"
    >
      <template #default>
        <BaseIcon
          class="ml-1"
          :class="{ 'rotate-180': isDropDownVisible }"
          name="chevron"
        />
      </template>
    </Button>

    <template v-if="isDropDownVisible">
      <div class="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-10" @click.self="handleDropdownToggle" />

      <div class="absolute translate-y-2 flex flex-col rounded-xl shadow-md shadow-black px-4 bg-white z-20 w-max">
        <div
          v-for="type in SORT_TYPES"
          :key="type.value"
          class="sort-item py-4"
        >
          <RadioButton
            :label="type.label"
            :value="selectedValue"
            @change="handleSortSelect"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Button, RadioButton } from 'beeline-design-system-vue3'
import { computed, ref, watch } from 'vue'
import { SORT_TYPES } from '@/constants/common.ts'
import type { FilterSortType } from '@/interfaces/common.ts'
import BaseIcon from '@/ui/BaseIcon.vue'

const props = defineProps<{
  selected: FilterSortType
}>()

const emit = defineEmits(['change'])

const isDropDownVisible = ref(false)
const selectedValue = ref(SORT_TYPES.find(t => t.value === props.selected)!.label)

const selectedLabel = computed(() => SORT_TYPES.find(t => t.value === props.selected)!.label)

watch(selectedValue, val => emit('change', SORT_TYPES.find(t => t.label === val)!.value))

function handleDropdownToggle() {
  isDropDownVisible.value = !isDropDownVisible.value
}

function handleSortSelect(val: FilterSortType) {
  selectedValue.value = val
}
</script>

<style lang="scss" scoped>
.sort-item {
  label {
    &:after {
      content: '';
      position: absolute;
      bottom: -16px;
      right: 0;
      width: 85%;
      height: 1px;
      background-color: $color-border;
    }
  }
}
</style>
