<template>
  <BaseDialog
    v-model="_modelValue"
    :full-height="!!orderStore.state.list.length"
    title="Заказы"
    :width="495"
  >
    <div class="mt-8 flex flex-col flex-auto overflow-y-auto gap-6">
      <template v-if="orderStore.state.list.length">
        <OrderCard
          v-for="order in orderStore.state.list"
          :key="order.id"
          :order="order"
          @open="handleItemOpen(order.id)"
        />
      </template>

      <NoDataPlug v-else text="Пока заказов нет" />
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseDialog from '@/ui/BaseDialog.vue'
import OrderCard from '@/modules/order/components/OrderCard.vue'
import NoDataPlug from '@/components/NoDataPlug.vue'
import { useOrderStore } from '@/store/order.ts'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const router = useRouter()

const orderStore = useOrderStore()

const _modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

function handleItemOpen(id: number) {
  router.push({ name: 'Home', query: { dialog: 'order-item', id } })
}
</script>
