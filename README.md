# 🪞 Digital Twin Journal

**An AI-powered journaling web app** that brings your past self to life. Reflect, grow, and receive meaningful insights from a digital twin built from your own emotions and memories.

---

## 📌 Features

- 📝 Create, edit, and delete journal entries
- 💡 AI-generated reflections from your past self using Gemini
- 📈 Mood analytics with emotion charts (weekly/monthly)
- 👻 Customize your twin’s emoji avatar and tone (funny, wise, sarcastic, gentle)
- 💬 Chat with your Digital Twin about life, growth, and emotions
- 📅 Explore your growth through a Memory Timeline

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Spring Boot
- MySQL
- Google Gemini API (for AI reflections)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/digital-twin-journal.git
cd digital-twin-journal
```

###2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

###3. Setup Backend
```bash
cd backend
./mvnw spring-boot:run
```
-Edit src/main/resources/application.properties to match your local database setup:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/journal_db
spring.datasource.username=root
spring.datasource.password=yourpassword

gemini.api.key=your_google_gemini_api_key
```
###⚙️ Folder Structure
```bash
digital-twin-journal/
├── frontend/     # React + Tailwind frontend
├── backend/      # Spring Boot API + MySQL + Gemini integration
└── README.md
```
###Mood visualizations over weeks/months

Interactive timeline of entries and AI reactions

Growth markers like:

“💪 Day 10: You were more confident”

“😔 July was emotionally low”

🧠 How "Past You" Works
Journal entries are processed using Google Gemini API

AI reflects using previous mood data, tone, and writing style

User customizes ghost tone: sarcastic, wise, funny, gentle

Responses feel like advice from your own memory

🧪 Features in Progress
🗣️ Ghost twin voice replies

📱 Mobile responsive design

🔔 Notifications from Past You

🕯️ Save "milestone memories"

👤 Author
Mathesh
🔗 GitHub
🔗 LinkedIn
###⭐️ Give a Star
If you like this project, show support by starring 🌟 it on GitHub!
```bash

---

Let me know if you'd like help with:
- `.gitignore` file
- pushing to GitHub
- writing documentation for any specific feature (like Gemini reflection logic or chat interface)

I'm ready when you are.
```
