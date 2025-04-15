<template>
  <div class="relative">
    <Button
      class="!min-w-0 !bg-transparent"
      size="s"
      @click="handleDropdownToggle"
    >
      <template #default>
        <BaseIcon name="more" />
      </template>
    </Button>

    <template v-if="isDropdownVisible">
      <div class="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-10" @click.self="handleDropdownToggle" />

      <div
        class="absolute translate-y-2 right-0 flex flex-col rounded-xl shadow-sm shadow-black p-5 bg-white z-20 w-max"
        :class="{ '-top-full': top }"
      >
        <div class="flex items-center gap-3 pb-4 cursor-pointer" @click="handleFavoriteToggle">
          <BaseIcon class="text-danger" :name="isFavorite ? 'heart' : 'heart-outlined'" />

          <span class="text-sm font-medium action-item relative">{{ isFavorite ? 'Убрать из избранного' : 'Добавить в избранное' }}</span>
        </div>

        <div class="flex items-center gap-3 pt-4 cursor-pointer" @click="handleRemove">
          <BaseIcon class="text-decorative-red" name="trash" />

          <span class="text-sm font-medium">Удалить товар</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'beeline-design-system-vue3'
import { ref } from 'vue'
import BaseIcon from '@/ui/BaseIcon.vue'

defineProps<{
  isFavorite: boolean
  top?: boolean
}>()

const emit = defineEmits(['remove', 'favoriteToggle'])

const isDropdownVisible = ref(false)

function handleDropdownToggle() {
  isDropdownVisible.value = !isDropdownVisible.value
}

function handleRemove() {
  emit('remove')
  handleDropdownToggle()
}

function handleFavoriteToggle() {
  emit('favoriteToggle')
  handleDropdownToggle()
}
</script>

<style lang="scss" scoped>
.action-item {
  &:after {
    content: '';
    height: 1px;
    width: calc(100% + 20px);
    position: absolute;
    bottom: -16px;
    left: 0;
    background-color: $color-border;
  }
}
</style>
