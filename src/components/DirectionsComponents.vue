<script setup lang="ts">
import { ref } from 'vue'
import { useMapdataStore } from '@/stores/mapdata'
import { useDirectionsStore } from '@/stores/directions'
import { waytype, type mappoint, type mapway } from '@/mapdatatypes'

let isDirectionsHide = ref(false)
let mapdataStore = useMapdataStore()
let directionsStore = useDirectionsStore()

let startp = ref('')
let endp = ref('')
let typepreset = ref('any')

let resultHTML = ref('')

async function reverse() {
    let cs, ce
    cs = startp.value
    ce = endp.value

    startp.value = ce
    endp.value = cs
}

type Graph = { [node: string]: { [neighbor: string]: { distance: number; path: mapway } } }

function findPath(A: string, B: string, paths: mapway[]) {
    for (const path of paths) {
        for (let i = 0; i < path.paths.length - 1; i++) {
            if ((path.paths[i].id === A && path.paths[i + 1].id === B) || (path.paths[i].id === B && path.paths[i + 1].id === A)) {
                return path
            }
        }
    }
    return null
}

async function dijkstra(graph: Graph, start: string, end: string): Promise<{ distance: number; path: string[]; ways: mapway[] }> {
    let distance: { [node: string]: number } = {}
    let paths: { [node: string]: string[] } = {}
    let ways: { [node: string]: mapway[] } = {}

    for (let node in graph) {
        distance[node] = Infinity
        paths[node] = []
        ways[node] = []
    }
    distance[start] = 0
    paths[start] = [start]

    let queue: string[] = [start]
    while (queue.length > 0) {
        let currentNode = queue.shift()!
        for (let neighbor in graph[currentNode]) {
            let newDistance = distance[currentNode] + graph[currentNode][neighbor].distance
            if (newDistance < distance[neighbor]) {
                distance[neighbor] = newDistance
                queue.push(neighbor)
            }
            paths[neighbor] = [...paths[currentNode], neighbor]
            ways[neighbor] = [...ways[currentNode], graph[currentNode][neighbor].path]
        }
    }
    return {
        distance: distance[end],
        path: paths[end],
        ways: ways[end]
    }
}

const euclidianDistance = (px: number, py: number, qx: number, qy: number) => Math.round(Math.sqrt((px - qx) ** 2 + (py - qy) ** 2))

function getNearNode(target: mappoint, allowedType: waytype[]) {
    let result: { [key: string]: { distance: number; path: mapway } } = {}
    let datas = mapdataStore.ways
    for (let i = 0; i < datas.length; i++) {
        const e = datas[i]
        if (!allowedType.includes(e.mytype)) continue
        if (!e.paths.every((v) => v.id != target.id)) {
            const index = e.paths.indexOf(target)
            if (typeof e.paths[index + 1] != 'undefined')
                result[e.paths[index + 1].id] = {
                    distance: euclidianDistance(target.x!, target.y!, e.paths[index + 1].x!, e.paths[index + 1].y!),
                    path: e
                }
            if (typeof e.paths[index - 1] != 'undefined')
                result[e.paths[index - 1].id] = {
                    distance: euclidianDistance(target.x!, target.y!, e.paths[index - 1].x!, e.paths[index - 1].y!),
                    path: e
                }
        }
    }
    console.log(result)
    return result
}

async function calcDirections() {
    let graph: Graph = {}
    let whitelist

    switch (typepreset.value) {
        case 'transit':
            whitelist = [waytype.BUS, waytype.MONORAIL, waytype.RAPPIDTRAIN, waytype.TRAIN, waytype.TRAM]
            break

        case 'car':
            whitelist = [waytype.ROAD, waytype.HIGHWAY, waytype.SERVERHIGHWAY, waytype.EXPWY]
            break

        case 'carWithoutExpress':
            whitelist = [waytype.ROAD, waytype.HIGHWAY, waytype.SERVERHIGHWAY]
            break

        case 'airline':
            whitelist = [waytype.AIRLINE]
            break

        case 'any':
        default:
            whitelist = [
                waytype.AIRLINE,
                waytype.BUS,
                waytype.EXPWY,
                waytype.HIGHWAY,
                waytype.MONORAIL,
                waytype.RAPPIDTRAIN,
                waytype.ROAD,
                waytype.SERVERHIGHWAY,
                waytype.TRAIN,
                waytype.TRAM
            ]
            break
    }

    for (const e of mapdataStore.points) {
        if (typeof e.x == 'undefined' || typeof e.y == 'undefined') continue
        graph[e.id] = await getNearNode(e, whitelist)
    }

    const dresult = await dijkstra(
        graph,
        mapdataStore.points.find((v) => startp.value == v.displayname ?? '')?.id ?? '',
        mapdataStore.points.find((v) => endp.value == v.displayname ?? '')?.id ?? ''
    )

    console.log(dresult)

    mapdataStore.directionsResultNow = {
        distance: dresult.distance,
        paths: [],
        ways: []
    }

    for (const elm of dresult.path) {
        mapdataStore.directionsResultNow.paths.push(mapdataStore.points.find((v) => v.id == elm)!)
    }

    const spoint = mapdataStore.directionsResultNow.paths[0]
    const sway = findPath(mapdataStore.directionsResultNow.paths[0].id, mapdataStore.directionsResultNow.paths[1].id, mapdataStore.ways)

    resultHTML.value = `<li style="border-color: black;" class="point_transfer"><span>${spoint.displayname ?? spoint.id} / ${spoint.x} ${spoint.y}</span></li>
    <li style="border-color: #${(sway ?? { color: '0x000000' }).color.slice(2)};" class="way"><span>${(sway ?? { displayname: 'ERROR' }).displayname}</span></li>`

    let prevway = null

    mapdataStore.directionsResultNow.ways = dresult.ways

    for (let i = 1; i < mapdataStore.directionsResultNow.paths.length - 1; i++) {
        const point = mapdataStore.directionsResultNow.paths[i]
        const way = mapdataStore.directionsResultNow.ways[i]
        resultHTML.value += `
        <li style="border-color: #${(way.color ?? '0x000000').slice(2)};" class="${prevway != null && way.id == prevway.id ? 'point_via' : 'point_transfer'}"><span>${point.displayname ?? point.id} / ${point.x} ${point.y}</span></li>
        <li style="border-color: #${(way.color ?? '0x000000').slice(2)};" class="way"><span>${way.displayname ?? way.id}</span></li>
        `
        prevway = way
    }
    resultHTML.value += `<li style="border-color: black;" class="point_transfer"><span>${endp.value}</span></li>`

    directionsStore.graphics = mapdataStore.directionsResultNow.paths
}

// @ts-ignore
const updateTypePreset = (event) => (typepreset.value = event.target.value)
</script>

<template>
    <div @click="isDirectionsHide = !isDirectionsHide" class="directionstogglebtn"></div>
    <div class="directionsroot" v-bind:class="{ hide: isDirectionsHide }">
        <h1>{{ mapdataStore.directionsNow.title }}</h1>
        <span class="sub">{{ mapdataStore.directionsNow.subtitle }}</span>
        <br /><br /><br />

        <label>フォーカスすると候補が出てきます: </label>
        <div style="display: flex">
            <input list="pointlist" placeholder="開始地点" v-model="startp" />
            <input list="pointlist" placeholder="目的地点" v-model="endp" />
        </div>

        <datalist id="pointlist">
            <option v-for="e in mapdataStore.points" :key="e.id" :value="e.displayname"></option>
        </datalist>

        <select v-bind:value="typepreset" @change="updateTypePreset" class="typeselect">
            <option value="any" selected>(交通手段を選択してください)</option>
            <option value="transit">公共交通機関</option>
            <option value="car">車</option>
            <option value="carWithoutExpress">車 (有料道なし)</option>
            <option value="airline">飛行機</option>
        </select>

        <div style="display: flex">
            <a class="btn isync" @click="reverse()"></a>
            <a class="btn idirections" @click="calcDirections()"></a>
        </div>

        <ul class="resultarea" v-html="resultHTML"></ul>
    </div>
</template>

<style scoped>
@import url('@/assets/style/components/directions.css');
</style>
