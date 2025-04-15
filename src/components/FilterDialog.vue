<template>
  <BaseDialog
    v-model="_modelValue"
    hide-back-btn
    title="Фильтры"
  >
    <div class="mt-6">
      <div class="flex items-center justify-between mb-8">
        <span class="font-medium text-base">Товары до 1200 coin</span>

        <Switch
          :checked="filterStore.state.limit"
          size="m"
          @change="handleLimitChange"
        />
      </div>

      <span class="text-base font-semibold">Сортировка</span>

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

    <template #footer="{ close }">
      <div class="mt-8 flex gap-2">
        <Button
          v-if="false"
          button-style="secondary"
          class="w-full"
          size="l"
          @click="close"
        >
          Закрыть
        </Button>

        <template v-else>
          <Button
            button-style="secondary"
            class="w-full"
            size="l"
          >
            Сбросить
          </Button>

          <Button
            class="w-full"
            size="l"
          >
            Применить
          </Button>
        </template>
      </div>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Button, RadioButton, Switch } from 'beeline-design-system-vue3'
import BaseDialog from '@/ui/BaseDialog.vue'
import type { FilterSortType } from '@/interfaces/common.ts'
import { SORT_TYPES } from '@/constants/common.ts'
import { useFilterStore } from '@/store/filter.ts'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const _modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const filterStore = useFilterStore()

const selectedValue = ref(SORT_TYPES.find(t => t.value === filterStore.state.sort)!.label)

watch(selectedValue, val => filterStore.state.sort = SORT_TYPES.find(t => t.label === val)!.value)

function handleLimitChange(val: Event) {
  filterStore.changeLimit((val.target as HTMLInputElement).checked)
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
      width: 92%;
      height: 1px;
      background-color: $color-border;
    }
  }
}
</style>
