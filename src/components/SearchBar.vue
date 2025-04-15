<template>
  <div class="search-bar bg-surface flex rounded-xl py-2 px-3 relative">
    <input
      v-model="_modelValue"
      class="search-bar__input cursor-text text-primary font-medium z-10"
      placeholder="Начните вводить название"
    >

    <div v-if="!_modelValue" class="search-bar__placeholder flex items-center gap-1 z-0">
      <BaseIcon class="text-label" name="search" />

      <span class="text-label">Поиск</span>
    </div>

    <BaseIcon
      v-if="_modelValue"
      class="search-bar__icon text-primary"
      name="search"
      @click="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/ui/BaseIcon.vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const _modelValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emit('update:modelValue', val)
  },
})

function handleSearch() {
  console.log('search')
}
</script>

<style lang="scss" scoped>
.search-bar {
  &__placeholder {
    position: absolute;
    height: 100%;
    bottom: 0;
  }

  &__input {
    background-color: transparent;
    width: 100%;
  }

  &__icon {
    position: absolute;
    right: 12px;
    height: 100%;
    bottom: 0;
    cursor: pointer;
    z-index: 20;
  }

  input:focus {
    &::placeholder {
      color: #B8B5C6;
      font-weight: 500;
    }
  }
  input:focus + .search-bar__placeholder {
    display: none;
  }
}

input::placeholder {
  color: transparent;
}
</style>
