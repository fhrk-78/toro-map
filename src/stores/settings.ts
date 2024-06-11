import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settingsstore', {
    state: () => ({
        allowPageAnimation: true
    }),
    persist: true
})
