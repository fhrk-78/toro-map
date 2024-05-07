// テンプレート化されたHTMLの生成ユーティリティ
export class HTMLBuilder {
    static directionResultCard(icon: "train" | "car", min: number, distance: number, about: string, returnmethodname: string, returnmethodparam: string = "") {
        let i;
        switch (icon) {
            case "train":
                i = "t";
                break;
            case "car":
                i = "c";
                break;
        }
        return `<div class="di_res"><div><div class="i ${i}"></div><div><h3>${String(min)}分 / ${distance}m</h3><p>${about}</p></div></div><div><a href="javascript:${returnmethodname}(${returnmethodparam});" class="s text">開始</a></div></div>`;
    }
    static direcitonSubCard(sta: string, f: string, t: string) {
        return `<div class="t"><div class="tl"><span>${sta}</span></div><div class="mt"><h3>乗り換え</h3><p>${f} >>> ${t}<br><span>駅によっては乗り換えが不可能な場合もございます。ご了承ください。</span></p></div></div>`
    }
    static direcitonMainCard(min: number, linen: string, inlinehtml: string, color: string, distance: number) {
        return `<div class="t"><div class="tl" style="border-right: 0.5vw solid ${color};"><span>${String(min)}分</span></div><div class="mt"><h3>${linen} (${String(distance)}m)</h3><p>${inlinehtml}</p></div></div>`
    }
}