const API_KEY = "AIzaSyAlOTPiuYSBI3CNqL8Kr7chrZZDKCem8SE";

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

async function runChat(prompt) {
  const ai = new GoogleGenAI({
    apiKey: API_KEY,
  });
  const config = {
    responseMimeType: "text/plain",
  };
  const model = "gemini-2.5-pro-exp-03-25";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let responseText = "";
  for await (const chunk of response) {
    responseText += chunk.text;
  }
  return responseText;
}

export default runChat;
