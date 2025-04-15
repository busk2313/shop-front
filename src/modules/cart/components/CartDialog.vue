<template>
  <BaseDialog
    v-model="_modelValue"
    :full-height="cartStore.cartItems.length > 0"
    title="Корзина"
    :width="495"
  >
    <div class="mt-8 flex flex-col flex-auto overflow-y-hidden">
      <template v-if="cartStore.cartItems.length">
        <TransitionGroup
          class="flex flex-col gap-12 overflow-y-auto flex-auto"
          name="product-list"
          tag="div"
        >
          <ProductCard
            v-for="(item, index) in cartStore.cartItems"
            :key="item.product.id"
            :product="item.product"
            @cart-remove="handleRemoveStack(item.product)"
          >
            <div v-if="!screen.sm" class="flex-none flex gap-3 items-center">
              <BaseIcon
                class=" cursor-pointer"
                :class="{ 'text-danger': favoriteStore.state.list?.find(p => p.id === item.product.id) }"
                :name="favoriteStore.state.list?.find(p => p.id === item.product.id) ? 'heart' : 'heart-outlined'"
                @click="handleFavoriteToggle(item.product.id)"
              />

              <BaseIcon
                class=" cursor-pointer text-decorative-red"
                name="trash"
                @click="handleProductRemove(item.product)"
              />
            </div>

            <ProductActions
              v-else
              :is-favorite="!!favoriteStore.state.list?.find(p => p.id === item.product.id)"
              :top="index === cartStore.cartItems.length - 1"
              @favorite-toggle="handleFavoriteToggle(item.product.id)"
              @remove="handleProductRemove(item.product)"
            />
          </ProductCard>
        </TransitionGroup>

        <div class="flex items-center justify-between mt-8">
          <div class="flex flex-col">
            <span class="font-medium md:font-semibold text-xs md:text-base text-label">К оплате</span>

            <span class="font-bold text-2xl md:text-3xl">{{ `${totalPrice} coin` }}</span>
          </div>

          <Button
            :disabled="loading.isLoading.value"
            label="Оформить заказ"
            size="m"
            @click="handleOrderCreate"
          />
        </div>
      </template>

      <NoDataPlug v-else text="Пока товаров нет" />

      <div class="absolute bottom-16 right-7 flex flex-col">
        <TransitionGroup name="popup">
          <ReturnProductPopup
            v-for="product in deletedProductsStack"
            :key="product.product.id"
            :product="product.product"
            @return="handleReturnProduct"
          />
        </TransitionGroup>
      </div>
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from 'beeline-design-system-vue3'
import BaseDialog from '@/ui/BaseDialog.vue'
import BaseIcon from '@/ui/BaseIcon.vue'
import ReturnProductPopup from '@/components/ReturnProductPopup.vue'
import NoDataPlug from '@/components/NoDataPlug.vue'
import { useScreen } from '@/composables/useScreen.ts'
import ProductActions from '@/modules/product/components/ProductActions.vue'
import ProductCard from '@/modules/product/components/ProductCard.vue'
import { useCartStore } from '@/store/cart.ts'
import HttpHandler from '@/api/http.ts'
import CartRepository from '@/modules/cart/cart.repository.ts'
import type { Product } from '@/interfaces/product.ts'
import { useFavoriteStore } from '@/store/favorite.ts'
import FavoriteRepository from '@/modules/favorite/favorite.repository.ts'
import { useLoading } from '@/composables/useLoading.ts'
import OrderRepository from '@/modules/order/order.repository.ts'
import { useOrderStore } from '@/store/order.ts'
import type { OrderCreateForm } from '@/interfaces/order.ts'
import { useToast } from '@/composables/useToast.ts'
import UserRepository from '@/modules/user/user.repository.ts'
import { useUserStore } from '@/store/user.ts'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const router = useRouter()
const toast = useToast()
const userStore = useUserStore()

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const loading = useLoading()
const orderStore = useOrderStore()

const { screen } = useScreen()

const deletedProductsStack = ref<{ visible: boolean, product: any }[]>([])

const totalPrice = computed(() => {
  let price = 0

  cartStore.cartItems.forEach((item) => {
    price += item.product.price * item.quantity
  })

  return price
})

const _modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

async function handleProductRemove(product: Product) {
  await HttpHandler.use({
    request: () => CartRepository.remove(product.id),
    onSuccess: () => {
      cartStore.getList()
    },
    onError: (e) => {
      console.error(e)
    },
  })

  handleRemoveStack(product)
}

function handleRemoveStack(product: Product) {
  deletedProductsStack.value.push({ visible: true, product })

  setTimeout(() => {
    deletedProductsStack.value = deletedProductsStack.value.filter(p => p.product.id !== product.id)
  }, 5000)
}

async function handleReturnProduct(product: Product) {
  await HttpHandler.use({
    request: () => CartRepository.add({ productId: product.id, quantity: 1 }),
    onSuccess: () => {
      cartStore.getList()
    },
    onError: (e) => {
      console.error(e)
    },
  })

  deletedProductsStack.value = deletedProductsStack.value.filter(p => p.product.id !== product.id)
}

function handleFavoriteToggle(id: number) {
  HttpHandler.use({
    request: () => favoriteStore.state.list?.find(p => p.id === id)
      ? FavoriteRepository.remove(id)
      : FavoriteRepository.add(id),
    onSuccess: () => {
      favoriteStore.getList()
    },
    onError: (e) => {
      console.error(e)
    },
  })
}

async function handleOrderCreate() {
  loading.startLoading()

  const form: OrderCreateForm = {
    location_id: 1,
    products: cartStore.cartItems.map((item) => {
      return {
        quantity: item.quantity,
        product_id: item.product.id,
      }
    }),
    sum: totalPrice.value,
  }

  await HttpHandler.use({
    request: () => OrderRepository.create(form),
    onSuccess: async () => {
      toast.show('Заказ успешно создан')
      await orderStore.getList()
      await router.push({ name: 'Home', query: { dialog: 'orders' } })

      HttpHandler.use({
        request: () => UserRepository.get(),
        onSuccess: (data) => {
          userStore.setUser(data)
        },
      })
    },
    onFinally() {
      loading.stopLoading()
    },
  })
}
</script>

<style lang="scss" scoped>
.product-list-enter-active,
.product-list-leave-active {
  transition: all 0.5s ease;
}
.product-list-enter-from,
.product-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.popup-enter-active,
.popup-leave-active {
  transition: all .5s;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
