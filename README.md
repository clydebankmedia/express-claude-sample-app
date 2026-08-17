# Claude Sample App (Express + Claude API)

An Express server that talks to the Claude AI API, built one route at a time so you can see exactly how an app sends a prompt and gets an answer back.

This is a backend-only project. There is no frontend to build — you'll test every route with Thunder Client in VS Code.

## What You'll Learn

- How to set up an Express server that accepts JSON request bodies
- How to keep an API key out of your code using a `.env` file
- How to install and use the official Claude SDK (`@anthropic-ai/sdk`)
- How to send a prompt to Claude and read the response back
- How a **system prompt** shapes Claude's personality and answer format
- How to build POST routes that take input from a request body and return JSON

## Prerequisites

- [Node.js](https://nodejs.org) version 20 or newer (the `--env-file` flag needs it)
- npm (installed automatically with Node.js)
- [VS Code](https://code.visualstudio.com) with the [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) extension
- A Claude API key from [console.anthropic.com](https://console.anthropic.com)

## Getting Started

1. Clone the repository

```
git clone https://github.com/clydebankmedia/express-claude-sample-app.git
cd express-claude-sample-app
```

2. Install dependencies

```
npm install
```

3. Create your `.env` file

Copy `.env.example` to a new file named `.env`, then paste in your own key:

```
CLAUDE_API_KEY=sk-ant-your-key-here
```

Your `.env` file is listed in `.gitignore`, so your key never gets pushed to GitHub. Keep it that way.

4. Start the server

```
node --env-file=.env server.js
```

Express API → http://localhost:3000

The `--env-file` flag is built into Node. It loads your `.env` file for you — no `dotenv` package needed.

## Project Structure

```
├── server.js      Express server, Claude client, and the routes you'll build
├── package.json   Dependencies
├── .gitignore     Ignores node_modules and .env
├── .env.example   Template for your own .env file
└── README.md      You are here
```

## What You'll Build

The setup is done — Express, the JSON middleware, the Claude client, the welcome route at `/`, and `app.listen` are all in place. Your job is to write the four routes underneath.

Each spot is marked with a `TODO` comment telling you exactly what to do, what the request body looks like, and what to send back.

## TODOs

1. **GET /api/hello** — a warm-up route with no Claude call. Return a JSON object with a message like `"Hello from the API!"` so you can confirm your route works before adding AI to the mix.

2. **POST /api/ask** — your first Claude call. Pull `prompt` out of `req.body`, pass it to `client.messages.create()` with the model `claude-sonnet-4-20250514` and `max_tokens: 1024`, then send Claude's text back as JSON.

3. **POST /api/cats** — same idea, plus a personality. Pull `question` out of `req.body` and add a system prompt: `"You are a cat expert. Answer everything about cats in 2-3 sentences."` Notice how the system prompt changes the answer without changing the question.

4. **POST /api/summarize** — a practical use case. Pull `text` out of `req.body`, send it to Claude with the system prompt `"Summarize the following text in 2-3 bullet points."`, and return the summary as JSON.

## Testing Your Routes

Thunder Client is a REST client that lives inside VS Code, so you never have to leave your editor to test a route.

1. Install the **Thunder Client** extension from the VS Code Extensions panel
2. Click the thunderbolt icon in the sidebar
3. Click **New Request**
4. Set the method (GET or POST) and paste in the URL
5. For POST requests, open the **Body** tab, choose **JSON**, and type your JSON
6. Click **Send** and read the response on the right

Make sure your server is running in the terminal before you send a request.

**Say hello**

```
GET http://localhost:3000/api/hello
```

**Ask Claude anything**

```
POST http://localhost:3000/api/ask
Content-Type: application/json

{ "prompt": "Why do cats purr?" }
```

**Ask the cat expert**

```
POST http://localhost:3000/api/cats
Content-Type: application/json

{ "question": "Why do cats knead blankets?" }
```

**Summarize some text**

```
POST http://localhost:3000/api/summarize
Content-Type: application/json

{ "text": "Paste a few paragraphs here and see what comes back." }
```

## Troubleshooting

- **`Cannot read properties of undefined`** — your `.env` file is missing or you started the server without `--env-file=.env`
- **401 authentication error** — double-check the key in your `.env` file for typos or extra spaces
- **`Cannot POST /api/ask`** — the route isn't defined yet, or the server needs a restart to pick up your changes
- **Empty request body** — make sure `app.use(express.json())` is above your routes and that Thunder Client is sending JSON

## QuickStart Guides Academy

This project is part of the QuickStart Guides Academy curriculum.
Learn more at [quickstartguides.com](https://quickstartguides.com)
