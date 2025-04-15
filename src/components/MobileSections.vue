<template>
  <div v-bind="$attrs" class="bg-white rounded-2xl p-3 shadow-md flex gap-6 justify-between items-center">
    <ButtonWithCounter :count="favoriteCount">
      <Button class="!bg-transparent" @click="handleFavoritesToggle">
        <template #default>
          <BaseIcon name="heart" />
        </template>
      </Button>
    </ButtonWithCounter>

    <ButtonWithCounter bottom-placement :count="ordersAmount">
      <Button class="!bg-transparent" @click="handleOrdersToggle">
        <template #default>
          <BaseIcon name="box" />
        </template>
      </Button>
    </ButtonWithCounter>

    <ButtonWithCounter :count="cartItemsAmount">
      <Button class="!bg-transparent" @click="handleCartToggle">
        <template #default>
          <BaseIcon name="cart" />
        </template>
      </Button>
    </ButtonWithCounter>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from 'beeline-design-system-vue3'
import { storeToRefs } from 'pinia'
import ButtonWithCounter from '@/components/ButtonWithCounter.vue'
import BaseIcon from '@/ui/BaseIcon.vue'
import { useOrderStore } from '@/store/order.ts'
import { useFavoriteStore } from '@/store/favorite.ts'
import { useCartStore } from '@/store/cart.ts'

const router = useRouter()

const { ordersAmount } = storeToRefs(useOrderStore())
const { favoriteCount } = storeToRefs(useFavoriteStore())
const { cartItemsAmount } = storeToRefs(useCartStore())

function handleCartToggle() {
  router.push({ name: 'Home', query: { dialog: 'cart' } })
}

function handleOrdersToggle() {
  router.push({ name: 'Home', query: { dialog: 'orders' } })
}

function handleFavoritesToggle() {
  router.push({ name: 'Home', query: { dialog: 'favorite' } })
}
</script>
