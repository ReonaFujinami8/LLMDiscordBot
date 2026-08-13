import { GatewayIntentBits, Client, Partials, Message } from "discord.js";
import dotenv from "dotenv";
import { DialogueDto } from "./dto/dialogueDto";
import { ClearChannel, SaveLog } from "./util";
import { DialogueRole } from "./enum/DialogueRole";
import { Bot } from "./bot";

dotenv.config(); // .envファイルの読み込み

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const bot = new Bot(String(process.env.OPENAI_API_KEY), String(process.env.OPENAI_MODEL)); // OpenAIのBotを初期化

const dialogueHistory: DialogueDto[] = []; // 対話履歴

client.on("clientReady", () => {
    console.log("Bot is ready");
});

client.on("messageCreate", async (message: Message) => {
    if (message.author.bot) { // 自身の発言である場合
        return;
    }

    if (message.content == "/clear") {
        await SaveLog(dialogueHistory); // ログを保存
        ClearChannel(message);

        dialogueHistory.length = 0; // 対話履歴をクリア
        console.log("対話履歴をクリアしました。");

        return;
    }

    dialogueHistory.push(new DialogueDto(DialogueRole.Partner, message.content)); // ユーザーの発言を履歴に追加
    console.log(`相手の発言: ${message.content}`); // ユーザーの発言をログに出力

    let utterance: string | null = null;

    try {
        utterance = await bot.GenerateResponse(dialogueHistory); // OpenAIのBotに応答を生成させる
    }
    catch (e: unknown) {
        if (e instanceof Error) {
            console.error(e.message);
        }
    }

    if (utterance === null) {
        utterance = "。。。";
    }

    console.log(`自分の発言: ${utterance}`); // Botの応答をログに出力
    await message.reply(utterance); // Discord上で応答を返す
})

client.login(process.env.BOT_TOKEN); // Discord上のBotを起動