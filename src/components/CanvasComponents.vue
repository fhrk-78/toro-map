<script lang="ts" setup>
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { onMounted, watch, ref } from 'vue'
import { useMapdataStore } from '@/stores/mapdata'
import { useDirectionsStore } from '@/stores/directions'
import { SmoothGraphics } from '@pixi/graphics-smooth'

import { pointtype, type mappoint, type fv1, fv1pointscv, fv1linescv, waytype } from '@/mapdatatypes'

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

let mapdataStore = useMapdataStore()
let directionsStore = useDirectionsStore()

let dataLoadingDialog = ref(false)

mapdataStore.pointVisibleLayer = [
    pointtype.AIRPORT,
    pointtype.BUS,
    pointtype.IC,
    pointtype.JCT,
    pointtype.MONORAIL,
    pointtype.PA,
    pointtype.SA,
    pointtype.SUBWAY,
    pointtype.TRAIN,
    pointtype.TRAM,
    pointtype._BLANK
]

mapdataStore.wayVisibleLayer = [
    waytype.AIRLINE,
    waytype.BUS,
    waytype.EXPWY,
    waytype.HIGHWAY,
    waytype.MONORAIL,
    waytype.RAPPIDTRAIN,
    waytype.ROAD,
    waytype.SERVERHIGHWAY,
    waytype.TRAIN,
    waytype.TRAM,
    waytype._BLANK
]

async function dbload() {
    // eslint-disable-next-line no-async-promise-executor
    return fetch('https://script.google.com/macros/s/AKfycbyZ13-e5en9qNcWIwoevsrSDAIMt7jTDIcHGecxCC2uyAgL9hidHRo7JycgxdmB3p98/exec', {
        mode: 'cors'
    })
}

onMounted(async () => {
    if (mapdataStore.points.length == 0) {
        let dbfetch
        if (mapdataStore.dbjson == null) {
            dataLoadingDialog.value = true
            dbfetch = await dbload()
            mapdataStore.dbjson = (await dbfetch.json()) as fv1
            dataLoadingDialog.value = false
        } else {
            dbload()
                .then((v) => v.json())
                .then((v) => (mapdataStore.dbjson = v as fv1))
        }

        mapdataStore.points = []
        mapdataStore.ways = []

        for (const e of mapdataStore.dbjson.points) {
            mapdataStore.points.push({
                id: e[0],
                displayname: e[1],
                author: e[2],
                x: e[3] == '' ? undefined : (e[3] as number),
                y: e[4] == '' ? undefined : (e[4] as number),
                mytype: fv1pointscv(e[5])
            })
        }

        for (const e of mapdataStore.dbjson.lines) {
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
    } else {
        console.error('Error')
    }

    mapdataStore.localpoints = []
    mapdataStore.localways = []

    for (const e of mapdataStore.ways) {
        if (e.paths.length < 2) continue
        let lwidth = 0

        switch (e.mytype) {
            case waytype.ROAD:
                lwidth = 5
                break

            case waytype.BUS:
            case waytype.AIRLINE:
            case waytype.MONORAIL:
            case waytype.TRAM:
                lwidth = 10
                break

            case waytype.HIGHWAY:
            case waytype.TRAIN:
                lwidth = 15
                break

            case waytype.EXPWY:
            case waytype.SERVERHIGHWAY:
            case waytype.RAPPIDTRAIN:
                lwidth = 20
                break
        }

        let waycolor = parseInt(e.color, 16)
        const element = new SmoothGraphics()
        element.alpha = 0.5
        element.lineStyle({
            width: lwidth,
            color: waycolor
        })
        if (!(e.paths[0].x && e.paths[0].y)) continue
        element.moveTo(e.paths[0].x, e.paths[0].y)
        for (let j = 1; j < e.paths.length; j++) {
            const elm = e.paths[j]
            if (!(elm.x && elm.y)) continue
            element.lineTo(elm.x, elm.y)
        }
        ;(element as any).LayerFilter = e.mytype

        mapdataStore.localways.push(element)
    }

    for (const e of mapdataStore.points) {
        if (e.x == undefined || e.y == undefined) continue
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
        const element = new PIXI.Sprite(pointtexture)
        element.width = element.height = 30

        switch (e.mytype) {
            case pointtype.AIRPORT:
                element.width = element.height = 200
                break

            case pointtype.BUS:
                element.width = element.height = 50
                break

            case pointtype.IC:
            case pointtype.JCT:
            case pointtype.PA:
            case pointtype.SA:
            case pointtype.TRAIN:
            case pointtype.SUBWAY:
                element.width = element.height = 100
                break

            case pointtype.MONORAIL:
            case pointtype.TRAM:
                element.width = element.height = 70
                break
        }

        element.position.set(e.x, e.y)
        element.anchor.set(0.5)

        element.cursor = 'pointer'

        element.eventMode = 'dynamic'

        const title = e.displayname ?? e.id
        const subtitle = `by ${e.author == '' ? '<Author unset>' : e.author} / ${e.x} ${e.y}`

        element.on('click', () => {
            mapdataStore.directionsNow.title = title
            mapdataStore.directionsNow.subtitle = subtitle
        })
        ;(element as any).LayerFilter = e.mytype

        mapdataStore.localpoints.push(element)
    }

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

    for (const e of mapdataStore.localways) {
        viewport.addChild(Object.create(e) as SmoothGraphics)
    }

    for (const e of mapdataStore.localpoints) {
        viewport.addChild(Object.create(e) as PIXI.Sprite)
    }

    let directionsGraphics = new SmoothGraphics()
    viewport.addChild(directionsGraphics)

    directionsStore.$subscribe(() => {
        const nv = directionsStore.graphics
        directionsGraphics.clear()
        directionsGraphics.lineStyle({
            width: 78,
            color: 0xdd0000
        })
        directionsGraphics.moveTo(nv[0].x!, nv[0].y!)
        for (let i = 1; i < nv.length; i++) {
            const element = nv[i]
            directionsGraphics.lineTo(element.x!, element.y!)
        }
    })
})

let prevp = 0
mapdataStore.$subscribe(() => {
    if (prevp != mapdataStore.pointVisibleLayer.length) {
        const nv = mapdataStore.pointVisibleLayer
        for (const e of mapdataStore.localpoints) {
            if (!nv.includes((e as any).LayerFilter)) {
                e.visible = false
            } else {
                e.visible = true
            }
        }
        prevp = nv.length
    }
})

let prevw = 0
mapdataStore.$subscribe(() => {
    if (prevw != mapdataStore.wayVisibleLayer.length) {
        const nv = mapdataStore.wayVisibleLayer
        for (const e of mapdataStore.localways) {
            if (!nv.includes((e as any).LayerFilter)) {
                e.visible = false
            } else {
                e.visible = true
            }
        }
        prevw = nv.length
    }
})

let layer_station_stop = ref(true)
watch(layer_station_stop, (nv) => {
    let preset = [pointtype.TRAIN, pointtype.SUBWAY, pointtype.TRAM, pointtype.MONORAIL]
    if (nv) {
        mapdataStore.pointVisibleLayer.push(...preset)
    } else {
        mapdataStore.pointVisibleLayer = mapdataStore.pointVisibleLayer.filter((v) => !preset.includes(v))
    }
})
let layer_icjctpasa = ref(true)
watch(layer_icjctpasa, (nv) => {
    let preset = [pointtype.IC, pointtype.JCT, pointtype.PA, pointtype.SA]
    if (nv) {
        mapdataStore.pointVisibleLayer.push(...preset)
    } else {
        mapdataStore.pointVisibleLayer = mapdataStore.pointVisibleLayer.filter((v) => !preset.includes(v))
    }
})
let layer_otherpoints = ref(true)
watch(layer_otherpoints, (nv) => {
    let preset = [pointtype.AIRPORT, pointtype._BLANK]
    if (nv) {
        mapdataStore.pointVisibleLayer.push(...preset)
    } else {
        mapdataStore.pointVisibleLayer = mapdataStore.pointVisibleLayer.filter((v) => !preset.includes(v))
    }
})

let layer_train_subway = ref(true)
watch(layer_train_subway, (nv) => {
    let preset = [waytype.TRAIN, waytype.RAPPIDTRAIN, waytype.TRAM, waytype.MONORAIL]
    if (nv) {
        mapdataStore.wayVisibleLayer.push(...preset)
    } else {
        mapdataStore.wayVisibleLayer = mapdataStore.wayVisibleLayer.filter((v) => !preset.includes(v))
    }
})
let layer_expressway = ref(true)
watch(layer_train_subway, (nv) => {
    let preset = [waytype.EXPWY]
    if (nv) {
        mapdataStore.wayVisibleLayer.push(...preset)
    } else {
        mapdataStore.wayVisibleLayer = mapdataStore.wayVisibleLayer.filter((v) => !preset.includes(v))
    }
})
let layer_roadway = ref(true)
watch(layer_roadway, (nv) => {
    let preset = [waytype.HIGHWAY, waytype.ROAD, waytype.SERVERHIGHWAY]
    if (nv) {
        mapdataStore.wayVisibleLayer.push(...preset)
    } else {
        mapdataStore.wayVisibleLayer = mapdataStore.wayVisibleLayer.filter((v) => !preset.includes(v))
    }
})
</script>

<template>
    <div id="canvasmain"></div>

    <div class="loading_overlay hide" :class="{ hide: dataLoadingDialog }">
        <div>
            <span>データベースに接続中です...</span>
            <p>初回起動の場合、取得しキャッシュする必要があります</p>
        </div>
    </div>

    <div class="layerselector">
        <h3>表示設定</h3>
        <table>
            <thead>
                <tr>
                    <th>地点</th>
                    <th>線</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox" v-model="layer_station_stop" checked /><label>駅・停留所</label></td>
                    <td><input type="checkbox" v-model="layer_train_subway" checked /><label>鉄道・地下鉄</label></td>
                </tr>
                <tr>
                    <td><input type="checkbox" v-model="layer_icjctpasa" checked /><label>IC/JCT/PA/SA</label></td>
                    <td><input type="checkbox" v-model="layer_expressway" checked /><label>高速道路</label></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="checkbox" v-model="layer_roadway" checked /><label>一般道路</label></td>
                </tr>
                <tr>
                    <td><input type="checkbox" v-model="layer_otherpoints" checked /><label>その他</label></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
@import url('./../assets/style/components/canvas.css');
</style>
