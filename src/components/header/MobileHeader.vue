<template>
  <header class="flex gap-x-2 gap-y-4 flex-wrap p-4 mb-4">
    <template v-if="!showSearch">
      <div class="mobile-header__item flex items-center">
        <img
          alt="logo"
          class="mr-2"
          src="@/assets/icon/beeline.svg"
        >

        <span class="text-xl font-bold">Привет 👋</span>
      </div>

      <Chips
        background="dark"
        class="mobile-header__item h-10 !flex items-center !px-2 !py-1"
        :text="userBalance.toString()"
        @click="handlePlacingVisible"
      >
        <template #right>
          <img alt="tokens" src="@/assets/icon/token.svg">
        </template>
      </Chips>
    </template>

    <BaseIcon
      v-if="showSearch"
      class="my-auto cursor-pointer"
      name="arrow-left"
      @click="handleSearchToggle"
    />

    <SearchBar
      v-if="!shrink || showSearch"
      v-model="filterStore.state.search"
      class="mobile-header__item"
      :class="{ grow: showSearch }"
    />

    <Button
      v-else
      button-style="secondary"
      class="h-10"
      size="m"
      view="square"
      @click="handleSearchToggle"
    >
      <template #default>
        <BaseIcon name="search" />
      </template>
    </Button>

    <Button
      v-if="!showSearch"
      button-style="secondary"
      class="mobile-header__item h-10"
      size="m"
      view="square"
      @click="handleFilterToggle"
    >
      <template #default>
        <BaseIcon name="sliders" />
      </template>
    </Button>

    <div v-if="!showSearch" class="flex gap-2 overflow-x-auto">
      <div
        class="py-2 px-4 flex items-center border-border border-2 rounded-xl cursor-pointer hover:bg-surface font-medium text-sm whitespace-nowrap"
        :class="{ '!bg-accent !border-0 !hover:bg-accent': !category }"
        @click="handleCategoryToggle"
      >
        <span>Все</span>

        <BaseIcon class="ml-2" name="chevron" />
      </div>

      <div
        v-for="item in categoriesList"
        :key="item.id"
        class="py-2 flex items-center px-4 border-border border-2 rounded-xl cursor-pointer hover:bg-surface font-medium text-sm whitespace-nowrap"
        :class="{ '!bg-accent !border-0 !hover:bg-accent': item.id === category?.id }"
        @click="handleCategorySelect(item)"
      >
        {{ item.title }}
      </div>
    </div>
  </header>

  <OrderPlacingBlock v-model="isPlacingVisible" :order-id="2" />

  <FilterDialog v-model="isFilterVisible" />

  <CategoriesDialog v-model="isCategoriesVisible" />
</template>

<script setup lang="ts">
import { Button, Chips } from 'beeline-design-system-vue3'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import SearchBar from '@/components/SearchBar.vue'
import BaseIcon from '@/ui/BaseIcon.vue'
import type { Category } from '@/interfaces/common.ts'
import OrderPlacingBlock from '@/modules/order/components/OrderPlacingBlock.vue'
import FilterDialog from '@/components/FilterDialog.vue'
import CategoriesDialog from '@/components/CategoriesDialog.vue'
import { useFilterStore } from '@/store/filter.ts'
import HttpHandler from '@/api/http.ts'
import CategoryRepository from '@/modules/category/category.repository.ts'
import { useUserStore } from '@/store/user.ts'

defineProps<{
  shrink: boolean
}>()

const categoriesList = ref<Category[]>([])

const filterStore = useFilterStore()
const { userBalance } = storeToRefs(useUserStore())

const { category } = storeToRefs(filterStore)

const isPlacingVisible = ref(false)
const isFilterVisible = ref(false)
const isCategoriesVisible = ref(false)
const showSearch = ref(false)

onMounted(async () => {
  await HttpHandler.use({
    request: () => CategoryRepository.getList(),
    onSuccess: (data) => {
      categoriesList.value = data
    },
    onError: (e) => {
      console.error(e)
    },
  })
})

function handleCategorySelect(val: Category) {
  filterStore.state.category = val
}

function handleCategoryToggle() {
  isCategoriesVisible.value = !isCategoriesVisible.value
}

function handlePlacingVisible() {
  isPlacingVisible.value = true
}

function handleFilterToggle() {
  isFilterVisible.value = !isFilterVisible.value
}

function handleSearchToggle() {
  showSearch.value = !showSearch.value
}
</script>

<style lang="scss" scoped>
.mobile-header__item:nth-child(1) {
  flex-grow: 1;
}

.mobile-header__item:nth-child(2) {
  flex-basis: auto;
}

.mobile-header__item:nth-child(3) {
  flex-grow: 1;
  flex-basis: 80%;
}

.mobile-header__item:nth-child(4) {
  flex-basis: auto;
}
</style>
