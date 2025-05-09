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

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: 'none',
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest(async(request, response) => {
  // Enable CORS
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  try {
    const message = request.method === 'POST' ? request.body.message : 'What is the meaning of life?';
    
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4',
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    response.json(completion.choices[0].message);
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

exports.streamEndpoint = onRequest({ cors: true, secrets: [OPENAI_API_KEY] }, async (req, res) => {
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Origin", "*"); // Allow all origins (or specify your frontend)
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600"); // Cache preflight response for 1 hour
    return res.status(204).send(""); // End preflight response
  }
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY.value() });
  // Set CORS Headers for actual requests
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  let isEnded = false; // Flag to track if the response has ended
  const {messages, model} = req.body;

  const sendData = (data) => {
    if (!isEnded) {
      res.write(data.delta);
    }
  };

  const prompt = ``

  const stream = await openai.responses.create({
    model: model,
    input: [
      {role: "system", content: prompt},
        ...messages,
      {role: "user", content: userPrompt},
    ],
    stream: true,
  });

  (async () => {
    try {
      for await (const event of stream) {
        if (event.type == "response.output_text.delta"){ 
          sendData(event);
        }
        if (event.type === 'response.output_item.done') {
          break; // Exit the loop if the event indicates completion
        }
      }
    } catch (error) {
      console.error("Error during streaming:", error);
      sendData({ error: "Something went wrong" }); // Send error message to client
    } finally {
      if (!isEnded) {
        isEnded = true; // Set the flag to true
        res.end(); // End the response
      }
    }
  })();
});

