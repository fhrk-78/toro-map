import { ERROR, line, pin } from "../common";
import { pins, lines, TRAIN_SPEED } from "../Config";

interface directionsGen {
    distance: number,
    min: number,
}

export interface directionObject extends directionsGen {
    direction: directionChild[],
}

export interface directionChild extends directionsGen {
    direction: line,
    from: pin,
    to: pin,
    line: line,
}

export class Directions {
    static get(frompin: pin, topin: pin, transittype: "train"): directionObject {
        // ノード間の距離を計算する関数
        const calculateDistance = (pin1: pin, pin2: pin): number => {
            return Math.sqrt(Math.pow(pin1.x - pin2.x, 2) + Math.pow(pin1.y - pin2.y, 2));
        };

        // ダイクストラのアルゴリズムを実装
        let unvisited: pin[] = [...pins]; // 未訪問のノード
        let shortestDistances: { [key: string]: number } = {}; // 最短距離
        let previousNodes: { [key: string]: pin } = {}; // 前のノード
        let visitedLines: line[] = []; // 訪問済みのライン

        // 初期化
        unvisited.forEach((pin) => {
            shortestDistances[pin.pid] = Infinity; // 最初は全てのノードへの最短距離は無限大とする
        });
        shortestDistances[frompin.pid] = 0; // 出発地点から出発地点への距離は0

        while (unvisited.length > 0) {
            // 未訪問のノードの中で最短距離のノードを選択
            unvisited.sort((a, b) => shortestDistances[a.pid] - shortestDistances[b.pid]);
            let currentPin = unvisited.shift()!;

            // 現在のノードから接続されているラインを取得
            let connectedLines = lines.filter((line) => line.pid.includes(currentPin.pid) && line.type === transittype);

            connectedLines.forEach((line) => {
                // ラインが接続するピンを取得
                let connectedPins = line.pid.map((pid) => pins.find((pin) => pin.pid === pid)!).filter((pin) => pin !== currentPin);

                connectedPins.forEach((pin) => {
                    // 現在のノードから接続ノードへの距離を計算
                    let distance = calculateDistance(currentPin, pin);

                    // 現在のノード経由で接続ノードに移動する方が短い場合は、最短距離と前のノードを更新
                    if (shortestDistances[currentPin.pid] + distance < shortestDistances[pin.pid]) {
                        shortestDistances[pin.pid] = shortestDistances[currentPin.pid] + distance;
                        previousNodes[pin.pid] = currentPin;
                        visitedLines.push(line);
                    }
                });
            });
        }

        // 最短経路を取得
        let shortestPath: directionChild[] = [];
        let currentPin = topin;
        while (currentPin !== frompin) {
            let previousPin = previousNodes[currentPin.pid];
            let line = visitedLines.find((line) => line.pid.includes(currentPin.pid) && line.pid.includes(previousPin.pid))!;
            let distance = (shortestDistances[currentPin.pid] - shortestDistances[previousPin.pid])*10;
            let min;
            if (transittype == "train") {
                min = Math.ceil(distance/TRAIN_SPEED);
            } else {
                min = 0; //////////////////////////////////////
            }
            shortestPath.unshift({
                distance: Math.ceil(distance),
                min: min,
                direction: line,
                from: previousPin,
                to: currentPin,
                line: line,
            });
            currentPin = previousPin;
        }

        let distance = shortestDistances[topin.pid]*10;
        let min;
        if (transittype == "train") {
            min = Math.ceil(distance/TRAIN_SPEED);
        } else {
            min = 0; //////////////////////////////////////
        }
        // 結果を返す
        return {
            distance: Math.round(distance),
            min: min,
            direction: shortestPath,
        };
    }
}