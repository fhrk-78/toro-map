import { defineStore } from 'pinia'
import { type mappoint, type mapway } from '@/mapdatatypes'
import * as PIXI from 'pixi.js'
import type { SmoothGraphics } from '@pixi/graphics-smooth'

export const useMapdataStore = defineStore('mapdatastore', {
    state: () => ({
        points: new Array<mappoint>(),
        ways: new Array<mapway>(),
        localpoints: new Array<PIXI.Sprite>(),
        localways: new Array<SmoothGraphics>()
    })
})
