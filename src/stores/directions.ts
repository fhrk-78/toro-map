import type { mappoint } from '@/mapdatatypes'
import { defineStore } from 'pinia'

export const useDirectionsStore = defineStore('directionsstore', {
    state: () => ({
        graphics: [] as mappoint[]
    })
})
