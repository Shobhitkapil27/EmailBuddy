# ✉️ AI-Based Email Reply Generator

An intelligent email reply generator that uses the power of Google's Gemini API for generating context-aware email responses. The application consists of a React-based frontend and a Spring Boot backend.

## 🚀 Features

- 🧠 AI-generated email replies using Google Gemini API
- ⚛️ Modern, responsive frontend built with React
- ☕ Secure and scalable backend built with Spring Boot
- 📬 Support for dynamic email context input and reply customization
- 🔒 Token-based authentication (optional)

---

## 🏗️ Architecture

React (Frontend)
⬇️ HTTP (REST API)
Spring Boot (Backend)
⬇️ API call
Google Gemini API


---

## 🖥️ Frontend (React)

### Tech Stack
- React (with Hooks)
- Axios for API calls
- Material UI


## Backend (Spring Boot)
### Tech Stack
- Java 17+
- Spring Boot
- RESTful API
- Google Gemini API client
- Lombok 




🧠 How It Works
The user inputs an email to reply to on the frontend.

The data is sent to the Spring Boot backend via REST API.

The backend formats the input and makes a request to the Google Gemini API.

Gemini returns a context-aware, fluent reply.

The backend returns the generated reply to the frontend for display.



✅ TODO / Improvements
Add login/auth (JWT)

Save email history (using PostgreSQL or MongoDB)

Support multiple languages

Rich text editor in the frontend

🛡️ License
MIT License

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first.

📬 Contact
For inquiries or suggestions, contact shobhitkapil276@gmail.com
