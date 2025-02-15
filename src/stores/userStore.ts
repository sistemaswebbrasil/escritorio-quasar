import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('auth_token') || '',
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('auth_token', token)
    },
  },
})
