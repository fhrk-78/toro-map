import { directionObject } from "../directions/Directions";
import { HTMLBuilder } from "../utils/HTMLBuilder";

let routeGuide = document.getElementById('routeGuide') as HTMLDivElement;

export class RouteGuideHandler {
    static clear() {
        routeGuide.innerHTML = "";
    }

    static add(res: directionObject) {
        for (let i = 0; i < res.direction.length; i++) {
            const e = res.direction[i];
            if (res.direction.length-1 != i) {
                routeGuide.insertAdjacentHTML('afterbegin', HTMLBuilder.direcitonMainCard(e.min, e.line.name, `${e.from.name} >>> ${e.to.name}`, e.line.color, e.distance));
                routeGuide.insertAdjacentHTML('afterbegin', HTMLBuilder.direcitonSubCard(e.to.name, e.line.name, res.direction[i+1].line.name));
            } else {
                routeGuide.insertAdjacentHTML('afterbegin', HTMLBuilder.direcitonMainCard(e.min, e.line.name, `${e.from.name} >>> ${e.to.name}`, e.line.color, e.distance));
            }
        }
    }

    static show() {
        routeGuide.classList.remove('hide');
    }

    static hide() {
        routeGuide.classList.add('hide');
    }
}
