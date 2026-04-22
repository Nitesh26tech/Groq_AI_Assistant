import express from 'express';
import cors from 'cors';
import Groq from "groq-sdk"; // npm i groq-sdk
import dotenv from "dotenv";
// import readlineSync from "readline-sync";
dotenv.config();

const PORT = process.env.PORT ?? 3000

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// connect with model
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// chat bot functionality
async function chatWithAI(userMessage) {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
You are a personal AI assistant of Nitesh.

About Nitesh:
- MERN Stack Developer
- Skills: React, Node.js, MongoDB, JavaScript,python,
- Projects: PG Management system, social media web app, library management app
- Goal: Become a professional full-stack developer, and currently looking for a job or internship

Rules:
- Answer only about Nitesh
- Keep answers short and clear
- Be friendly and professional
- Speak confidently
- Sound like a professional developer

Education:
- BSc 
- pursuing Mca
Experience:
- internship at skillEcted Pune
          `,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.log("ERROR:", err.message);
    return "Something went wrong !";
  }
}

//2 API Route
app.post("/chat", async (req, res) => {
  const userMessage = req.body.question;
  // console.log(req.body.question)
  // console.log(userMessage)


  if (!userMessage) {
    return res.json({ reply: "Please Write a message !!" });
  }

  const reply = await chatWithAI(userMessage);

  res.json({ reply });
});

// server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


//1 terminal based for testing
// async function startChat() {
//   console.log("Nitesh AI Chatbot Started (type 'exit' to stop)\n");

//   while (true) {
//     const input = readlineSync.question("You: ");

//     if (input.toLowerCase() === "exit") break;

//     const reply = await chatWithAI(input);

//     console.log("Nits Bot:", reply, "\n");
//   }
// }
// startChat();
