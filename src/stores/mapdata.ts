import { defineStore } from 'pinia'
import { pointtype, waytype, type mappoint, type mapway } from '@/mapdatatypes'
import * as PIXI from 'pixi.js'
import type { SmoothGraphics } from '@pixi/graphics-smooth'

export const useMapdataStore = defineStore('mapdatastore', {
    state: () => ({
        points: new Array<mappoint>(),
        ways: new Array<mapway>(),
        localpoints: new Array<PIXI.Sprite>(),
        localways: new Array<SmoothGraphics>(),
        currentDirections: new Array<mapway>(),
        wayVisibleLayer: new Array<waytype>(),
        pointVisibleLayer: new Array<pointtype>(),
        directionsNow: {
            title: 'ようこそ',
            subtitle: '多機能交通地図アプリ(仮)'
        },
        directionsResultNow: {
            distance: 0,
            paths: new Array<mappoint>(),
            ways: new Array<mapway>()
        },
        directionsPath: new Array<mappoint>()
    })
})
