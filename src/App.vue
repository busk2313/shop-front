<template>
  <Loader
    v-if="loading.isLoading.value"
    class="h-full"
    show-label=""
  />

  <RouterView v-else />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Loader } from 'beeline-design-system-vue3'
import HttpHandler from '@/api/http.ts'
import UserRepository from '@/modules/user/user.repository.ts'
import { useUserStore } from '@/store/user.ts'
import { useLoading } from '@/composables/useLoading.ts'
import { useFavoriteStore } from '@/store/favorite.ts'
import { useCartStore } from '@/store/cart.ts'
import { useOrderStore } from '@/store/order.ts'

const userStore = useUserStore()
const loading = useLoading()
const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()
const orderStore = useOrderStore()

onMounted(async () => {
  loading.startLoading()
  await HttpHandler.use({
    request: () => UserRepository.get(),
    onSuccess: (data) => {
      userStore.setUser(data)

      favoriteStore.getList()
      cartStore.getList()
      orderStore.getList()
    },
    onError: (e) => {
      console.error(e)
    },
    onFinally() {
      loading.stopLoading()
    },
  })
})
</script>
