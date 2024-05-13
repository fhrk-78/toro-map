import { pin, line } from "../common";

interface dbres {
    pin: (string | number)[][],
    line: (string | number)[][]
}

let test = {
    "pin":[
        ["駅名","中心のX座標","中心のZ座標","ID (<都市名_駅名> がおすすめです/カンマは使用できません)","説明 (任意)","画像URL (任意)"],
        ["新晴牧駅",2200,-8911,"harumaki_shinharumaki","晴牧市の中央部に位置する大規模駅。平原鉄道、KR線が乗り入れている。","https://i.ibb.co/Cpc6qFq/2024-05-13-21-08-44.png"],
        ["西中海駅",2202,-8189,"harumaki_nishichukai","",""]
    ],
    "line":[
        ["名前","色","経路 (ピンのIDをカンマで区切って複数入力して下さい)","路線ID","種類 (train限定)"],
        ["KR海原本線","#9500ff","harumaki_shinharumaki,harumaki_nishichukai","kr_umiharamain","train"]
    ]
}

function get(): Promise<dbres> {
    return fetch("https://script.google.com/macros/s/AKfycbwezotBmCkcq8iNUn0F8Tu2Ft3g8O3lAZhzCYlsO5OcphxG_86ZGFw5mWjwkw0bvud-/exec")
        .then(function (response) {
            return response.json();
        });
}

export async function getpin() {
    let db = await get();
    let res: Array<pin> = [];
    let _pin = db.pin.slice(1);

    for (const e of _pin) {
        res.push({
            name: String(e[0]),
            x: Number(e[1])/10,
            y: Number(e[2])/10,
            pid: String(e[3]),
            description: (e[4] as string | undefined),
            src: (e[5] as string | undefined)
        });
    }

    return res;
}

export async function getline() {
    let db = await get();
    let res: Array<line> = [];
    let _line = db.line.slice(1);

    for (const e of _line) {
        res.push({
            name: String(e[0]),
            color: String(e[1]),
            pid: String(e[2]).split(','),
            lid: String(e[3]),
            type: (e[4] as "train" | "road" | "expwy")
        });
    }

    return res;
}
