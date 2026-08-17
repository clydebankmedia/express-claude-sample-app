// Cat Chat API — Express + Claude
// The server setup is done for you. Your job is to fill in the TODO routes below.

const express = require("express");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();

// Lets Express read JSON bodies from POST requests
app.use(express.json());

// The Claude client. It reads your API key from the .env file.
// Run the server with: node --env-file=.env server.js
const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

// A simple route to confirm the server is running
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Claude Sample App API!" });
});

// ---------------------------------------------------------------------------
// TODO 1: Create a GET route at /api/hello
// This route should:
// - Respond with a JSON object containing a message
// - Example: { "message": "Hello from the API!" }
//
// This one does NOT call Claude. It's just to confirm you can add a route.
//
// Test with Thunder Client:
// GET http://localhost:3000/api/hello
//
// Expected response:
// { "message": "Hello from the API!" }
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// TODO 2: Create a POST route at /api/ask
// This route should:
// - Get the "prompt" from req.body
// - Send it to Claude using client.messages.create()
//     model: "claude-sonnet-5"
//     max_tokens: 1024
//     messages: [{ role: "user", content: prompt }]
// - Return the response text as JSON
//   (the text lives at response.content[0].text)
//
// Remember: client.messages.create() returns a promise, so make your route
// handler async and await the result.
//
// Test with Thunder Client:
// POST http://localhost:3000/api/ask
// Body: { "prompt": "Why do cats purr?" }
//
// Expected response:
// { "answer": "Cats purr for several reasons..." }
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// TODO 3: Create a POST route at /api/cats
// This route should:
// - Get the "question" from req.body
// - Add a system prompt so Claude answers like a cat expert:
//     system: "You are a cat expert. Answer everything about cats in 2-3 sentences."
// - Call Claude with the system prompt and the user's question
// - Return the response text as JSON
//
// The system option goes at the top level of client.messages.create(),
// right alongside model, max_tokens, and messages.
//
// Test with Thunder Client:
// POST http://localhost:3000/api/cats
// Body: { "question": "Why do cats knead blankets?" }
//
// Expected response:
// { "answer": "Kneading is a leftover kitten behavior..." }
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// TODO 4: Create a POST route at /api/summarize
// This route should:
// - Get the "text" from req.body
// - Send it to Claude with a system prompt:
//     system: "Summarize the following text in 2-3 bullet points."
// - Return the summary as JSON
//
// Test with Thunder Client:
// POST http://localhost:3000/api/summarize
// Body: { "text": "Paste a few paragraphs of an article here..." }
//
// Expected response:
// { "summary": "- First point\n- Second point\n- Third point" }
// ---------------------------------------------------------------------------

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
