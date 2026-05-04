 AI Patient Doctor Recommendation System

An intelligent web application that analyzes patient symptoms using AI and recommends the most suitable doctor based on the condition.

 Features

 AI-based symptom analysis
 Smart doctor recommendations
 Secure authentication system (JWT)
 Admin dashboard for managing doctors
 chatbot interface for patient interaction
 Fast and responsive UI

 
 How It Works

1. Patient enters symptoms in the chatbot
2. AI model analyzes the symptoms
3. System identifies possible disease/condition
4. Recommends relevant doctor specialization
5. Displays available doctors



##  Tech Stack

### Frontend:

* React.js
* Axios
* Tailwind CSS / CSS

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB

### AI Integration:

* Google Gemini API

---

## Project Structure

```
/frontend
  /components
  /pages

/backend
  /controllers
  /routes
  /models
  /middlewares
```


  Installation
 1. Clone the repository


git clone https://github.com/your-username/ai-doctor-recommendation.git
cd ai-doctor-recommendation

2. Install dependencies


cd frontend
npm install

cd ../backend
npm install

 3. Setup environment variables

Create a `.env` file in backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
```

---

 Run the Project

```bash
# Run backend
cd backend
npm run dev

# Run frontend
cd frontend
npm run dev
```

 Future Improvements

* Disease prediction accuracy improvement
* Appointment booking system
* Multi-language support
* Voice input for symptoms

 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.


 Author

Developed by **Sachin Thakur**

---
