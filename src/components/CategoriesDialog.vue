<template>
  <BaseDialog
    v-model="_modelValue"
    hide-back-btn
    title="Категории"
  >
    <div class="mt-8 overflow-y-auto">
      <div
        class="flex items-center gap-2 py-4 border-b border-border"
        @click="handleClear"
      >
        <span class="text-base font-medium">Все</span>

        <span class="text-label text-base font-medium">123</span>

        <BaseIcon
          class="ml-auto text-label-disabled"
          :class="{ 'text-primary': !category }"
          name="check"
        />
      </div>

      <div
        v-for="val in CATEGORIES"
        :key="val.value"
        class="flex items-center gap-2 py-4 border-b border-border"
        @click="handleSelect({ title: val.label, name: val.value, id: val.id })"
      >
        <span class="text-base font-medium">{{ val.label }}</span>

        <span class="text-label text-base font-medium">{{ val.count }}</span>

        <BaseIcon
          class="ml-auto text-label-disabled"
          :class="{ 'text-primary': val.id === category?.id }"
          name="check"
        />
      </div>
    </div>

    <template #footer="{ close }">
      <Button
        button-style="secondary"
        class="w-full mt-8"
        size="l"
        @click="close"
      >
        Закрыть
      </Button>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Button } from 'beeline-design-system-vue3'
import { storeToRefs } from 'pinia'
import BaseDialog from '@/ui/BaseDialog.vue'
import BaseIcon from '@/ui/BaseIcon.vue'
import type { Category } from '@/interfaces/common.ts'
import { useFilterStore } from '@/store/filter.ts'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const CATEGORIES = [
  {
    label: 'Бутылки и посуда',
    value: 'bottle_dish',
    count: 3,
    id: 1,
  },
  {
    label: 'Брелки',
    value: 'keychain',
    count: 23,
    id: 1,
  },
  {
    label: 'Электроника',
    value: 'hardware',
    count: 2,
    id: 1,
  },
  {
    label: 'Худи',
    value: 'hoodies',
    count: 33,
    id: 1,
  },
  {
    label: 'Ручки',
    value: 'pen',
    count: 12,
    id: 1,
  },
  {
    label: 'Блокноты',
    value: 'notepad',
    count: 31,
    id: 1,
  },
  {
    label: 'Зонты',
    value: 'umbrella',
    count: 28,
    id: 1,
  },
]

const filterStore = useFilterStore()
const { category } = storeToRefs(filterStore)

const _modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

function handleSelect(val: Category) {
  filterStore.changeCategory(val)
}

function handleClear() {
  filterStore.clearCategory()
}
</script>
