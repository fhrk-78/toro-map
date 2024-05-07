import { pin, line } from "./common";

export const PIN_RADIUS = 10;
export const TRAIN_SPEED = 420; // m/min

//   -------------[WARN]------------
// * xとyは1の位の桁を切り落とす
// * pidは[都市名_駅名]の形を使用する

export const pins: pin[] = [
    {name:"小宮山口駅",x:544,y:-458,pid:'komiya_komiyasanguchi'},
    {name:"小宮駅",x:517,y:-449,pid:"komiya_komiya", description:"小宮市の市街地の地下に位置する主要な旅客ターミナル駅。小宮電鉄線を中心にいくつかの路線が乗り入れている。",src:"https://i.ibb.co/Wv6mTnV/komiya-sta.png"},
    {name:"小宮格闘センター前駅",x:484,y:-433,pid:"komiya_komiyafightingcenter"},
    {name:"小宮南駅",x:527,y:-430,pid:"komiya_komiyaminami"},
    {name:"小宮村駅",x:458,y:-449,pid:"komiya_komiyamura"},
    {name:"赤羽駅",x:435,y:-449,pid:"akabane_akabane"},
    {name:"T村駅",x:449,y:-410,pid:"tmura_tmura"},
    {name:"北小宮駅",x:550,y:-478,pid:"komiya_kitakomiya"},
    {name:"北平駅",x:550,y:-478,pid:"komiya_kitahira"},
]

//   -------------[WARN]------------
// * xとyは1の位の桁を切り落とす
// * lidは[会社名_路線名]の形を使用する

export const lines: line[] = [
    {name:"小宮電鉄線(テストデータ1)",color:"orange",pid:["komiya_komiyafightingcenter","komiya_komiya","komiya_komiyasanguchi","komiya_kitakomiya"],lid:"komiya_1", type:"train"},
    {name:"小宮電鉄線(テストデータ2)",color:"orange",pid:["komiya_komiyaminami","komiya_komiya","komiya_komiyamura","akabane_akabane","tmura_tmura"],lid:"komiya_2", type:"train"},
    {name:"RR秘境線(テストデータ)",color:"yellow",pid:["komiya_komiyaminami","komiya_komiyasanguchi","komiya_kitahira"],lid:"komiya_2", type:"train"},
]
