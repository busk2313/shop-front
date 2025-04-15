<template>
  <BaseDialog
    v-model="_modelValue"
    :full-height="favoriteStore.state.list?.length > 0"
    title="Избранные"
    :width="495"
  >
    <div class="mt-8 flex flex-col overflow-y-hidden">
      <TransitionGroup
        v-if="favoriteStore.state.list?.length"
        class="flex flex-col gap-12 overflow-y-auto flex-auto"
        name="favorite-list"
        tag="div"
      >
        <ProductCard
          v-for="product in favoriteStore.state.list"
          :key="product.id"
          :product="product"
          @favorite-remove="handleProductRemove(product)"
        />
      </TransitionGroup>

      <NoDataPlug v-else text="Пока товаров нет" />

      <div class="absolute bottom-2 right-7 flex flex-col">
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
import BaseDialog from '@/ui/BaseDialog.vue'
import ReturnProductPopup from '@/components/ReturnProductPopup.vue'
import NoDataPlug from '@/components/NoDataPlug.vue'
import ProductCard from '@/modules/product/components/ProductCard.vue'
import { useFavoriteStore } from '@/store/favorite.ts'
import type { Product } from '@/interfaces/product.ts'
import HttpHandler from '@/api/http.ts'
import FavoriteRepository from '@/modules/favorite/favorite.repository.ts'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const favoriteStore = useFavoriteStore()

const deletedProductsStack = ref<{ visible: boolean, product: any }[]>([])

const _modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

function handleProductRemove(product: Product) {
  deletedProductsStack.value.push({ visible: true, product })

  setTimeout(() => {
    deletedProductsStack.value = deletedProductsStack.value.filter(p => p.product.id !== product.id)
  }, 5000)
}

function handleReturnProduct(product: Product) {
  HttpHandler.use({
    request: () => FavoriteRepository.add(product.id),
    onSuccess: () => {
      favoriteStore.getList()
    },
    onError: (e) => {
      console.error(e)
    },
  })

  deletedProductsStack.value = deletedProductsStack.value.filter(p => p.product.id !== product.id)
}
</script>

<style lang="scss" scoped>
.favorite-list-enter-active,
.favorite-list-leave-active {
  transition: all 0.5s ease;
}
.favorite-list-enter-from,
.favorite-list-leave-to {
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
