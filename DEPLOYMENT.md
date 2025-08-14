# 🚀 Deployment Guide - Restaverse Scraper

## 📋 **Pre-Deployment Checklist**

Before deploying, ensure you have:
- ✅ Google OAuth Client ID configured
- ✅ App builds successfully (`npm run build`)
- ✅ All environment variables ready
- ✅ Production domain for OAuth origins

## 🌐 **Deployment Options**

### **Option 1: Vercel (Recommended) ⭐**

#### **Why Vercel?**
- Free tier available
- Automatic deployments from Git
- Built-in environment variables
- Excellent performance
- Easy setup

#### **Step-by-Step Deployment**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
# Build your project
npm run build

# Deploy to Vercel
vercel
```

4. **Configure Environment Variables**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to Settings → Environment Variables
   - Add: `VITE_GOOGLE_CLIENT_ID` = your_client_id

5. **Update Google OAuth Origins**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Add your Vercel domain to Authorized JavaScript origins
   - Format: `https://your-project.vercel.app`

6. **Redeploy with Environment Variables**
```bash
vercel --prod
```

---

### **Option 2: Netlify**

#### **Why Netlify?**
- Free tier available
- Drag & drop deployment
- Form handling
- Good performance

#### **Step-by-Step Deployment**

1. **Build Your Project**
```bash
npm run build
```

2. **Deploy to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Drag your `dist` folder to deploy
   - Or connect your GitHub repository

3. **Configure Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add: `VITE_GOOGLE_CLIENT_ID` = your_client_id

4. **Update Google OAuth Origins**
   - Add your Netlify domain to Google Cloud Console
   - Format: `https://your-site.netlify.app`

---

### **Option 3: GitHub Pages**

#### **Why GitHub Pages?**
- Free hosting
- Integrated with Git
- Good for open source projects

#### **Step-by-Step Deployment**

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
```json
{
  "homepage": "https://yourusername.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Deploy**
```bash
npm run deploy
```

4. **Configure Environment Variables**
   - GitHub Pages doesn't support environment variables
   - You'll need to hardcode your Client ID or use a different approach

---

### **Option 4: Firebase Hosting**

#### **Why Firebase?**
- Google's hosting platform
- Good integration with Google services
- Free tier available

#### **Step-by-Step Deployment**

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**
```bash
firebase login
```

3. **Initialize Firebase**
```bash
firebase init hosting
```

4. **Build and Deploy**
```bash
npm run build
firebase deploy
```

5. **Configure Environment Variables**
   - Use Firebase Functions for environment variables
   - Or hardcode in production build

---

## 🔧 **Environment Variables Setup**

### **Local Development (.env file)**
```bash
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

### **Production Platforms**

#### **Vercel**
- Dashboard → Settings → Environment Variables
- Add `VITE_GOOGLE_CLIENT_ID`

#### **Netlify**
- Site Settings → Environment Variables
- Add `VITE_GOOGLE_CLIENT_ID`

#### **Firebase**
- Use Firebase Functions or hardcode in build

#### **GitHub Pages**
- Not supported, requires alternative approach

---

## 🔒 **Security Considerations**

### **OAuth Configuration**
- ✅ Use environment variables in production
- ✅ Never commit Client IDs to Git
- ✅ Regularly rotate Client IDs
- ✅ Monitor OAuth usage

### **Domain Verification**
- ✅ Add production domain to Google OAuth origins
- ✅ Remove localhost origins in production
- ✅ Use HTTPS for all production URLs

### **CORS and Scraping**
- ✅ Respect robots.txt files
- ✅ Don't overload target servers
- ✅ Follow website terms of service

---

## 🚨 **Common Deployment Issues**

### **Build Failures**
```bash
# Check for errors
npm run build

# Common fixes
npm install
npm audit fix
```

### **OAuth Not Working in Production**
- Verify Client ID is correct
- Check domain is in authorized origins
- Ensure environment variables are set
- Check browser console for errors

### **Environment Variables Not Loading**
- Restart deployment after adding variables
- Verify variable names are exact
- Check platform-specific requirements

---

## 📊 **Post-Deployment**

### **Testing Checklist**
- ✅ OAuth login works
- ✅ Scraping functionality works
- ✅ Responsive design on mobile
- ✅ Error handling works
- ✅ Loading states display correctly

### **Monitoring**
- Check Google Cloud Console for OAuth usage
- Monitor deployment platform analytics
- Test on different devices and browsers

---

## 🎯 **Production URLs**

### **Update These in Google Cloud Console**
```
Development:
- http://localhost:5173
- http://localhost:3000

Production (replace with your actual domains):
- https://your-app.vercel.app
- https://your-site.netlify.app
- https://yourusername.github.io/repository-name
```

---

## 🎉 **Deployment Complete!**

Your Restaverse Scraper is now live and ready to use! 

**Next Steps:**
1. Test all functionality in production
2. Share your app with others
3. Monitor usage and performance
4. Consider adding analytics
5. Plan for future updates

**Happy Deploying! 🚀✨** 