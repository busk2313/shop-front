<template>
  <BaseDialog v-model="_modelValue" full-height>
    <div v-if="product.id" class="flex flex-col h-full">
      <img
        alt="product"
        class="object-cover select-none w-44 md:w-64 h-44 md:h-64 mx-auto rounded-xl"
        :src="imageUrl"
      >

      <div class="flex justify-between items-center gap-4 mt-4 md:mt-8">
        <span class="font-bold text-3xl">{{ product.name }}</span>

        <BaseIcon
          class=" cursor-pointer flex-none"
          :class="{ 'text-danger': inFavorite }"
          :name="inFavorite ? 'heart' : 'heart-outlined'"
          @click="handleFavoriteToggle"
        />
      </div>

      <p class="md:mt-4 md:mb-8 mt-3 mb-6 text-sm md:text-base leading-5 md:leading-6">
        {{ product.description }}
      </p>

      <!--      <div class="product__characteristics mb-8 md:mb-0">
        <span class="font-semibold md:font-bold text-base md:text-xl">Характеристики товара</span>

        <ul>
          <li>Смартфон с Android 9.0</li>
          <li>Поддержка двух SIM-карт</li>
          <li>Экран 6.38", разрешение 2340x1080</li>
        </ul>
      </div> -->

      <div class="flex justify-between items-center mt-auto">
        <div class="flex flex-col">
          <span class="font-bold text-2xl md:text-3xl">{{ `${product.price} coin` }}</span>

          <span
            v-if="quantity > 0"
            class="text-label font-medium md:font-semibold text-sm md:text-base"
          >
            {{ `x${quantity} = ${product.price * quantity}` }}
          </span>
        </div>

        <div class="flex items-center">
          <Button
            v-if="quantity === 0"
            label="В корзину"
            size="m"
            @click="handleAdd"
          />

          <template v-else>
            <BaseCounter
              :count="quantity"
              :disable="disableCountChange"
              @change="handleCartUpdate"
            />

            <ButtonWithCounter :count="cartStore.cartItemsAmount">
              <Button
                button-style="secondary"
                class="ml-3"
                size="m"
                view="square"
                @click="handleCartOpen"
              >
                <template #default>
                  <BaseIcon name="cart" />
                </template>
              </Button>
            </ButtonWithCounter>
          </template>
        </div>
      </div>
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from 'beeline-design-system-vue3'
import BaseDialog from '@/ui/BaseDialog.vue'
import BaseIcon from '@/ui/BaseIcon.vue'
import BaseCounter from '@/ui/BaseCounter.vue'
import ButtonWithCounter from '@/components/ButtonWithCounter.vue'
import type { Product } from '@/interfaces/product.ts'
import HttpHandler from '@/api/http.ts'
import ProductRepository from '@/modules/product/product.repository.ts'
import { useFavoriteStore } from '@/store/favorite.ts'
import FavoriteRepository from '@/modules/favorite/favorite.repository.ts'
import { useCartStore } from '@/store/cart.ts'
import CartRepository from '@/modules/cart/cart.repository.ts'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()

const route = useRoute()
const router = useRouter()

const product = ref<Product>({} as Product)
const inFavorite = computed(() => favoriteStore.state.list?.find(p => p.id === product.value.id))
const quantity = computed(() => cartStore.cartItems.find(item => item.product.id === product.value?.id)?.quantity || 0)

const disableCountChange = ref(false)

const _modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const imageUrl = computed(() => {
  return product.value.images?.length
    ? `http://duken-plus-backend.k8s-dev.kar-tel.local/image/get/${product.value.images[0].id}`
    : '/img/product.png'
})

watch(_modelValue, (val) => {
  if (val)
    getProduct()
})

function getProduct() {
  if (route.query?.id) {
    HttpHandler.use({
      request: () => ProductRepository.getById(route.query.id as unknown as number),
      onSuccess: (data) => {
        product.value = data
      },
      onError: (e) => {
        console.error(e)
      },
    })
  }
}

function handleFavoriteToggle() {
  HttpHandler.use({
    request: () => inFavorite.value
      ? FavoriteRepository.remove(product.value.id)
      : FavoriteRepository.add(product.value.id),
    onSuccess: () => {
      favoriteStore.getList()
    },
    onError: (e) => {
      console.error(e)
    },
  })
}

function handleAdd() {
  HttpHandler.use({
    request: () => CartRepository.add({ quantity: 1, productId: product.value.id }),
    onSuccess: () => {
      cartStore.getList()
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
      ? CartRepository.remove(product.value.id)
      : CartRepository.update({ productId: product.value.id, quantity: count }),
    onSuccess: () => {
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

function handleCartOpen() {
  router.push({ name: 'Home', query: { dialog: 'cart' } })
}
</script>

<style lang="scss" scoped>
.product__characteristics {
  ul {
    margin-top: 12px;
    margin-left: 20px;
    list-style-image: url("@/assets/icon/list-icon.svg");
    font-size: 16px;
  }
}
</style>
