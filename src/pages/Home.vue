<template>
  <Filter v-if="!screen.sm" />

  <div class="flex flex-wrap gap-7 md:flex-row flex-col w-full md:w-auto mb-4">
    <ProductCard
      v-for="item in productList"
      :key="item.id"
      :is-inline="false"
      :product="item"
    />
  </div>

  <ProductDialog v-model="dialogStore.state.product" />

  <FavoriteDialog v-model="dialogStore.state.favorite" />

  <CartDialog v-model="dialogStore.state.cart" />

  <OrdersListDialog v-model="dialogStore.state.orderList" />

  <OrderItemDialog v-model="dialogStore.state.orderItem" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScreen } from '@/composables/useScreen.ts'
import ProductCard from '@/modules/product/components/ProductCard.vue'
import Filter from '@/components/Filter.vue'
import ProductDialog from '@/modules/product/components/ProductDialog.vue'
import { useDialogStore } from '@/store/dialog.ts'
import FavoriteDialog from '@/modules/favorite/components/FavoriteDialog.vue'
import CartDialog from '@/modules/cart/components/CartDialog.vue'
import OrdersListDialog from '@/modules/order/components/OrdersListDialog.vue'
import OrderItemDialog from '@/modules/order/components/OrderItemDialog.vue'
import HttpHandler from '@/api/http.ts'
import ProductRepository from '@/modules/product/product.repository.ts'
import type { Product } from '@/interfaces/product.ts'

const dialogStore = useDialogStore()

const { screen } = useScreen()

const route = useRoute()
const router = useRouter()

const productList = ref<Product[]>([])

function handleQueryCheck() {
  if (!route.query.dialog)
    dialogStore.closeAll()
  if (route.query.dialog === 'favorite')
    dialogStore.toggleFavorite()
  if (route.query.dialog === 'orders')
    dialogStore.toggleOrderList()
  if (route.query.dialog === 'order-item')
    dialogStore.toggleOrderItem()
  if (route.query.dialog === 'cart')
    dialogStore.toggleCart()
  if (route.query.dialog === 'product')
    dialogStore.toggleProduct()
}

router.afterEach(() => {
  handleQueryCheck()
})

onMounted(() => {
  handleQueryCheck()

  HttpHandler.use({
    request: () => ProductRepository.getList(),
    onSuccess: (data) => {
      productList.value = data
    },
    onError: (e) => {
      console.error(e)
    },
  })
})
</script>

<style scoped lang="scss">
</style>
