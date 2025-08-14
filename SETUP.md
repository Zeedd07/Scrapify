# 🚀 **Complete Setup Guide - Restaverse Scraper Portal**

## 📋 **What You'll Build**
A complete web scraping portal that allows users to:
- ✅ **Sign in securely** with Google OAuth 2.0
- ✅ **Scrape headlines** from any public website
- ✅ **View results** in a beautiful, responsive interface
- ✅ **Deploy easily** to production hosting platforms

---

## 🔧 **Prerequisites**

### **Required Software**
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for version control) - [Download here](https://git-scm.com/)

### **Required Accounts**
- **Google Account** (for OAuth setup)
- **Code Editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

### **System Requirements**
- **Operating System**: Windows 10/11, macOS, or Linux
- **Memory**: Minimum 4GB RAM
- **Storage**: 500MB free space
- **Browser**: Modern browser with JavaScript enabled

---

## 🛠️ **Step 1: Project Setup**

### **1.1 Navigate to Project Directory**
```bash
# Go to the frontend folder
cd frontend

# Verify you're in the right place
ls
# You should see: package.json, src/, public/, etc.
```

### **1.2 Install Dependencies**
```bash
# Install all required packages
npm install

# Verify installation
npm list --depth=0
```

### **1.3 Test Build Process**
```bash
# Make sure everything builds correctly
npm run build

# If successful, you'll see a 'dist' folder created
```

---

## 🔐 **Step 2: Google OAuth Setup**

### **2.1 Access Google Cloud Console**
1. **Visit**: [Google Cloud Console](https://console.cloud.google.com/)
2. **Sign in** with your Google account
3. **Accept terms** if prompted

### **2.2 Create New Project**
1. **Click** "Select a project" (top of page)
2. **Click** "New Project"
3. **Enter details**:
   - **Project name**: `Restaverse Scraper`
   - **Project ID**: Auto-generated (or customize)
4. **Click** "Create"
5. **Wait** for project creation (usually 10-30 seconds)

### **2.3 Enable Required APIs**
1. **In left sidebar**: Click "APIs & Services" → "Library"
2. **Search for**: "Google+ API" or "Google Identity"
3. **Click** on the API
4. **Click** "Enable"
5. **Wait** for API to be enabled

### **2.4 Configure OAuth Consent Screen**
1. **Go to**: "APIs & Services" → "OAuth consent screen"
2. **Choose user type**: Select "External" (allows any Google user)
3. **Click** "Create"
4. **Fill required information**:
   ```
   App name: Restaverse Scraper
   User support email: [your-email@gmail.com]
   Developer contact email: [your-email@gmail.com]
   App description: Web scraping application with Google authentication
   ```
5. **Click** "Save and Continue"
6. **For scopes**: Select "email" and "profile"
7. **Click** "Save and Continue" through remaining steps

### **2.5 Create OAuth Credentials**
1. **Go to**: "APIs & Services" → "Credentials"
2. **Click**: "+ CREATE CREDENTIALS" → "OAuth 2.0 Client IDs"
3. **Choose**: "Web application"
4. **Configure**:
   ```
   Name: Restaverse Scraper Web Client
   
   Authorized JavaScript origins:
   - http://localhost:5173 (for development)
   - http://localhost:3000 (alternative dev port)
   - https://your-production-domain.com (when deployed)
   
   Authorized redirect URIs:
   - http://localhost:5173
   - http://localhost:3000
   ```
5. **Click** "Create"
6. **Copy the Client ID** (format: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)

---

## ⚙️ **Step 3: Environment Configuration**

### **3.1 Create Environment File**
1. **In your `frontend` folder**, create a file named `.env`
2. **Add your Google OAuth Client ID**:

```bash
# .env file content
VITE_GOOGLE_CLIENT_ID=your_copied_client_id_here
```

### **3.2 Example Environment File**
```bash
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

### **3.3 Verify Environment Setup**
```bash
# Check if .env file exists
ls -la .env

# View file contents (optional)
cat .env
```

### **3.4 Important Notes**
- ✅ Variable name must be exactly: `VITE_GOOGLE_CLIENT_ID`
- ✅ No spaces around the `=` sign
- ✅ No quotes around the value
- ✅ File must be in the `frontend/` folder
- ✅ Restart the app after creating `.env`

---

## 🚀 **Step 4: Run the Application**

### **4.1 Start Development Server**
```bash
# Start the development server
npm run dev
```

### **4.2 Access Your Application**
- **URL**: `http://localhost:5173`
- **Port**: 5173 (default Vite port)
- **Status**: Development mode with hot reload enabled

### **4.3 Verify Application is Running**
You should see output similar to:
```
  VITE v7.1.2  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

---

## 🧪 **Step 5: Test All Functionality**

### **5.1 Test Google OAuth Authentication**
1. **Open** your browser to `http://localhost:5173`
2. **Click** "Sign in with Google"
3. **Complete** Google authentication flow
4. **Verify** you see the scraping interface after login
5. **Check** that your Google account info is displayed

### **5.2 Test Web Scraping Functionality**
1. **Enter a test URL**: `https://news.ycombinator.com/`
2. **Click** "Fetch" button
3. **Wait** for the scraping to complete
4. **Verify** headlines appear in the results grid
5. **Test** clicking on headlines to visit source pages

### **5.3 Test Responsive Design**
1. **Resize** your browser window
2. **Test** on mobile device or use browser dev tools
3. **Verify** the interface adapts to different screen sizes

### **5.4 Test Error Handling**
1. **Try** an invalid URL
2. **Verify** appropriate error messages appear
3. **Test** with websites that block scraping

---

## 🌐 **Step 6: Deploy to Production**

### **Option 1: Deploy to Vercel (Recommended)**

#### **Why Vercel?**
- ✅ Free tier available
- ✅ Automatic deployments from Git
- ✅ Built-in environment variables
- ✅ Excellent performance
- ✅ Easy setup

#### **Step-by-Step Deployment**
```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Build your project
npm run build

# 4. Deploy to Vercel
vercel
```

#### **Post-Deployment Configuration**
1. **Go to** [Vercel Dashboard](https://vercel.com/dashboard)
2. **Click** your project
3. **Go to** Settings → Environment Variables
4. **Add**: `VITE_GOOGLE_CLIENT_ID` = your_client_id
5. **Go to** [Google Cloud Console](https://console.cloud.google.com/)
6. **Add** your Vercel domain to authorized origins
7. **Redeploy** with environment variables:
   ```bash
   vercel --prod
   ```

### **Option 2: Deploy to Netlify**

#### **Step-by-Step Deployment**
```bash
# 1. Build your project
npm run build

# 2. Deploy to Netlify
# Go to netlify.com and drag your 'dist' folder
```

#### **Post-Deployment Configuration**
1. **In Netlify dashboard**: Go to Site Settings → Environment Variables
2. **Add**: `VITE_GOOGLE_CLIENT_ID` = your_client_id
3. **Update** Google OAuth origins with your Netlify domain

### **Option 3: Deploy to GitHub Pages**

#### **Step-by-Step Deployment**
```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Update package.json
# Add: "homepage": "https://yourusername.github.io/repository-name"
# Add: "deploy": "gh-pages -d dist"

# 3. Deploy
npm run build
npm run deploy
```

#### **Note**: GitHub Pages doesn't support environment variables, so you'll need to hardcode your Client ID or use a different approach.

---

## 🔧 **Configuration Options**

### **Customizing Headline Selectors**
Edit `src/App.jsx` to modify which HTML elements are scraped:

```javascript:frontend/src/App.jsx
// ... existing code ...
const selectors = [
  "h1",                    // Main headings
  "h2",                    // Section headings
  "h3",                    // Subsection headings
  "a.storylink",          // Custom class selectors
  "span.titleline a",      // Nested selectors
  "article h1 a",          // Article headlines
  "article h2 a",          // Article sub-headlines
  // Add your custom selectors here
  "div.headline a",        // Custom headline divs
  "span.news-title",       // News title spans
];
// ... existing code ...
```

### **Changing CORS Proxy Service**
If AllOrigins is slow, switch to another service:

```javascript:frontend/src/App.jsx
// ... existing code ...
async function fetchViaAllOrigins(url) {
  // Option 1: AllOrigins (current)
  const endpoint = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  
  // Option 2: CORS Anywhere
  // const endpoint = `https://cors-anywhere.herokuapp.com/${url}`;
  
  // Option 3: Your own proxy
  // const endpoint = `https://your-proxy.com/proxy?url=${encodeURIComponent(url)}`;
  
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  const data = await res.json();
  return data.contents;
}
// ... existing code ...
```

### **Modifying Robots.txt Rules**
Customize the robots.txt parsing logic:

```javascript:frontend/src/App.jsx
// ... existing code ...
function isPathAllowedByRobots(robotsText, urlPath) {
  // Add custom rules here
  const customRules = [
    '/admin/*',           // Block admin areas
    '/private/*',         // Block private areas
    '/api/*',             // Block API endpoints
  ];
  
  // Check custom rules first
  for (const rule of customRules) {
    if (urlPath.match(rule.replace('*', '.*'))) {
      return false;
    }
  }
  
  // ... existing robots.txt logic ...
}
// ... existing code ...
```

---

## 🐛 **Troubleshooting Guide**

### **Common Issues & Solutions**

#### **1. "Missing VITE_GOOGLE_CLIENT_ID" Error**
**Problem**: App shows error about missing environment variable
**Solution**:
```bash
# Check .env file exists
ls -la .env

# Verify variable name is exactly VITE_GOOGLE_CLIENT_ID
cat .env

# Restart development server
npm run dev
```

#### **2. Google Login Not Working**
**Problem**: Google sign-in button doesn't work or shows errors
**Solution**:
- ✅ Verify OAuth Client ID is correct in `.env`
- ✅ Check `http://localhost:5173` is in Google OAuth origins
- ✅ Ensure Google+ API is enabled
- ✅ Check browser console for error messages
- ✅ Verify OAuth consent screen is configured

#### **3. Scraping Fails or Shows Errors**
**Problem**: No headlines appear or scraping errors occur
**Solution**:
- ✅ Try different websites (use `https://news.ycombinator.com/` as test)
- ✅ Verify the URL is accessible in your browser
- ✅ Check if the site blocks CORS requests
- ✅ Some sites require JavaScript (not supported by this scraper)
- ✅ Check browser console for network errors

#### **4. Build Errors**
**Problem**: `npm run build` fails
**Solution**:
```bash
# Reinstall dependencies
npm install

# Fix security issues
npm audit fix

# Check for syntax errors in your code
npm run lint

# Verify Node.js version compatibility
node --version
```

#### **5. Port Already in Use**
**Problem**: Port 5173 is already occupied
**Solution**:
```bash
# Kill process using port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

### **Debug Mode**
Enable detailed logging for troubleshooting:

```javascript
// In browser console
localStorage.setItem('debug', 'true');

// Check console for detailed error messages
// Verify network requests in Network tab
```

---

## 🔒 **Security & Best Practices**

### **OAuth Security**
- ✅ **Never commit** `.env` file to version control
- ✅ **Use environment variables** in production
- ✅ **Regularly rotate** OAuth Client IDs
- ✅ **Monitor OAuth usage** in Google Cloud Console
- ✅ **Limit OAuth scopes** to minimum required

### **Ethical Scraping**
- ✅ **Always respect** robots.txt files
- ✅ **Don't overload** servers with requests
- ✅ **Follow website** terms of service
- ✅ **Use reasonable delays** between requests
- ✅ **This tool is for educational/demo purposes only**

### **Data Privacy**
- ✅ **No user data** is stored or transmitted
- ✅ **All scraping** happens client-side
- ✅ **Google OAuth** only provides authentication
- ✅ **No backend database** or logging
- ✅ **No tracking** or analytics

### **Production Security**
- ✅ **Use HTTPS** for all production URLs
- ✅ **Implement rate limiting** if needed
- ✅ **Monitor for abuse** or excessive usage
- ✅ **Regular security updates**
- ✅ **Backup OAuth configurations**

---

## 📚 **Technical Architecture**

### **Frontend Stack**
- **React 19** - Modern UI framework with hooks
- **Vite** - Fast build tool and dev server
- **CSS Variables** - Consistent theming system
- **Responsive Grid** - Mobile-first design

### **Key Functions**
- **`parseHeadlinesFromHtml`** - HTML parsing engine
- **`fetchViaAllOrigins`** - CORS proxy integration
- **`isPathAllowedByRobots`** - Robots.txt compliance
- **`fetchData`** - Main scraping orchestration

### **State Management**
- **Local state** with React hooks
- **No external state libraries** needed
- **Session-based authentication** with Google OAuth

---

## 🔄 **Updates & Maintenance**

### **Keeping Dependencies Updated**
```bash
# Check for outdated packages
npm outdated

# Update packages safely
npm update

# Update to latest versions (may break things)
npm audit fix
```

### **Monitoring OAuth Usage**
- Check Google Cloud Console regularly
- Monitor API quotas and limits
- Review OAuth consent screen analytics
- Set up alerts for unusual usage

---

## 🎯 **Success Checklist**

After completing setup, verify:

- ✅ **Dependencies** installed successfully
- ✅ **Google OAuth Client ID** configured
- ✅ **Environment variables** set correctly
- ✅ **Development server** runs without errors
- ✅ **Google login** works
- ✅ **Web scraping functionality** works
- ✅ **Responsive design** displays correctly
- ✅ **Error handling** works properly
- ✅ **Application builds** successfully
- ✅ **Ready for deployment**

---

## 📞 **Support & Resources**

### **Getting Help**
1. **Check this documentation** first
2. **Review code comments** in `src/App.jsx`
3. **Check browser console** for error messages
4. **Verify all setup steps** are completed

### **Useful Links**
- [Google Cloud Console](https://console.cloud.google.com/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

---

## 🎉 **Congratulations!**

You now have a fully functional web scraping portal with:
- ✅ **Secure Google OAuth authentication**
- ✅ **Ethical web scraping** with robots.txt compliance
- ✅ **Beautiful, responsive user interface**
- ✅ **Production-ready deployment options**
- ✅ **Comprehensive documentation**

**Your Restaverse Scraper portal is ready to use! 🚀✨**

---

## 📄 **License & Legal**

This project is for **educational and demonstration purposes only**. Users are responsible for:
- Complying with website terms of service
- Respecting robots.txt files
- Following applicable laws and regulations
- Using the tool responsibly and ethically

---

*This documentation covers the complete setup and configuration process. For additional questions or issues, refer to the troubleshooting section or check the project's GitHub repository.* 