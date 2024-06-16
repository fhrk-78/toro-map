<script lang="ts" setup>
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { onMounted } from 'vue'
import { useMapdataStore } from '@/stores/mapdata'
import { SmoothGraphics } from '@pixi/graphics-smooth'

import { pointtype, type mappoint, type fv1, fv1pointscv, fv1linescv } from '@/mapdatatypes'

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

        viewport.position.set(app.screen.width / 2, app.screen.height / 2 + 2000)
        viewport.setZoom(0.1, true)

        if (!mapdataStore.isFetched) {
            mapdataStore.localpoints = []
            mapdataStore.localways = []
            mapdataStore.points = []
            mapdataStore.ways = []

            let dbfetch = await fetch('https://script.google.com/macros/s/AKfycbyZ13-e5en9qNcWIwoevsrSDAIMt7jTDIcHGecxCC2uyAgL9hidHRo7JycgxdmB3p98/exec', {
                mode: 'cors'
            })

            if (dbfetch.ok) {
                let dbjson = (await dbfetch.json()) as fv1

                for (const e of dbjson.points) {
                    mapdataStore.points.push({
                        id: e[0],
                        displayname: e[1],
                        author: e[2],
                        x: e[3],
                        y: e[4],
                        mytype: fv1pointscv(e[5])
                    })
                }

                for (const e of dbjson.lines) {
                    const lineall = e[3].split('\n')
                    let linelist = new Array<mappoint>()

                    for (const line of lineall) {
                        let catcherrorq = new Array<string>()

                        let findid = mapdataStore.points.find((es) => {
                            catcherrorq.push(es.id)
                            return es.id.replace(' ', '') == line
                        })
                        if (findid == undefined) {
                            console.error(line + ': Not found : ' + catcherrorq.join(',') + linelist)
                            continue
                        }
                        linelist.push(findid as mappoint)
                    }

                    mapdataStore.ways.push({
                        id: e[0],
                        displayname: e[1],
                        author: e[2],
                        paths: linelist,
                        color: e[4],
                        mytype: fv1linescv(e[5])
                    })
                }

                console.info('Fetch completed', dbjson)
                console.info('Add Completed', mapdataStore.points, mapdataStore.ways)

                mapdataStore.isFetched = true
            } else {
                //
            }
        }

        for (const e of mapdataStore.ways) {
            if (e.paths.length < 2) continue
            let waycolor = parseInt(e.color, 16)
            const i = mapdataStore.localways.push(new SmoothGraphics()) - 1
            mapdataStore.localways[i].lineStyle({
                width: 20,
                color: waycolor
            })
            if (!(e.paths[0].x && e.paths[0].y)) continue
            mapdataStore.localways[i].moveTo(e.paths[0].x, e.paths[0].y)
            for (let j = 1; j < e.paths.length; j++) {
                const elm = e.paths[j]
                console.log(elm.id, elm.x, elm.y)
                if (!(elm.x && elm.y)) continue
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
            console.log(e.id, mapdataStore.localpoints[i].position._x, mapdataStore.localpoints[i].position._y)
        }

        //@ts-ignore
        viewport.on('zoomed', (zoom) => {
            if (zoom == undefined) return
            for (const e of mapdataStore.localpoints) {
                e.scale.set(30 / zoom.x)
            }
        })
    })()
})
</script>

<template>
    <div id="canvasmain"></div>
</template>

<style scoped>
@import url('./../assets/style/components/canvas.css');
</style>
