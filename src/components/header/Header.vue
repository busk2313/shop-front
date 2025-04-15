<template>
  <header class="py-4 flex flex-col justify-center border-b-2 border-gray bg-white z-20">
    <div class="flex w-4/5 justify-between gap-3 m-auto">
      <img
        alt="logo"
        src="@/assets/icon/beeline.svg"
      >

      <Button
        class="h-10 btn-head"
        icon-align="right"
        :label="category ? category.title : 'Категории'"
        size="m"
        view="square"
        @click="handleCategoriesToggle"
      >
        <template #default>
          <BaseIcon
            v-if="category"
            class="ml-2 cursor-pointer"
            name="cross"
            @click.stop="handleCategoryClear"
          />

          <BaseIcon
            v-else
            class="ml-2"
            :class="{ 'rotate-180': isCategoriesVisible }"
            name="chevron"
          />
        </template>
      </Button>

      <SearchBar
        v-model="filterStore.state.search"
        class="flex-auto"
      />

      <ButtonWithCounter :count="favoriteCount">
        <Button
          button-style="secondary"
          class="h-10"
          size="m"
          view="square"
          @click="handleFavoritesToggle"
        >
          <template #default>
            <BaseIcon class="text-danger" name="heart" />
          </template>
        </Button>
      </ButtonWithCounter>

      <ButtonWithCounter :count="cartItemsAmount">
        <Button
          button-style="secondary"
          class="h-10"
          icon-align="right"
          label="Корзина"
          size="m"
          view="square"
          @click="handleCartToggle"
        >
          <template #default>
            <BaseIcon class="ml-2" name="cart" />
          </template>
        </Button>
      </ButtonWithCounter>

      <ButtonWithCounter :count="ordersAmount">
        <Button
          button-style="secondary"
          class="h-10"
          size="m"
          view="square"
          @click="handleOrdersToggle"
        >
          <template #default>
            <BaseIcon name="box" />
          </template>
        </Button>
      </ButtonWithCounter>

      <Chips
        background="dark"
        class="h-10 !flex items-center"
        :text="userBalance.toString()"
        @click="handlePlacingVisible"
      >
        <template #right>
          <img alt="tokens" src="@/assets/icon/token.svg">
        </template>
      </Chips>
    </div>

    <CategoriesBlock
      v-model="filterStore.state.category"
      :visible="isCategoriesVisible"
      @update:model-value="handleCategoriesToggle"
    />
  </header>

  <div
    v-if="isCategoriesVisible"
    class="absolute w-screen h-screen bg-dialog-bg z-10"
    @click="handleCategoriesToggle"
  />
  <OrderPlacingBlock v-model="isPlacingVisible" :order-id="2" />
</template>

<script setup lang="ts">
import { Button, Chips } from 'beeline-design-system-vue3'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import BaseIcon from '@/ui/BaseIcon.vue'
import SearchBar from '@/components/SearchBar.vue'
import CategoriesBlock from '@/components/CategoriesBlock.vue'
import ButtonWithCounter from '@/components/ButtonWithCounter.vue'
import OrderPlacingBlock from '@/modules/order/components/OrderPlacingBlock.vue'
import { useFilterStore } from '@/store/filter.ts'
import { useUserStore } from '@/store/user.ts'
import { useFavoriteStore } from '@/store/favorite.ts'
import { useCartStore } from '@/store/cart.ts'
import { useOrderStore } from '@/store/order.ts'

const filterStore = useFilterStore()
const { category } = storeToRefs(filterStore)
const { userBalance } = storeToRefs(useUserStore())
const { favoriteCount } = storeToRefs(useFavoriteStore())
const { cartItemsAmount } = storeToRefs(useCartStore())
const { ordersAmount } = storeToRefs(useOrderStore())

const isCategoriesVisible = ref(false)
const isPlacingVisible = ref(false)

const router = useRouter()

function handleCategoriesToggle() {
  isCategoriesVisible.value = !isCategoriesVisible.value
}

function handleCategoryClear() {
  filterStore.clearCategory()
  isCategoriesVisible.value = false
}

function handleCartToggle() {
  router.push({ name: 'Home', query: { dialog: 'cart' } })
}

function handleOrdersToggle() {
  router.push({ name: 'Home', query: { dialog: 'orders' } })
}

function handleFavoritesToggle() {
  router.push({ name: 'Home', query: { dialog: 'favorite' } })
}

function handlePlacingVisible() {
  isPlacingVisible.value = true
}
</script>
