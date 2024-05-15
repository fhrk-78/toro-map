import { ERROR, LOG } from "../common";
import { edit_mode_set, prev_focus, REQ_URL, setFocus, setPrevFocus } from "../Config";

export class lineEditorEngine {
    static _form = document.getElementById('addnewl');
    static line_ = document.getElementById('line_addform');
    static line_name = document.getElementById('name_addl') as HTMLInputElement;
    static line_color = document.getElementById('color_addl') as HTMLInputElement;
    static line_path = document.getElementById('path_addl') as HTMLInputElement;
    static line_id_before = document.getElementById('id_before_addl') as HTMLInputElement;
    static line_id_after = document.getElementById('id_after_addl') as HTMLInputElement;
    static line_id_custom = document.getElementById('id_custom_addl') as HTMLInputElement;

    static banner = document.getElementById('edit_mode_nav');

    static pl: string[] = [];
    static pla = (v:string) => lineEditorEngine.pl.push(v);

    private static nulc = (s:any, a:any) => s == undefined || s == null || s == "" || s == "_" ? a : s;

    static editStart() {
        edit_mode_set(true);
        lineEditorEngine.banner?.classList.remove('hide');
        setPrevFocus(undefined);
        setFocus(undefined);
    }

    static editCancel() {
        edit_mode_set(false);
        lineEditorEngine.banner?.classList.add('hide');
    }

    static show() {
        lineEditorEngine._form?.classList.remove('hide');
        lineEditorEngine.line_path.value = lineEditorEngine.pl.join(',');
    }

    static cancel() {
        lineEditorEngine._form?.classList.add('hide');
    }

    static sendLine() {
        document.getElementById('regist_load')?.classList.remove('hide');
        LOG(lineEditorEngine);
        let sendobj: {
            target: string,
            data: any[]
        } = {
            target: "line",
            data: [
                String(lineEditorEngine.nulc(lineEditorEngine.line_name.value, "名称なし")),
                String(lineEditorEngine.nulc(lineEditorEngine.line_color.value, "black")),
                String(lineEditorEngine.nulc(lineEditorEngine.line_path.value, "")),
                String(lineEditorEngine.nulc(lineEditorEngine.nulc(lineEditorEngine.line_id_custom.value, lineEditorEngine.line_id_before.value + "_" + lineEditorEngine.line_id_after.value), crypto.randomUUID())),
                "train"
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

        edit_mode_set(false);
        lineEditorEngine.banner?.classList.add('hide');
    }
}