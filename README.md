# Restaverse Scraper - Complete Setup & Documentation

A React application that combines **Google OAuth 2.0 authentication** with **web scraping capabilities**. Users sign in securely, then can scrape headlines from public websites and view them in a beautiful, responsive interface.

## 🚀 **Features**

- ✅ **Google OAuth 2.0 Authentication** - Secure login without backend
- ✅ **Web Scraping Engine** - Extracts headlines from any public website
- ✅ **Robots.txt Compliance** - Ethical scraping with automatic policy checking
- ✅ **Responsive Design** - Works perfectly on all devices
- ✅ **Real-time Updates** - Refresh data with one click
- ✅ **Modern UI/UX** - Beautiful, intuitive interface

## 📋 **Prerequisites**

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Google Account** (for OAuth setup)
- **Code Editor** (VS Code recommended)

## 🛠️ **Installation & Setup**

### **Step 1: Clone/Download the Project**
```bash
# If you have the project files, navigate to the frontend directory
cd frontend

# Install all required dependencies
npm install
```

### **Step 2: Google OAuth Setup**

#### **2.1 Create Google Cloud Project**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `Restaverse Scraper`
4. Click "Create"

#### **2.2 Enable Google+ API**
1. In the left sidebar, click "APIs & Services" → "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on it and click "Enable"

#### **2.3 Configure OAuth Consent Screen**
1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" user type
3. Fill in required information:
   - **App name**: `Restaverse Scraper`
   - **User support email**: Your email
   - **Developer contact email**: Your email
4. Click "Save and Continue" through remaining steps

#### **2.4 Create OAuth Credentials**
1. Go to "APIs & Services" → "Credentials"
2. Click "+ CREATE CREDENTIALS" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. **Name**: `Restaverse Scraper Web Client`
5. **Authorized JavaScript origins**: Add these URLs:
   - `http://localhost:5173` (for development)
   - `http://localhost:3000` (alternative dev port)
   - Your production domain (when deployed)
6. Click "Create"

#### **2.5 Copy Client ID**
- Copy the generated Client ID (looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)
- Keep this safe - you'll need it in the next step

### **Step 3: Environment Configuration**
1. In your `frontend` folder, create a file named `.env`
2. Add your Google OAuth Client ID:
```bash
VITE_GOOGLE_CLIENT_ID=your_copied_client_id_here
```
3. Replace `your_copied_client_id_here` with the actual Client ID from Step 2.5

### **Step 4: Start Development Server**
```bash
npm run dev
```
The app will open at `http://localhost:5173`

## 🎯 **How to Use the Application**

### **1. Authentication**
- Open the app in your browser
- Click "Sign in with Google"
- Complete Google authentication
- You'll see the scraping interface after successful login

### **2. Web Scraping**
- **Enter URL**: Type a website URL (e.g., `https://news.ycombinator.com/`)
- **Click Fetch**: The app will:
  - Check robots.txt compliance
  - Fetch the webpage content
  - Extract headlines and links
  - Display results in a responsive grid
- **View Results**: Click on any headline to visit the source
- **Refresh**: Click "Refresh Data" to re-scrape the same URL

### **3. Supported Websites**
The scraper works best with:
- **News sites** (CNN, BBC, Reuters)
- **Blog platforms** (Medium, WordPress)
- **Social news** (Hacker News, Reddit)
- **Any site** with h1, h2, h3 tags or article links

## 🔧 **Configuration Options**

### **Customizing Headline Selectors**
Edit `src/App.jsx` to modify which HTML elements are scraped:
```javascript
const selectors = [
  "h1",                    // Main headings
  "h2",                    // Section headings
  "h3",                    // Subsection headings
  "a.storylink",          // Custom class selectors
  "span.titleline a",      // Nested selectors
  "article h1 a",          // Article headlines
  "article h2 a",          // Article sub-headlines
];
```

### **Changing CORS Proxy**
If AllOrigins is slow, you can switch to another service:
```javascript
// In fetchViaAllOrigins function
const endpoint = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
// Change to:
const endpoint = `https://cors-anywhere.herokuapp.com/${url}`;
```

### **Modifying Robots.txt Rules**
The app automatically respects robots.txt, but you can customize the parsing logic in the `isPathAllowedByRobots` function.

## 🚀 **Deployment**

### **Option 1: Vercel (Recommended)**
1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
# Build the project
npm run build

# Deploy to Vercel
vercel
```

3. **Configure Environment Variables**:
   - Go to Vercel dashboard
   - Add `VITE_GOOGLE_CLIENT_ID` with your Client ID
   - Update Google OAuth origins to include your Vercel domain

### **Option 2: Netlify**
1. **Build the project**:
```bash
npm run build
```

2. **Drag & Drop**:
   - Go to [Netlify](https://netlify.com)
   - Drag your `dist` folder to deploy
   - Add environment variables in site settings

### **Option 3: GitHub Pages**
1. **Add homepage to package.json**:
```json
{
  "homepage": "https://yourusername.github.io/repository-name"
}
```

2. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

3. **Add deploy script**:
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

4. **Deploy**:
```bash
npm run build
npm run deploy
```

## 🔒 **Security & Best Practices**

### **OAuth Security**
- Never commit your `.env` file to version control
- Use environment variables in production
- Regularly rotate OAuth Client IDs
- Monitor OAuth usage in Google Cloud Console

### **Ethical Scraping**
- Always respect robots.txt files
- Don't overload servers with requests
- Follow website terms of service
- Use reasonable delays between requests
- This tool is for educational/demo purposes only

### **Data Privacy**
- No user data is stored or transmitted
- All scraping happens client-side
- Google OAuth only provides authentication
- No backend database or logging

## 🐛 **Troubleshooting**

### **Common Issues**

#### **"Missing VITE_GOOGLE_CLIENT_ID" Error**
- Check that `.env` file exists in `frontend` folder
- Verify the variable name is exactly `VITE_GOOGLE_CLIENT_ID`
- Restart the development server after adding `.env`

#### **Google Login Not Working**
- Verify OAuth Client ID is correct
- Check that `http://localhost:5173` is in authorized origins
- Ensure Google+ API is enabled
- Check browser console for error messages

#### **Scraping Fails**
- Verify the URL is accessible
- Check if the site blocks CORS requests
- Some sites may require JavaScript (not supported)
- Try different websites to test

#### **Build Errors**
- Ensure all dependencies are installed: `npm install`
- Check for syntax errors in your code
- Verify Node.js version compatibility

### **Debug Mode**
Enable detailed logging by adding to your browser console:
```javascript
localStorage.setItem('debug', 'true');
```

## 📚 **Technical Architecture**

### **Frontend Stack**
- **React 19** - Modern UI framework
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

## 🔄 **Updates & Maintenance**

### **Keeping Dependencies Updated**
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update to latest versions (may break things)
npm audit fix
```

### **Monitoring OAuth Usage**
- Check Google Cloud Console regularly
- Monitor API quotas and limits
- Review OAuth consent screen analytics

## 📞 **Support & Contributing**

### **Getting Help**
1. Check this documentation first
2. Review the code comments in `src/App.jsx`
3. Check browser console for error messages
4. Verify all setup steps are completed

### **Code Structure**
```
frontend/
├── src/
│   ├── App.jsx          # Main application logic
│   ├── App.css          # Styling and responsive design
│   ├── main.jsx         # App entry point with OAuth setup
│   └── index.css        # Global styles
├── public/              # Static assets
├── .env                 # Environment variables (create this)
├── package.json         # Dependencies and scripts
└── README.md           # This documentation
```

## 📄 **License & Legal**

This project is for **educational and demonstration purposes only**. Users are responsible for:
- Complying with website terms of service
- Respecting robots.txt files
- Following applicable laws and regulations
- Using the tool responsibly and ethically

## 🎉 **Success!**

You now have a fully functional web scraping application with:
- ✅ Secure Google OAuth authentication
- ✅ Ethical web scraping with robots.txt compliance
- ✅ Beautiful, responsive user interface
- ✅ Production-ready deployment options
- ✅ Comprehensive documentation

Happy scraping! 🚀✨
