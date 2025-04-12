



# PulseCARE - Smart Care Assistant for Clinics

PulseCARE is an intelligent mobile and web-based health assistant designed to empower junior doctors and patients in small clinics. It provides streamlined clinical workflows, easy-to-use interfaces, and personalized AI-generated visual explanations for improved healthcare delivery.

---

https://pulse-care.netlify.app/

## 🚑 Problem Statement

In resource-constrained clinics, junior doctors often struggle with:
- Time-consuming manual data entry
- Missed early warnings and Adverse Drug Reactions (ADRs)
- Inefficient follow-up and documentation
PulseCARE addresses these issues with smart automation, voice-based input, and patient-friendly tools.

---

## 🎯 Objective

To develop a fully on-device app (and optional web app) that:
- Digitizes patient rounds and documentation
- Detects ADRs using rule-based/ML logic
- Lets patients log daily symptoms and vitals
- Generates animated explainers for better understanding
- Improves decision-making and doctor-patient engagement

---

## 🧩 Project Structure

PulseCARE/
├── backend/ # Handles medical data processing, animation, and video generation 
├── frontend/ # Flutter app serving the mobile UI 
├── assets/ # Sample data and visual content 
├── docs/ # Project documents and reference material


---

## 📱 Features

### 👩‍⚕️ Clinician Interface
- Secure login (role-based)
- Patient dashboard
- Fast entry: Vitals, Symptoms, Medications, Follow-ups
- Voice-to-text or template-based input
- End-of-day summaries
- ADR alerts via rule-based/ML logic
- Auto-generated reports (PDF)

### 🧑‍💼 Patient Interface
- Daily symptom/medication tracker
- Trend visualization (charts)
- Personalized animated health explainers (on-device)
- Optional reminders

---

## 🧠 Bonus Features
- Discharge/consultation report generator
- High-risk patient tagging
- Analytics dashboard for clinic-level insights
- Report sharing via email/PDF
- On-device processing (no internet required)

---

## 🛠️ Tech Stack

- **Frontend:** Flutter (mobile), HTML/CSS/JS or React (web)
- **Backend:** Python, Django, Django REST Framework
- **Database:** PostgreSQL
- **ML/Logic:** Scikit-learn, Rule-based heuristics
- **Deployment:** Docker + Render/AWS (optional)

---

## ⚙️ Modules

1. **Authentication** – Secure login via Django auth
2. **Patient Management** – CRUD for patient profiles
3. **Clinical Logs** – Store vitals, meds, symptoms
4. **ADR Detection** – Rule-based or ML triggers
5. **Reporting** – Auto-generated, downloadable summaries

---

## 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/theAIGuysCode/PulseCARE.git


🔮 Future Scope:

1.NLP-based voice symptom extraction
2.IoT device integration (for vitals)
3.WhatsApp/Telegram bots for reminders
4.AI Chatbot for FAQs and bookings

📄 License
MIT License – use freely, modify responsibly.

🤝 Contributions Welcome!
Pull requests, issues, and suggestions are encouraged. Let’s build better care together. ❤️

