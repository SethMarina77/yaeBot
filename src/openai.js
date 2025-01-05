const { OpenAI } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// Function to generate response from GPT-3 with Yae Miko's persona
async function getYaeMikoResponse(userMessage) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Choose the best model for responses
      messages: [
        {
          role: "system",
          content: `You are Yae Miko from Genshin Impact. You are mischievous, elegant, and often playful. Your tone is teasing, charming, and sometimes even a bit condescending, but in an endearing way. You enjoy conversation and tend to make others feel both amused and confused. Always playful, but also wise and intelligent. Respond to the user's question in a way that fits this personality.`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    return response.choices[0].message.content;  // Return the AI-generated response
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return "Fufu~ I seem to be in a bit of a bind. Please wait a moment...";
  }
}

module.exports = { getYaeMikoResponse };
