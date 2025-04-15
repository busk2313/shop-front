<template>
  <div class="flex flex-col gap-2">
    <span class="text-label text-sm">
      {{ formattedDate }}
    </span>

    <div class="bg-surface p-4 rounded-xl flex flex-wrap cursor-pointer" @click="handleItemOpen">
      <div class="flex flex-col mr-5 gap-1">
        <span class="text-label font-medium md:font-normal text-xs md:text-sm">Номер</span>

        <span class="text-base font-semibold">{{ order.id }}</span>
      </div>

      <div class="flex flex-col mr-5 grow md:grow-0 gap-1">
        <span class="text-label font-medium md:font-normal text-xs md:text-sm">Сумма</span>

        <span class="text-base font-semibold">{{ `${order.sum} coin` }}</span>
      </div>

      <div v-if="!screen.sm" class="flex flex-col gap-1">
        <span class="text-label text-sm">Товары</span>

        <div class="flex items-center gap-1">
          <img
            v-for="(image, index) in order.items.slice(0, 2)"
            :key="index"
            alt="product"
            class="w-6 h-6 object-fill rounded-full"
            :src="getImgUrl(image.product)"
          >

          <span v-if="(order.items.length - 2) > 0" class="text-xs font-bold text-label">
            {{ `+${order.items.length - 2}` }}
          </span>
        </div>
      </div>

      <div class="flex flex-col md:ml-auto gap-1">
        <span class="text-label font-medium md:font-normal text-xs md:text-sm">Статус</span>

        <div
          class="px-2 py-1 rounded-xl uppercase text-white font-medium md:font-bold text-xs"
          :class="statusColor"
        >
          {{ order.status }}
        </div>
      </div>

      <div class="basis-full flex gap-1 mt-4">
        <div class="w-1/3 h-1.5 bg-accent rounded-2xl" />
        <div class="w-1/3 h-1.5 bg-neutral-active rounded-2xl" />
        <div class="w-1/3 h-1.5 bg-neutral-active rounded-2xl" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'
import { useScreen } from '@/composables/useScreen.ts'
import type { Order } from '@/interfaces/order.ts'
import type { Product } from '@/interfaces/product.ts'

const props = defineProps<{
  order: Order
}>()

const emit = defineEmits(['open'])

const formattedDate = computed(() => dayjs(props.order.created_at).format('DD.MM.YYYY'))

const statusColor = computed(() => {
  if (props.order.status === 'Отменен')
    return 'bg-decorative-red'
  if (props.order.status === 'Доставлен')
    return 'bg-decorative-green'

  return 'bg-decorative-violet'
})

function getImgUrl(product: Product) {
  return product.images?.length
    ? `http://duken-plus-backend.k8s-dev.kar-tel.local/image/get/${product.images[0].id}`
    : '/img/product.png'
}

const { screen } = useScreen()
function handleItemOpen() {
  emit('open')
}
</script>
