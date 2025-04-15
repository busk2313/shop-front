<template>
  <div class="my-6 flex items-center">
    <SortDropdown :selected="state.sort" @change="handleSortChange" />

    <div class="ml-3 border-border border-2 py-1.5 px-3 rounded-2xl flex items-center">
      <span class="font-semibold text-base mr-2">
        {{ `Товары до ${userBalance} coin` }}
      </span>

      <Switch
        :checked="state.limit"
        size="m"
        @change="handleLimitChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Switch } from 'beeline-design-system-vue3'
import { storeToRefs } from 'pinia'
import type { FilterSortType } from '@/interfaces/common.ts'
import SortDropdown from '@/components/SortDropdown.vue'
import { useFilterStore } from '@/store/filter.ts'
import { useUserStore } from '@/store/user.ts'

const filterStore = useFilterStore()
const { userBalance } = storeToRefs(useUserStore())
const { state } = storeToRefs(filterStore)

function handleLimitChange(val: Event) {
  filterStore.changeLimit((val.target as HTMLInputElement).checked)
}

function handleSortChange(val: FilterSortType) {
  filterStore.changeSort(val)
}
</script>
