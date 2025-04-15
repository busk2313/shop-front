import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { User } from '@/interfaces/user.ts'

interface UserStoreState {
  user: User
}

export const useUserStore = defineStore('user', () => {
  const state = reactive<UserStoreState>({
    user: {} as User,
  })

  const userBalance = computed(() => state.user?.balance || 0)
  const userAccountId = computed(() => state.user.basket.account_id)

  function setUser(data: User) {
    state.user = data
  }

  return {
    state,
    userBalance,
    userAccountId,
    setUser,
  }
})
