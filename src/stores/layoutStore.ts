import { defineStore, acceptHMRUpdate } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => {
    const storedHorizontalMenu = localStorage.getItem('isHorizontalMenu')
    return {
      leftDrawerOpen: false,
      darkMode: localStorage.getItem('darkMode') === 'true',
      isHorizontalMenu: storedHorizontalMenu ? storedHorizontalMenu === 'true' : false,
      language: localStorage.getItem('language') || 'pt-BR',
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
    toggleLanguage() {
      this.language = this.language === 'pt-BR' ? 'en-US' : 'pt-BR'
      localStorage.setItem('language', this.language)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
}
