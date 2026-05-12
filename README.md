# MindMate 💚 — Mental Health Chatbot

A compassionate, AI-powered mental health support chatbot built with **Node.js + Express** on the backend and a plain **HTML/CSS/JavaScript** frontend. It uses the **Groq API** to deliver empathetic, real-time responses, with built-in crisis detection and emergency resource integration.

---

## ✨ Features

- 🤖 **AI-powered conversations** — Responses generated via the Groq LLM API for natural, empathetic dialogue
- 🛡️ **Crisis keyword detection** — Automatically identifies distress signals and surfaces emergency resources
- 📞 **Emergency resource integration** — Surfaces relevant hotlines and support contacts when needed
- 💬 **Empathetic response framing** — System prompt tuned specifically for mental health support interactions
- 🌐 **Lightweight frontend** — No framework overhead; pure HTML, CSS, and vanilla JavaScript

---

## 🗂️ Project Structure

```
mentalHealthChat/
├── frontend/               # Client-side UI (HTML, CSS, JS)
├── server.js               # Express backend entry point
├── package.json            # Dependencies and scripts
├── .env.example            # Environment variable template
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- A **Groq API key** — get one free at [console.groq.com](https://console.groq.com)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/NuHazim/mentalHealthChat.git
   cd mentalHealthChat
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Open `.env` and fill in your Groq API key:

   ```env
   GROQ_API_KEY=your_groq_api_key_here
   PORT=3000
   # or try 5000 for port
   ```
   Create a backend folder and put .env file inside
4. **Start the server**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000` by default.

5. **Open the app**

   Navigate to `http://localhost:3000` in your browser.

---

## 🔧 Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start the production server |
| `npm run dev` | Start the development server (same entry point) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express |
| AI / LLM | [Groq API](https://console.groq.com) |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Environment | dotenv |
| Cross-origin | cors |

---

## 🔒 Environment Variables

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | Your API key from [console.groq.com](https://console.groq.com) |

> ⚠️ Never commit your `.env` file. It is already included in `.gitignore`.

---

## ⚠️ Important Disclaimer

MindMate is **not a substitute for professional mental health care**. If you or someone you know is in crisis, please contact a qualified professional or reach out to an emergency helpline immediately.

**Malaysia:** Befrienders KL — `+603-7627 2929` (24 hours)  
**International:** [findahelpline.com](https://findahelpline.com)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**NuHazim** — [github.com/NuHazim](https://github.com/NuHazim)
