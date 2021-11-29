import { defineStore } from 'pinia'

export enum Theme {
  dark = 'dark',
  light = 'light'
}

const useConfigStore = defineStore('counter', {
  state: () => {
    return { theme: Theme.dark }
  },

  actions: {
    toggleTheme() {
      this.theme = this.theme === Theme.dark ? Theme.light : Theme.dark
    },
  },
})

export default useConfigStore