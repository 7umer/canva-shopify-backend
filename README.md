# Canva Shopify Backend Integration

## 📌 Overview

This project is a Node.js backend that integrates with Canva using OAuth 2.0.

Users can:

* Connect their Canva account
* Authenticate securely
* Return to the app after authorization
* View design details (Design ID & Download URL)

---

## 🚀 Live Demo

🔗 Backend URL:

```
https://canva-shopify-backend.onrender.com
```

🔗 Start OAuth Flow:

```
https://canva-shopify-backend.onrender.com/connect
```

🔗 Frontend Test Page:

```
https://canva-shopify-backend.onrender.com/frontend/test.html
```

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* Axios
* dotenv

---

## 📂 Final Project Structure

```
project-root/
│
├── frontend/                     # Static frontend (test.html)
│
├── src/
│   ├── config/                  # Config files
│   ├── controllers/             # Canva OAuth logic
│   ├── routes/                  # API routes
│   ├── services/                # API/service logic
│   └── app.js                   # Express app setup
│
├── .gitignore                   # Ignore secrets & dependencies
├── package.json                 # Dependencies
├── package-lock.json
├── server.js                    # Entry point
└── README.md                    # Documentation
```

---

## ⚙️ Environment Variables

```
CANVA_CLIENT_ID=your_client_id
CANVA_CLIENT_SECRET=your_client_secret
CANVA_AUTH_URL=https://www.canva.com/api/oauth/authorize
CANVA_TOKEN_URL=https://api.canva.com/rest/v1/oauth/token
CANVA_REDIRECT_URI=https://canva-shopify-backend.onrender.com/oauth/callback
FRONTEND_URL=https://canva-shopify-backend.onrender.com/frontend/test.html
```

---

## 🔄 OAuth Flow

1. User opens:

```
/connect
```

2. Redirected to Canva login
3. User (Allow access)
4. Redirected back to:

```
/oauth/callback
```

5. Backend processes request
6. Redirect to frontend:

```
/frontend/test.html
```

---

## 🧪 Testing URLs

| Purpose      | URL                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Health Check | [https://canva-shopify-backend.onrender.com](https://canva-shopify-backend.onrender.com)                                       |
| Start OAuth  | [https://canva-shopify-backend.onrender.com/connect](https://canva-shopify-backend.onrender.com/connect)                       |
| Frontend     | [https://canva-shopify-backend.onrender.com/frontend/test.html](https://canva-shopify-backend.onrender.com/frontend/test.html) |

---

## 🌐 Deployment

Backend is deployed on Render:

```
https://canva-shopify-backend.onrender.com
```

---

## 📩 Submission (for Canva)

Provide this URL:

```
https://canva-shopify-backend.onrender.com/connect
```

---

## ⚠️ Important Notes

* No localhost URLs used
* No ngrok URLs used
* Environment variables secured
* Fully deployed and publicly accessible

---

## 👨‍💻 Author

Umer Badal

---

## 📄 License

For demonstration and integration purposes only.
