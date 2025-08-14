import { useCallback, useMemo, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import "./App.css";

/**
 * This function takes raw HTML from a website and extracts headlines from it
 * It looks for common HTML elements that usually contain headlines like h1, h2, h3 tags
 * and some specific patterns used by popular news sites
 */
function parseHeadlinesFromHtml(htmlString) {
  // Create a virtual document from the HTML string so we can search through it
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // These are the HTML elements we want to look for - common places where headlines appear
  const selectors = [
    "h1", // Main page headings
    "h2", // Section headings
    "h3", // Subsection headings
    "a.storylink", // Hacker News specific headline links
    "span.titleline a", // Reddit-style headline links
    "article h1 a", // News article main headlines
    "article h2 a", // News article sub-headlines
  ];

  // Find all elements that match our selectors
  const elements = Array.from(doc.querySelectorAll(selectors.join(",")));

  // Process each element to extract the headline text and link
  const items = elements
    .map((el) => {
      // Get the clean text content (remove extra whitespace)
      const text = (el.textContent || "").trim();
      // Get the link URL if it exists
      let href = el.getAttribute("href") || "";

      try {
        // If the link is relative (doesn't start with http), convert it to a full URL
        if (href && !href.startsWith("http")) {
          const base = doc.querySelector("base")?.getAttribute("href") || "";
          const origin = doc.location?.origin || "";
          const resolved = new URL(href, base || origin || undefined);
          href = resolved.toString();
        }
      } catch (_) {
        // If URL resolution fails, just keep the original href
      }

      return { text, href };
    })
    // Only keep items that actually have text content
    .filter((i) => i.text.length > 0);

  // Remove duplicate headlines (sometimes the same text appears multiple times)
  const seen = new Set();
  const deduped = [];
  for (const item of items) {
    if (!seen.has(item.text)) {
      deduped.push(item);
      seen.add(item.text);
    }
  }

  // Return up to 25 headlines to avoid overwhelming the user
  return deduped.slice(0, 25);
}

/**
 * This function fetches a website's HTML content through a CORS proxy
 * Since browsers block direct requests to other websites, we use AllOrigins service
 * to bypass this restriction
 */
async function fetchViaAllOrigins(url) {
  const endpoint = `https://api.allorigins.win/get?url=${encodeURIComponent(
    url
  )}`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  const data = await res.json();
  return data.contents;
}

/**
 * This function fetches the robots.txt file from a website
 * robots.txt tells web crawlers which parts of the site they can and cannot access
 * We check this to make sure we're not scraping forbidden areas
 */
async function fetchRobotsFor(urlString) {
  const url = new URL(urlString);
  // robots.txt is always located at the root of a website
  const robotsUrl = `${url.origin}/robots.txt`;
  const endpoint = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    robotsUrl
  )}`;
  const res = await fetch(endpoint);
  if (!res.ok) return ""; // If we can't fetch robots.txt, assume it's okay
  return await res.text();
}

/**
 * This function checks if a specific webpage path is allowed according to robots.txt
 * It parses the robots.txt file and looks for rules that apply to all web crawlers
 * This ensures we're being respectful of the website's crawling policies
 */
function isPathAllowedByRobots(robotsTxt, targetUrlString) {
  if (!robotsTxt) return true; // No robots.txt means everything is allowed

  const url = new URL(targetUrlString);
  const path = url.pathname || "/";

  // Split robots.txt into individual lines and process each one
  const lines = robotsTxt.split(/\r?\n/);
  let inGlobalAgent = false; // Are we currently reading rules for all crawlers?
  const disallows = []; // Store all the forbidden paths

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue; // Skip empty lines and comments

    // Split each line into key and value (e.g., "User-agent: *" -> ["User-agent", "*"])
    const [keyRaw, valueRaw] = line.split(":", 2);
    if (!keyRaw || !valueRaw) continue;

    const key = keyRaw.trim().toLowerCase();
    const value = valueRaw.trim();

    if (key === "user-agent") {
      // Check if this rule applies to all web crawlers
      inGlobalAgent = value === "*";
    } else if (inGlobalAgent && key === "disallow") {
      // If we're in the global section and see a disallow rule, add it to our list
      const rule = value;
      if (rule) disallows.push(rule);
    } else if (key === "user-agent" && value !== "*") {
      // We've entered a section for a specific crawler, not the global one
      inGlobalAgent = false;
    }
  }

  // Now check if our target path matches any of the forbidden rules
  for (const rule of disallows) {
    if (rule === "/") return false; // Root path is forbidden
    if (rule.endsWith("$")) {
      // Exact match rule (ends with $)
      const prefix = rule.slice(0, -1);
      if (path === prefix) return false;
    } else if (path.startsWith(rule)) {
      // Path starts with forbidden rule
      return false;
    }
  }

  return true; // If no rules block us, we're allowed
}

/**
 * Main App component - this is where everything happens!
 * It manages user authentication, URL input, and displays scraped results
 */
function App() {
  // State variables to keep track of what's happening in the app

  // Whether the user has successfully logged in with Google
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // User profile information (we don't use much of this, just basic login status)
  const [profile, setProfile] = useState(null);

  // The website URL that the user wants to scrape
  const [url, setUrl] = useState("https://news.ycombinator.com/");

  // Whether we're currently fetching data (shows loading spinner)
  const [isLoading, setIsLoading] = useState(false);

  // Any error messages to display to the user
  const [error, setError] = useState("");

  // The headlines we've scraped from the website
  const [items, setItems] = useState([]);

  /**
   * Handle user logout - clear all data and return to login screen
   */
  const handleLogout = useCallback(() => {
    try {
      googleLogout(); // Tell Google we're logging out
    } catch (_) {
      // If Google logout fails, that's okay - we'll still log out locally
    }
    // Reset all our state back to initial values
    setIsAuthenticated(false);
    setProfile(null);
    setItems([]);
  }, []);

  /**
   * Called when Google login is successful
   * We get some user info back from Google and mark the user as logged in
   */
  const onLoginSuccess = useCallback((credentialResponse) => {
    setIsAuthenticated(true);
    setProfile({
      name: "Signed in",
      sub: credentialResponse?.clientId,
    });
  }, []);

  /**
   * Called if Google login fails for any reason
   * Show an error message to the user
   */
  const onLoginError = useCallback(() => {
    setError("Login failed. Please try again.");
  }, []);

  /**
   * This is the main function that does the web scraping!
   * It takes the URL the user entered, checks if it's allowed, then fetches and parses the content
   */
  const fetchData = useCallback(async () => {
    setError(""); // Clear any previous errors
    setIsLoading(true); // Show loading spinner

    try {
      // Step 1: Basic validation - make sure it's a real website URL
      const target = new URL(url);
      if (!["http:", "https:"].includes(target.protocol)) {
        throw new Error("Only http/https URLs are supported.");
      }

      // Step 2: Check robots.txt to make sure we're allowed to scrape this page
      const robotsTxt = await fetchRobotsFor(url);
      const allowed = isPathAllowedByRobots(robotsTxt, url);
      if (!allowed) {
        throw new Error(
          "Fetching this path is disallowed by robots.txt for user-agent *. Please choose another page."
        );
      }

      // Step 3: Fetch the actual webpage content
      const html = await fetchViaAllOrigins(url);

      // Step 4: Parse the HTML to extract headlines
      const parsed = parseHeadlinesFromHtml(html);

      // Step 5: Check if we found any headlines
      if (parsed.length === 0) {
        setError("No headlines found. Try a different page.");
      }

      // Step 6: Save the results for display
      setItems(parsed);
    } catch (e) {
      // If anything goes wrong, clear the results and show the error
      setItems([]);
      setError(e.message || "Failed to fetch data");
    } finally {
      // Always hide the loading spinner, whether we succeeded or failed
      setIsLoading(false);
    }
  }, [url]);

  /**
   * Check if we have a Google OAuth client ID configured
   * This determines whether the login button will work
   */
  const hasClientId = useMemo(
    () => Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID),
    []
  );

  // The main UI - this is what the user sees
  return (
    <div className="container">
      {/* Header with app name and logout button */}
      <header className="header">
        <div className="brand">Restaverse Scraper</div>
        {isAuthenticated ? (
          <button className="btn btn-secondary" onClick={handleLogout}>
            Log out
          </button>
        ) : null}
      </header>

      {/* Show different content based on whether user is logged in */}
      {!isAuthenticated ? (
        // LOGIN SCREEN - shown when user hasn't signed in yet
        <div className="card auth">
          <h2>Welcome to Restaverse Scraper</h2>
          <p className="muted">
            Sign in securely with Google to access the web scraping portal
          </p>

          {/* Show warning if Google OAuth isn't configured */}
          {!hasClientId ? (
            <div className="warning">
              <span>⚠️</span>
              Missing VITE_GOOGLE_CLIENT_ID. Add it to a .env file to enable
              Google Login.
            </div>
          ) : null}

          {/* Google Sign-In button */}
          <div className="oauth">
            <GoogleLogin
              onSuccess={onLoginSuccess}
              onError={onLoginError}
              useOneTap={false}
              width="00"
            />
          </div>

          <p className="muted">
            We only use Google Sign-In to access this demo app. No backend is
            involved.
          </p>
        </div>
      ) : (
        // SCRAPING INTERFACE - shown after successful login
        <div className="card">
          <h2>🌐 Web Scraping Portal</h2>
          <p className="muted">
            Enter a public website URL to extract headlines and content
          </p>

          {/* URL input and fetch button */}
          <div className="form-row">
            <input
              type="url"
              className="input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/news"
            />
            <button className="btn" onClick={fetchData} disabled={isLoading}>
              {isLoading ? "Fetching..." : "🚀 Fetch Data"}
            </button>
          </div>

          {/* Loading message while scraping */}
          {isLoading ? (
            <div className="loader">
              Analyzing website and extracting content...
            </div>
          ) : null}

          {/* Error message if something went wrong */}
          {error ? (
            <div className="error">
              <span>❌</span>
              {error}
            </div>
          ) : null}

          {/* Results section - only show if we have scraped data */}
          {items.length > 0 && (
            <>
              {/* Results header with count */}
              <div className="results-header">
                <h3>📰 Extracted Content ({items.length} items)</h3>
                <p className="muted">Click on any item to visit the source</p>
              </div>

              {/* Grid of scraped headlines */}
              <div className="grid">
                {items.map((item, idx) => (
                  <a
                    key={idx}
                    className="card item"
                    href={item.href || url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="item-index">{idx + 1}</div>
                    <div className="item-text">{item.text}</div>
                  </a>
                ))}
              </div>

              {/* Refresh button to scrape the same URL again */}
              <div className="actions">
                <button
                  className="btn btn-secondary"
                  onClick={fetchData}
                  disabled={isLoading}
                >
                  🔄 Refresh Data
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Footer with important reminder */}
      <footer className="footer">
        <span className="muted">
          Respect websites' terms and robots.txt. For demo use only.
        </span>
      </footer>
    </div>
  );
}

export default App;
