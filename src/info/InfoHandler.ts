import { pin } from "../common";

export class InfoHandler {
    static info_image = document.getElementById('info_image') as HTMLImageElement;
    static info_description = document.getElementById('info_description') as HTMLParagraphElement;
    static info_title = document.getElementById('info_title') as HTMLHeadingElement;

    static set(data: pin) {
        if (data.src != undefined) {
            InfoHandler.info_image.src = data.src;
        } else {
            InfoHandler.info_image.src = "";
        }
        InfoHandler.info_title.textContent = data.name;
        if (data.description != undefined) {
            InfoHandler.info_description.textContent = data.description;
        } else {
            InfoHandler.info_description.textContent = "";
        }
    }
}