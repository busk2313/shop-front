<template>
  <BaseDialog
    v-model="_modelValue"
    full-height
    :title="`Заказ ${route.query?.id}`"
    :width="495"
  >
    <div v-if="order?.id" class="mt-8 flex flex-col pl-2 flex-auto gap-8 overflow-y-hidden">
      <div class="flex flex-wrap">
        <span class="font-bold text-xl md:text-3xl">{{ order.status }}</span>

        <div class="basis-full flex gap-1 mt-3">
          <div class="w-1/3 h-1.5 bg-accent rounded-2xl" />
          <div class="w-1/3 h-1.5 bg-neutral-active rounded-2xl" />
          <div class="w-1/3 h-1.5 bg-neutral-active rounded-2xl" />
        </div>
      </div>

      <!--      <div class="flex flex-col gap-2 pb-4 border-b-2 border-border">
        <span class="md:text-xl md:font-bold text-base font-semibold">Адрес доставки</span>

        <span class="md:text-base text-sm text-label">Туран 44Б, 2 этаж</span>
      </div> -->

      <div class="flex flex-col gap-2 pb-4 border-b-2 border-border">
        <span class="md:text-xl md:font-bold text-base font-semibold">Дата доставки</span>

        <span class="md:text-base text-sm text-label">{{ formattedDate }}, 14:00-16:00</span>
      </div>

      <div class="flex justify-between">
        <span class="md:text-xl md:font-bold text-base font-semibold">Сумма заказа</span>

        <span class="md:text-xl md:font-bold text-base font-semibold">{{ `${order.sum} coin` }}</span>
      </div>

      <Button
        button-style="secondary"
        class="flex items-center gap-1 font-bold"
        icon-align="right"
        label="Чат с поддержкой"
        size="l"
      >
        <template v-if="!screen.sm" #default>
          <BaseIcon name="chat" />
        </template>
      </Button>

      <div class="flex flex-col overflow-y-auto">
        <span class="md:text-xl md:font-bold text-base font-semibold mb-3">Товары в заказе</span>

        <div class="flex flex-col gap-12">
          <ProductCard
            v-for="item in order.items"
            :key="item.product.id"
            :product="item.product"
          />
        </div>
      </div>
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { Button } from 'beeline-design-system-vue3'
import BaseDialog from '@/ui/BaseDialog.vue'
import BaseIcon from '@/ui/BaseIcon.vue'
import { useScreen } from '@/composables/useScreen.ts'
import ProductCard from '@/modules/product/components/ProductCard.vue'
import HttpHandler from '@/api/http.ts'
import OrderRepository from '@/modules/order/order.repository.ts'
import type { Order } from '@/interfaces/order.ts'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const { screen } = useScreen()
const route = useRoute()

const order = ref<Order>({} as Order)

const _modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const formattedDate = computed(() => dayjs(order.value?.created_at || '').format('DD.MM.YYYY'))

watch(_modelValue, (val) => {
  if (val)
    getOrder()
})

function getOrder() {
  if (route.query?.id) {
    HttpHandler.use({
      request: () => OrderRepository.getById(route.query.id as unknown as number),
      onSuccess: (data) => {
        order.value = data
      },
      onError: (e) => {
        console.error(e)
      },
    })
  }
}
</script>

<style scoped lang="scss">
.product-control {
  &:after {
    content: '';
    position: absolute;
    bottom: -24px;
    width: calc(100% + 16px);
    height: 1px;
    background-color: $color-border;
  }
}
</style>
