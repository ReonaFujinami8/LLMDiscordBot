# LLM Discord Bot

Discord上でユーザーと対話するLLMベースのBotです。

Discord.jsを用いてDiscordと接続し、OpenAI APIを利用してユーザーの発言に対する応答を生成します。

開発環境はDockerで構築しており、Node.js / TypeScript環境をコンテナ内で実行します。

## Features

- Discord上でユーザーと対話
- OpenAI APIによる応答生成
- 対話履歴を保持した会話
- `/clear` による対話履歴のリセット
- 対話履歴のログ保存
- Dockerによる開発環境の構築

## Tech Stack

- Node.js 22
- TypeScript
- discord.js
- OpenAI API
- Docker / Docker Compose
- tsx

## Project Structure

```text
.
├── src/
│   ├── main.ts
│   ├── bot.ts
│   ├── dto/
│   │   └── dialogueDto.ts
│   ├── enum/
│   │   └── DialogueRole.ts
│   └── util.ts
├── Logs/
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
