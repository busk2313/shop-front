<template>
  <div
    class="flex flex-col w-64"
    :class="{ 'grid grid-cols-auto-1 !w-full justify-between': showInline }"
  >
    <img
      alt="product"
      class="object-cover select-none rounded-xl w-auto h-64 mr-0"
      :class="{ '!mr-3 !w-24 row-span-2 !h-24': showInline }"
      :src="imageUrl"
    >

    <div class="flex items-start justify-between mt-3 grow gap-1" :class="{ 'mt-0': showInline }">
      <span
        class="cursor-pointer hover:text-label-informative hover:underline hover:underline-offset-1 text-sm md:text-base select-none line-clamp-2"
        @click="handleProductDialogShow"
      >
        {{ product.name }}
      </span>

      <slot>
        <BaseIcon
          class=" cursor-pointer flex-none"
          :class="{ 'text-danger': inFavorite }"
          :name="inFavorite ? 'heart' : 'heart-outlined'"
          @click="handleFavoriteToggle"
        />
      </slot>
    </div>

    <div class="relative flex items-center justify-between mt-6" :class="{ 'mt-0 product-control': showInline }">
      <div class="flex flex-col">
        <span class="md:font-semibold md:text-lg font-medium text-base leading-6">
          {{ `${product.price} coin` }}
        </span>

        <span
          v-if="quantity > 0"
          class="text-label text-xs md:font-bold font-medium leading-4"
        >
          {{ `x${quantity} = ${product.price * quantity} coin` }}
        </span>
      </div>

      <Button
        v-if="quantity === 0"
        button-style="secondary"
        class="!min-w-[100px]"
        :class="{ '!min-w-0': showInline }"
        label="В корзину"
        size="m"
        @click="handleAdd"
      />

      <BaseCounter
        v-else
        class="w-28"
        :count="quantity"
        :disable="disableCountChange"
        @change="handleCartUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'beeline-design-system-vue3'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseIcon from '@/ui/BaseIcon.vue'
import BaseCounter from '@/ui/BaseCounter.vue'
import { useScreen } from '@/composables/useScreen.ts'
import type { Product } from '@/interfaces/product.ts'
import HttpHandler from '@/api/http.ts'
import FavoriteRepository from '@/modules/favorite/favorite.repository.ts'
import { useFavoriteStore } from '@/store/favorite.ts'
import { useCartStore } from '@/store/cart.ts'
import CartRepository from '@/modules/cart/cart.repository.ts'

const props = withDefaults(defineProps<{
  product: Product
  isInline?: boolean
}>(), {
  isInline: true,
})

const emit = defineEmits(['favoriteRemove', 'cartRemove'])

const router = useRouter()
const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()

const { screen } = useScreen()

const showInline = computed(() => props.isInline || screen.sm)
const disableCountChange = ref(false)
const imageUrl = computed(() => {
  return props.product.images?.length
    ? `http://duken-plus-backend.k8s-dev.kar-tel.local/image/get/${props.product.images[0].id}`
    : '/img/product.png'
})

const quantity = computed(() => cartStore.cartItems.find(item => item.product.id === props.product.id)?.quantity || 0)
const inFavorite = computed(() => favoriteStore.state.list?.find(p => p.id === props.product.id))

function handleAdd() {
  HttpHandler.use({
    request: () => CartRepository.add({ quantity: 1, productId: props.product.id }),
    onSuccess: () => {
      cartStore.getList()
    },
    onError: (e) => {
      console.error(e)
    },
  })
}

function handleFavoriteToggle() {
  HttpHandler.use({
    request: () => inFavorite.value
      ? FavoriteRepository.remove(props.product.id)
      : FavoriteRepository.add(props.product.id),
    onSuccess: () => {
      if (inFavorite.value)
        emit('favoriteRemove')

      favoriteStore.getList()
    },
    onError: (e) => {
      console.error(e)
    },
  })
}

async function handleCartUpdate(count: number) {
  disableCountChange.value = true

  await HttpHandler.use({
    request: () => count === 0
      ? CartRepository.remove(props.product.id)
      : CartRepository.update({ productId: props.product.id, quantity: count }),
    onSuccess: () => {
      if (count === 0)
        emit('cartRemove')

      cartStore.getList()
    },
    onError: (e) => {
      console.error(e)
    },
    onFinally() {
      disableCountChange.value = false
    },
  })
}

function handleProductDialogShow() {
  router.push({ name: 'Home', query: { dialog: 'product', id: props.product.id } })
}
</script>

<style lang="scss" scoped>
.product-control {
  &:after {
    content: '';
    position: absolute;
    bottom: -14px;
    width: 100%;
    height: 1px;
    background-color: $color-border;
  }
}
</style>
