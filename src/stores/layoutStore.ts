import { defineStore, acceptHMRUpdate } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => {
    const storedHorizontalMenu = localStorage.getItem('isHorizontalMenu')
    return {
      leftDrawerOpen: false,
      darkMode: localStorage.getItem('darkMode') === 'true',
      isHorizontalMenu: storedHorizontalMenu ? storedHorizontalMenu === 'true' : false,
    }
  },
  actions: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      localStorage.setItem('darkMode', this.darkMode.toString())
    },
    toggleMenuMode() {
      this.isHorizontalMenu = !this.isHorizontalMenu
      localStorage.setItem('isHorizontalMenu', this.isHorizontalMenu.toString())
      if (this.isHorizontalMenu) {
        this.leftDrawerOpen = false
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
}
