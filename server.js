// Cat Chat API — Express + Claude
// COMPLETED VERSION — all four routes are implemented.

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
// TODO 1 (DONE): A basic GET route at /api/hello
// No Claude call here — just proof that the route works.
//
// Test with Thunder Client:
// GET http://localhost:3000/api/hello
// ---------------------------------------------------------------------------
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

// ---------------------------------------------------------------------------
// TODO 2 (DONE): A POST route at /api/ask that sends a prompt to Claude
//
// Test with Thunder Client:
// POST http://localhost:3000/api/ask
// Body: { "prompt": "Why do cats purr?" }
// ---------------------------------------------------------------------------
app.post("/api/ask", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Please send a 'prompt' in the request body." });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ answer: response.content[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong talking to Claude." });
  }
});

// ---------------------------------------------------------------------------
// TODO 3 (DONE): A POST route at /api/cats with a cat expert system prompt
// The system prompt gives Claude a personality and a length limit.
//
// Test with Thunder Client:
// POST http://localhost:3000/api/cats
// Body: { "question": "Why do cats knead blankets?" }
// ---------------------------------------------------------------------------
app.post("/api/cats", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Please send a 'question' in the request body." });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: "You are a cat expert. Answer everything about cats in 2-3 sentences.",
      messages: [{ role: "user", content: question }],
    });

    res.json({ answer: response.content[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong talking to Claude." });
  }
});

// ---------------------------------------------------------------------------
// TODO 4 (DONE): A POST route at /api/summarize that summarizes text
//
// Test with Thunder Client:
// POST http://localhost:3000/api/summarize
// Body: { "text": "Paste a few paragraphs of an article here..." }
// ---------------------------------------------------------------------------
app.post("/api/summarize", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Please send 'text' in the request body." });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: "Summarize the following text in 2-3 bullet points.",
      messages: [{ role: "user", content: text }],
    });

    res.json({ summary: response.content[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong talking to Claude." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
