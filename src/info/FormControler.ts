import { ERROR, LOG } from "../common";
import { REQ_URL } from "../Config";

export class formControler {
    static _form = document.getElementById('addnewf');
    static pin_ = document.getElementById('pin_addform');
    static pin_name = document.getElementById('name_addp') as HTMLInputElement;
    static pin_x = document.getElementById('x_addp') as HTMLInputElement;
    static pin_z = document.getElementById('z_addp') as HTMLInputElement;
    static pin_id_before = document.getElementById('id_before_addp') as HTMLInputElement;
    static pin_id_after = document.getElementById('id_after_addp') as HTMLInputElement;
    static pin_id_custom = document.getElementById('id_custom_addp') as HTMLInputElement;
    static pin_description = document.getElementById('description_addp') as HTMLInputElement;
    static pin_image = document.getElementById('image_addp') as HTMLInputElement;

    private static nulc = (s:any, a:any) => s == undefined || s == null || s == "" || s == "_" ? a : s;

    static show() {
        formControler._form?.classList.remove('hide');
    }

    static cancel() {
        formControler._form?.classList.add('hide');
    }

    static sendPin() {
        document.getElementById('regist_load')?.classList.remove('hide');
        LOG(formControler);
        let sendobj: {
            target: string,
            data: any[]
        } = {
            target: "pin",
            data: [
                String(formControler.nulc(formControler.pin_name.value, "名称なし")),
                parseInt(formControler.pin_x.value),
                parseInt(formControler.pin_z.value),
                String(formControler.nulc(formControler.nulc(formControler.pin_id_custom.value, formControler.pin_id_before.value + "_" + formControler.pin_id_after.value), crypto.randomUUID())),
                String(formControler.nulc(formControler.pin_description.value, "")),
                String(formControler.nulc(formControler.pin_image.value, "")),
            ]
        };
        const sendtext = JSON.stringify(sendobj);

        fetch(REQ_URL, {
            redirect: "follow",
            method: "POST",
            body: sendtext,
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
        })
            .then(response => response.json())
            .then(data => {
                LOG(data);
                location.reload();
            })
            .catch(error => ERROR(error));

    }
}