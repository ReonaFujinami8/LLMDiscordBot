import { OpenAI } from "openai"
import { DialogueDto } from "./dto/dialogueDto"
import { DialogueRole } from "./enum/DialogueRole";

export class Bot {
    client: OpenAI;
    model: string;

    /**
     * コンストラクタ
     * @param apiKey OpenAIのAPIキー
     * @param model OpenAIのモデル名
     */
    constructor(apiKey: string, model: string) {
        this.client = new OpenAI({
            apiKey: apiKey
        });

        this.model = model;
    }

    async GenerateResponse(dialogueHistory: DialogueDto[]): Promise<string | null> {
        const messages: OpenAI.ChatCompletionMessageParam[] = [];

        for (const dialogueIni of dialogueHistory) {
            if (dialogueIni.role == DialogueRole.Self) {
                messages.push({ role: "assistant", content: dialogueIni.content })
            }
            else {
                messages.push({ role: "user", content: dialogueIni.content })
            }
        }

        const completion = await this.client.chat.completions.create({
            model: this.model,
            messages: messages
        });

        return completion.choices[0].message.content;
    }
}