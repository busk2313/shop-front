<template>
  <Transition>
    <div v-if="visible" class="m-auto w-4/5 mt-4 flex flex-wrap items-center gap-2 min-h-10">
      <div
        v-for="item in list"
        :key="item.id"
        class="py-2 px-4 border-border border-2 rounded-xl cursor-pointer hover:bg-surface font-semibold text-base"
        :class="{ 'bg-accent !border-0 hover:bg-accent': item.id === modelValue?.id }"
        @click="handleCategorySelect(item)"
      >
        {{ item.title }}
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Category } from '@/interfaces/common.ts'
import HttpHandler from '@/api/http.ts'
import CategoryRepository from '@/modules/category/category.repository.ts'

defineProps<{
  modelValue: Category | null
  visible: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const list = ref<Category[]>([])

onMounted(async () => {
  await HttpHandler.use({
    request: () => CategoryRepository.getList(),
    onSuccess: (data) => {
      list.value = data
    },
    onError: (e) => {
      console.error(e)
    },
  })
})

function handleCategorySelect(val: Category) {
  emit('update:modelValue', val)
}
</script>

<style lang="scss" scoped>
.v-enter-from,
.v-leave-to {
  overflow: hidden;
  margin-top: 0;
  height: 0;
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all .2s;
}
</style>
