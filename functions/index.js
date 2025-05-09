/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const OpenAI = require('openai');
const {onRequest} = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

const OPENROUTER_API_KEY = defineSecret("OPENROUTER_API_KEY");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest({ 
  cors: true,
  secrets: [OPENROUTER_API_KEY]
}, async(request, response) => {
  try {
    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: OPENROUTER_API_KEY.value(),
    });
    
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4',
      messages: [
        {
          role: 'user',
          content: "tell me a joke",
        },
      ],
    });

    response.json(completion.choices[0].message);
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

exports.streamEndpoint = onRequest({ 
  cors: true, 
  secrets: [OPENROUTER_API_KEY] 
}, async (req, res) => {
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    return res.status(204).send("");
  }

  // Set CORS Headers for actual requests
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: OPENROUTER_API_KEY.value(),
  });

  let isEnded = false;
  const {messages, model} = req.body;

  const sendData = (data) => {
    if (!isEnded) {
      res.write(data.delta);
    }
  };
  
  const stream = await openai.chat.completions.create({
    model: model || 'openai/gpt-4',
    messages: messages || [{role: 'user', content: 'tell me a joke'}],
    stream: true,
  });

  (async () => {
    try {
      for await (const chunk of stream) {
        if (chunk.choices[0]?.delta?.content) {
          sendData({ delta: chunk.choices[0].delta.content });
        }
      }
    } catch (error) {
      console.error("Error during streaming:", error);
      sendData({ error: "Something went wrong" });
    } finally {
      if (!isEnded) {
        isEnded = true;
        res.end();
      }
    }
  })();
});

