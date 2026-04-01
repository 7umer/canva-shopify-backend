# Canva Backend Integration (Node.js + Express)

## 📌 Overview

This project is a backend service that integrates with Canva using OAuth. It allows users to:

* Connect their Canva account
* Authenticate via Canva
* Handle OAuth callback
* (Optional) Export designs

This backend is deployed publicly so Canva reviewers can test the integration.

---

## 🚀 Live Demo

Base URL:

```
https://your-backend.onrender.com
```

Connect Endpoint:

```
https://your-backend.onrender.com/connect
```

OAuth Callback:

```
https://your-backend.onrender.com/oauth/callback
```

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* Axios
* dotenv

---

## 📂 Project Structure

```
project-root/
│
├── controllers/
│   └── canvaController.js
│
├── routes/
│   └── canvaRoutes.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```
CANVA_CLIENT_ID=your_client_id
CANVA_CLIENT_SECRET=your_client_secret
CANVA_REDIRECT_URI=https://your-backend.onrender.com/oauth/callback
```

---

## ▶️ Running Locally

1. Install dependencies:

```
npm install
```

2. Start server:

```
node server.js
```

3. Open in browser:

```
http://localhost:5000/connect
```

---

## 🌐 Deployment (Render)

### Step 1: Push code to GitHub

```
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [https://render.com](https://render.com)
2. Sign in with GitHub
3. Click **New → Web Service**
4. Select your repository

### Step 3: Configure Service

* Environment: Node
* Build Command:

```
npm install
```

* Start Command:

```
node server.js
```

### Step 4: Add Environment Variables

```
CANVA_CLIENT_ID=your_client_id
CANVA_CLIENT_SECRET=your_client_secret
CANVA_REDIRECT_URI=https://your-backend.onrender.com/oauth/callback
```

### Step 5: Deploy

After deployment, you will get:

```
https://your-backend.onrender.com
```

---

## 🔗 Canva App Configuration

In Canva Developer Dashboard:

Add Authorized Redirect URL:

```
https://your-backend.onrender.com/oauth/callback
```

---

## 🔄 OAuth Flow

1. User visits:

```
/connect
```

2. Redirected to Canva login

3. After login, Canva redirects to:

```
/oauth/callback
```

4. Backend exchanges code for access token

---

## 🧪 Testing

Open in browser:

```
https://your-backend.onrender.com/connect
```

Expected:

* Redirect to Canva login
* Successful callback handling

---

## ⚠️ Important Notes

* Do NOT use localhost for submission
* Do NOT use ngrok for Canva review
* Always use deployed backend URL
* Ensure redirect URI matches exactly in both places

---

## 📩 Submission to Canva

Provide this URL to reviewers:

```
https://your-backend.onrender.com/connect
```

---

## ✅ Status

* OAuth flow implemented ✔️
* Backend deployed ✔️
* Ready for Canva review ✔️

---

## 👨‍💻 Author

Your Name

---

## 📄 License

This project is for demonstration and integration purposes only.
