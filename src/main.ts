import { GatewayIntentBits, Client, Partials, Message } from "discord.js";
import dotenv from "dotenv";
import { DialogueDto } from "./dto/dialogueDto";
import { SaveLog } from "./util";

dotenv.config(); // .envファイルの読み込み

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel],
})

const dialogueHistory: DialogueDto[] = []; // 対話履歴

client.on("ready", () => {
    console.log("Bot is ready");
})

client.on("messageCreate", async (message: Message) => {
    if (message.author.bot) { // 自身の発言である場合
        return;
    }

    message.channel.send("Hello, World!");
})

client.login(process.env.BOT_TOKEN); // Discord上のBotを起動