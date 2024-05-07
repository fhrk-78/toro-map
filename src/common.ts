export interface pin {
    name: string,
    x: number,
    y: number,
    pid: string,
    description?: string,
    src?: string,
}

export interface line {
    name: string,
    color: string,
    pid: string[],
    lid: string,
    type: "train" | "car",
}

export interface courceObject {
    lid: string,
    fpid: string,
    tpid: string,
    distance: number,
}

export interface route {
    distance: number,
    cource: courceObject[],
}

export let LOGHISTORY: Array<any> = [];
export let LOG = (...data: any[]) => {console.log(data);LOGHISTORY.push(data);};
export let ERROR = (...data: any[]) => {console.error(data);LOGHISTORY.push(data);};

export const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

export const DIG_ARC = (dig: number) => dig * Math.PI / 180;
export const PIN_COLOR = (t: "station") => {
    if (t == "station") {
        return "#007bff";
    } else {
        return "";
    }
}
