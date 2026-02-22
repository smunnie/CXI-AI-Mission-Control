
# 🛰 Mission Control – AI Chief of Staff for Team Leads

Mission Control is an AI-powered executive dashboard designed to help team leads understand what’s happening across their team at a glance.

It aggregates signals from:

- 📧 Emails  
- 💬 Slack / Messages  
- 📋 Jira / Project Updates  

And uses **Claude (Anthropic)** to:

- Detect urgent issues  
- Identify emerging risk patterns  
- Assess execution health  
- Recommend decisive next steps  

Built with:

- **Frontend:** React  
- **Backend:** FastAPI  
- **AI Engine:** Anthropic Claude (Structured Output Mode)

---

# 🚀 Features

- 🔥 Urgent signal detection  
- ⚠ Emerging risk clustering  
- 📈 Execution health trend tracking  
- 🧠 AI-generated executive insights  
- 🎯 Prioritized recommended actions  
- 🔍 Filter by source and category  
- 📊 Time-window analysis  

---

# 🏗 Architecture

Frontend (React)
        ↓
FastAPI Backend
        ↓
Claude (Anthropic API – Structured JSON)

The backend enforces a strict Pydantic schema and uses Claude structured output to guarantee validated responses.

---

# 📂 Project Structure

mission-control/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   ├── .env.example
│
├── frontend/
│   ├── src/
│   ├── package.json  
|   |__ ...
│
└── README.md

---

# ⚙️ Backend Setup (FastAPI)

1️⃣ Navigate to backend directory:

    cd backend

3️⃣ Install dependencies:

    pip install -r requirements.txt

4️⃣ Configure environment variables:

    cp .env.example .env

5️⃣ Run backend server:

    uvicorn app.main:app --reload

Backend runs at:

    http://127.0.0.1:8000

API docs available at:

    http://127.0.0.1:8000/docs

---

# 💻 Frontend Setup (React)

1️⃣ Navigate to frontend directory:

    cd frontend

2️⃣ Install dependencies:

    npm install

3️⃣ Start development server:

    npm run dev

Frontend runs at:

    http://localhost:5173

---


# Brighton University (Msc Computer Science)
## Team Members
  - Munirat Sulaimon(Me)
  - Kitty Anita Gwolitya
  - Sameh Sarwat Ahmed Mohammed Radwan
  - Annie-Sophie Labossiere
