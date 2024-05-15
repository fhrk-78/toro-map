import { pin, line } from "../common";
import { REQ_URL } from "../Config";

interface dbres {
    pin: (string | number)[][],
    line: (string | number)[][]
}

export async function get(): Promise<dbres> {
    return fetch(REQ_URL)
        .then(function (response) {
            return response.json();
        });
}

export function getpin(db: dbres) {
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

export function getline(db: dbres) {
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
