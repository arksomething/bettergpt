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
  apiKey: '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',
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
