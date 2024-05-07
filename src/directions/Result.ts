let directionresults = document.getElementById('directionresults') as HTMLDivElement;

// 経路結果コントロール
export class DirectionsResult {
    static clear() {
        directionresults.innerHTML = "";
    }

    static add(html: string) {
        directionresults.insertAdjacentHTML('afterbegin', html);
    }
}