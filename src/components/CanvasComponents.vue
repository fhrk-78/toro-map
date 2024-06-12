<script lang="ts" setup>
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { onMounted } from 'vue'
import { useMapdataStore } from '@/stores/mapdata'
import { SmoothGraphics } from '@pixi/graphics-smooth'

import { pointtype, waytype } from '@/mapdatatypes'

import ICIcon from '@/assets/icons/anthurum84/ic.png'
import JCTIcon from '@/assets/icons/anthurum84/jct.png'
import PAIcon from '@/assets/icons/anthurum84/pa.png'
import SAIcon from '@/assets/icons/anthurum84/sa.png'

import MonorailIcon from '@/assets/icons/googleicons/monorail_48dp_FILL1_wght400_GRAD0_opsz48.svg'
import SubwayIcon from '@/assets/icons/googleicons/subway_48dp_FILL1_wght400_GRAD0_opsz48.svg'
import TrainIcon from '@/assets/icons/googleicons/train_48dp_FILL1_wght400_GRAD0_opsz48.svg'
import TramIcon from '@/assets/icons/googleicons/tram_48dp_FILL1_wght400_GRAD0_opsz48.svg'

import BusIcon from '@/assets/icons/googleicons/directions_bus_48dp_FILL1_wght400_GRAD0_opsz48.svg'
import AirportIcon from '@/assets/icons/googleicons/flight_48dp_FILL1_wght400_GRAD0_opsz48.svg'

onMounted(() => {
    ;(async () => {
        let mapdataStore = useMapdataStore()
        const canvasmain = document.getElementById('canvasmain') as HTMLDivElement
        const app = new PIXI.Application({
            background: '#f1f1ea',
            resizeTo: canvasmain
        })

        canvasmain.appendChild(app.view as any)

        const viewport = new Viewport({
            screenWidth: canvasmain.clientWidth,
            screenHeight: canvasmain.clientHeight,
            worldWidth: 200000,
            worldHeight: 200000,

            events: app.renderer.events
        })

        app.stage.addChild(viewport)

        viewport.drag().pinch().wheel().decelerate()

        viewport.position.set(app.screen.width / 2, app.screen.height / 2)

        mapdataStore.localpoints = []
        mapdataStore.localways = []

        //dev
        mapdataStore.points = []
        mapdataStore.ways = []
        mapdataStore.points.push({
            displayname: 'テストポイント1',
            id: 'testpoint1',
            x: 100,
            y: 0,
            author: 'haru7p8',
            mytype: 'ic' as pointtype
        })

        mapdataStore.points.push({
            displayname: 'テストポイント2',
            id: 'testpoint2',
            x: -100,
            y: 0,
            author: 'haru7p8',
            mytype: 'jct' as pointtype
        })

        mapdataStore.points.push({
            id: 'testpoint3',
            x: -200,
            y: 100,
            author: 'haru7p8',
            mytype: '_blank' as pointtype
        })

        mapdataStore.points.push({
            displayname: 'テストポイント4',
            id: 'testpoint4',
            x: -500,
            y: 150,
            author: 'haru7p8',
            mytype: 'pa' as pointtype
        })

        mapdataStore.points.push({
            displayname: 'テストポイント5',
            id: 'testpoint5',
            x: 700,
            y: 200,
            author: 'haru7p8',
            mytype: 'train' as pointtype
        })

        mapdataStore.points.push({
            displayname: 'テストポイント6',
            id: 'testpoint6',
            x: 500,
            y: 300,
            author: 'haru7p8',
            mytype: 'train' as pointtype
        })

        mapdataStore.points.push({
            displayname: 'テストポイント7',
            id: 'testpoint7',
            x: -300,
            y: -100,
            author: 'haru7p8',
            mytype: 'train' as pointtype
        })

        mapdataStore.ways.push({
            displayname: 'テストウェイ1',
            id: 'testway1',
            paths: mapdataStore.points.slice(0, 4),
            author: 'haru7p8',
            color: '0x208000',
            mytype: 'expwy' as waytype
        })

        mapdataStore.ways.push({
            displayname: 'テストウェイ2',
            id: 'testway2',
            paths: mapdataStore.points.slice(4, 6),
            author: 'haru7p8',
            color: '0x7080e0',
            mytype: 'train' as waytype
        })

        mapdataStore.ways.push({
            displayname: 'テストウェイ3',
            id: 'testway3',
            paths: mapdataStore.points.slice(5),
            author: 'haru7p8',
            color: '0xf03080',
            mytype: 'train' as waytype
        })

        console.log(mapdataStore.ways)

        for (const e of mapdataStore.ways) {
            if (e.paths.length < 2) continue
            let waycolor = parseInt(e.color, 16)
            const i = mapdataStore.localways.push(new SmoothGraphics()) - 1
            mapdataStore.localways[i].lineStyle({
                width: 5,
                color: waycolor
            })
            mapdataStore.localways[i].moveTo(e.paths[0].x, e.paths[0].y)
            for (let j = 1; j < e.paths.length; j++) {
                const elm = e.paths[j]
                mapdataStore.localways[i].lineTo(elm.x, elm.y)
            }
            viewport.addChild(mapdataStore.localways[i] as SmoothGraphics)
        }

        for (const e of mapdataStore.points) {
            let pointtexture
            switch (e.mytype) {
                case pointtype._BLANK:
                    pointtexture = PIXI.Texture.EMPTY
                    break

                case pointtype.IC:
                    pointtexture = PIXI.Texture.from(ICIcon)
                    break
                case pointtype.JCT:
                    pointtexture = PIXI.Texture.from(JCTIcon)
                    break
                case pointtype.PA:
                    pointtexture = PIXI.Texture.from(PAIcon)
                    break
                case pointtype.SA:
                    pointtexture = PIXI.Texture.from(SAIcon)
                    break

                case pointtype.TRAIN:
                    pointtexture = PIXI.Texture.from(TrainIcon)
                    break
                case pointtype.SUBWAY:
                    pointtexture = PIXI.Texture.from(SubwayIcon)
                    break
                case pointtype.MONORAIL:
                    pointtexture = PIXI.Texture.from(MonorailIcon)
                    break
                case pointtype.TRAM:
                    pointtexture = PIXI.Texture.from(TramIcon)
                    break

                case pointtype.BUS:
                    pointtexture = PIXI.Texture.from(BusIcon)
                    break
                case pointtype.AIRPORT:
                    pointtexture = PIXI.Texture.from(AirportIcon)
                    break

                default:
                    pointtexture = PIXI.Texture.EMPTY
                    break
            }
            const i = mapdataStore.localpoints.push(viewport.addChild(new PIXI.Sprite(pointtexture))) - 1
            mapdataStore.localpoints[i].width = mapdataStore.localpoints[i].height = 30
            mapdataStore.localpoints[i].position.set(e.x, e.y)
            mapdataStore.localpoints[i].anchor.set(0.5)
        }
    })()
})
</script>

<template>
    <div id="canvasmain"></div>
</template>

<style scoped>
@import url('./../assets/style/components/canvas.css');
</style>
