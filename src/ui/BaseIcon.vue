<template>
  <Component
    :is="iconComponent"
    role="img"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps<{
  name: string
}>()

const iconComponent = computed(() => {
  const name = props.name

  return defineAsyncComponent(() => import(`./icons/${name}.vue`))
})
</script>
