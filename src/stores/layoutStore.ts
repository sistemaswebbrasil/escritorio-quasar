import { defineStore, acceptHMRUpdate } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    leftDrawerOpen: false,
    darkMode: localStorage.getItem('darkMode') === 'true',
  }),
  actions: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      localStorage.setItem('darkMode', this.darkMode.toString())
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
}
