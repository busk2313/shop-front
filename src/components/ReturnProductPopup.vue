<template>
  <div class="flex gap-5 bg-surface-inverse text-white px-4 py-3 rounded-xl ">
    <span class="text-base">{{ `Вернуть товар "${product.name}"?` }}</span>

    <span class="cursor-pointer text-base font-semibold" @click="handleProductReturn">
      Вернуть
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  product: any
}>()

const emit = defineEmits(['return'])

function handleProductReturn() {
  emit('return', props.product)
}
</script>
