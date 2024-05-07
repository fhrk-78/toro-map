// テンプレート化されたHTMLの生成ユーティリティ
export class HTMLBuilder {
    static directionResultCard(icon: "train" | "car", hour: number | null = null, min: number, distance: number, about: string, returnmethodname: string, returnmethodparam: string = "") {
        let i;
        switch (icon) {
            case "train":
                i = "t";
                break;
            case "car":
                i = "c";
                break;
        }
        return `<div class="di_res"><div><div class="i ${i}"></div><div><h3>${hour == null ? "" : `${hour}時間`}${String(min)}分 / ${distance}m</h3><p>${about}</p></div></div><div><a href="javascript:${returnmethodname}(${returnmethodparam});" class="s text">開始</a></div></div>`;
    }
}