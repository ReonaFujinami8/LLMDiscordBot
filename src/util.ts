import { Message } from "discord.js";
import { DialogueDto } from "./dto/dialogueDto";
import { DialogueRole } from "./enum/DialogueRole";
import fs from "fs/promises";

/**
 * これまでの対話ログを保存する
 */
export async function SaveLog(dialogueHistory: DialogueDto[]){
    if(dialogueHistory.length === 0){
        return;
    }

    const now = new Date();
    const filePath: string = `./log/${String(now.getFullYear())}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}.txt`;

    const stringBuilder: string[] = [];
    for (const dialogue of dialogueHistory) {
        if (dialogue.role === DialogueRole.Self) {
            stringBuilder.push(`自分の発言「${dialogue.content}」`)
        }
        else {
            stringBuilder.push(`相手の発言「${dialogue.content}」`)
        }
    }

    const content = stringBuilder.join("\n");

    try{
        await fs.mkdir("./Logs", { recursive: true });
        await fs.writeFile(filePath, content, "utf-8");
    }
    catch (e: unknown) {
        console.log(`error: ${e}`);
    }
}

/**
 * チャンネル内のメッセージを削除する
 * @param message 受信メッセージ
 */
export async function ClearChannel(message: Message) {
    const channel = message.channel;

    console.log(`チャンネル「${channel.id}」のメッセージを削除します。`);

    if (!channel.isTextBased() || !("messages" in channel)) {
        return;
    }

    while (true) {
        const messages = await channel.messages.fetch({ limit: 100 });

        if (messages.size === 0) {
            break;
        }

        for (const msg of messages.values()) {
            try {
                await msg.delete();
            }
            catch (e: unknown) {
                console.error(`メッセージ「${msg.id}」の削除に失敗しました。`);
            }
        }

        const remaining = await channel.messages.fetch({ limit: 100 });

        console.log(`削除後のメッセージ数: ${remaining.size}`);

        for (const msg of remaining.values()) {
            console.log(
                `残存メッセージ: ${msg.id} / ${msg.author.username} / ${msg.content}`
            );
        }
    }
}