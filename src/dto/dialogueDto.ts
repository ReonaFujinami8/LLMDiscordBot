import { DialogueRole } from "../enum/DialogueRole";

export class DialogueDto {
    role: DialogueRole; // ルール
    content: string;    // 対話内容

    /**
     * コンストラクタ
     * @param role 話者ロール
     * @param content 対話内容 
     */
    constructor(role: DialogueRole, content: string) {
        this.role = role;
        this.content = content;
    }
}