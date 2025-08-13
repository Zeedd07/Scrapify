# 🚀 Quick Setup Guide - Restaverse Scraper

## ⚡ **5-Minute Setup**

### **1. Install Dependencies**
```bash
cd frontend
npm install
```

### **2. Get Google OAuth Client ID**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project → Enable Google+ API
3. Go to Credentials → Create OAuth 2.0 Client ID
4. Add `http://localhost:5173` to Authorized JavaScript origins
5. Copy the Client ID

### **3. Create Environment File**
Create `.env` in `frontend/` folder:
```bash
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

### **4. Run the App**
```bash
npm run dev
```
Open `http://localhost:5173`

## 🔑 **Your Client ID**
**Replace this**: `379095341881-r0g8h3e5gvi307fai15g5u9ngs2eeti6.apps.googleusercontent.com`

## 📖 **Full Documentation**
See `README.md` for complete setup instructions, deployment options, and troubleshooting.

## 🎯 **What You Get**
- ✅ Google OAuth login
- ✅ Web scraping from any public site
- ✅ Robots.txt compliance
- ✅ Responsive design
- ✅ Real-time updates

**Ready to scrape! 🕷️✨** 