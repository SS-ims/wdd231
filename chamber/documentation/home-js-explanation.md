# JavaScript Code Analysis: home.js
**Chamber of Commerce Website - Home Page Functionality**

---

## Overview
The `home.js` file contains JavaScript code that powers the dynamic functionality of the chamber of commerce home page. It handles three main features:
1. Dynamic footer date updates
2. Weather information display
3. Member spotlight section

---

## Code Structure Analysis

### 1. Footer Date Management
```javascript
// FOOTER DATES
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;
```

**Purpose:** Automatically updates footer information with current year and last modification date.

**How it works:**
- `document.querySelector("#year")` - Finds HTML element with ID "year"
- `new Date().getFullYear()` - Gets current year (e.g., 2025)
- `document.lastModified` - Gets last modification timestamp of the HTML document
- Both values are inserted into their respective HTML elements

**Benefits:**
- Eliminates need for manual year updates
- Provides transparency about when content was last updated

---

### 2. Weather API Integration

#### Configuration Constants
```javascript
// WEATHER API SETTINGS
const API_KEY = "0032371a1ab5579119bdd08ab8e12b78";
const lat = -20.1325;  // Bulawayo
const lon = 28.6265;
```

**Purpose:** Stores OpenWeatherMap API credentials and geographic coordinates.

**Details:**
- API key for authentication with OpenWeatherMap service
- Latitude and longitude coordinates for Bulawayo (fictional Wakanda location)
- Constants ensure values don't change during execution

#### Current Weather Function
```javascript
// GET CURRENT WEATHER
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  document.querySelector("#current-weather").innerHTML = `
    <p><strong>Temperature:</strong> ${data.main.temp}&deg;C</p>
    <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
  `;
}
```

**Purpose:** Fetches and displays current weather conditions.

**Process Flow:**
1. **API URL Construction** - Builds request URL with coordinates, API key, and metric units
2. **Async Fetch** - Makes HTTP request to OpenWeatherMap API
3. **JSON Parsing** - Converts response to JavaScript object
4. **DOM Manipulation** - Updates HTML element with weather data
5. **Data Extraction:**
   - `data.main.temp` - Current temperature
   - `data.weather[0].description` - Weather condition description

#### Forecast Function
```javascript
// GET 3-DAY FORECAST
async function getForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  let forecastHTML = "";
  let dayCount = 0;

  data.list.forEach(item => {
    if (item.dt_txt.includes("12:00:00") && dayCount < 3) {
      forecastHTML += `
        <p><strong>${new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "long" })}:</strong> ${item.main.temp}&deg;C</p>
      `;
      dayCount++;
    }
  });

  document.querySelector("#forecast").innerHTML = forecastHTML;
}
```

**Purpose:** Fetches and displays 3-day weather forecast.

**Process Flow:**
1. **API Request** - Gets 5-day forecast data (3-hour intervals)
2. **Data Filtering** - Selects only noon readings (`12:00:00`) for each day
3. **Day Counter** - Limits output to 3 days using `dayCount` variable
4. **Date Formatting** - Converts timestamp to readable weekday name
5. **HTML Generation** - Builds forecast display with temperature data

**Key Features:**
- Uses `forEach()` to iterate through forecast array
- Filters for noon readings to get representative daily temperature
- Formats dates using `toLocaleDateString()` with weekday option

---

### 3. Member Spotlight System

```javascript
// SPOTLIGHTS (Gold + Silver only)
async function loadSpotlights() {
  const response = await fetch("data/members.json");
  const data = await response.json();

  const premiumMembers = data.members.filter(m => m.membership >= 2);
  const shuffled = premiumMembers.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  const container = document.querySelector("#spotlight-container");

  selected.forEach(member => {
    container.innerHTML += `
      <article class="spotlight-card">
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">${member.website}</a>
        <p class="badge ${member.membership === 3 ? "gold" : "silver"}">
          ${member.membership === 3 ? "Gold Member" : "Silver Member"}
        </p>
      </article>
    `;
  });
}
```

**Purpose:** Displays random selection of premium chamber members.

**Process Flow:**

1. **Data Loading**
   - Fetches member data from local JSON file
   - Converts JSON response to JavaScript object

2. **Member Filtering**
   - `filter(m => m.membership >= 2)` - Selects only Gold (3) and Silver (2) members
   - Excludes Bronze (1) and Basic (0) membership levels

3. **Randomization**
   - `sort(() => 0.5 - Math.random())` - Shuffles array randomly
   - Creates fair rotation of featured members

4. **Selection**
   - `slice(0, 3)` - Takes first 3 members from shuffled array
   - Ensures exactly 3 spotlights display

5. **HTML Generation**
   - Creates article elements for each selected member
   - Includes: image, name, contact info, website link
   - Applies conditional CSS classes based on membership level

**Membership Logic:**
- Gold Members (level 3): Display "Gold Member" badge
- Silver Members (level 2): Display "Silver Member" badge
- Badge styling controlled by CSS classes

---

### 4. Function Execution

```javascript
getWeather();
getForecast();
loadSpotlights();
```

**Purpose:** Immediately executes all main functions when script loads.

**Execution Order:**
1. Weather data fetch begins
2. Forecast data fetch begins  
3. Member spotlight loading begins
4. All functions run asynchronously (parallel execution)

---

## Technical Concepts Used

### Async/Await Pattern
- **Purpose:** Handles asynchronous operations cleanly
- **Benefits:** Avoids callback complexity, readable code flow
- **Usage:** API calls and JSON file loading

### DOM Manipulation
- **querySelector():** Finds specific HTML elements
- **innerHTML:** Updates element content with HTML
- **textContent:** Updates element with plain text

### Array Methods
- **filter():** Creates new array with filtered elements
- **forEach():** Iterates through array elements
- **sort():** Reorders array elements
- **slice():** Extracts portion of array

### Template Literals
- **Backtick syntax:** Enables multi-line strings and variable interpolation
- **${variable}:** Embeds JavaScript expressions in strings
- **HTML Generation:** Creates dynamic content efficiently

---

## API Dependencies

### OpenWeatherMap API
- **Current Weather:** `/data/2.5/weather` endpoint
- **Forecast:** `/data/2.5/forecast` endpoint
- **Parameters:** Latitude, longitude, API key, units
- **Response Format:** JSON with weather data

### Local Data
- **Members JSON:** `data/members.json` file
- **Structure:** Array of member objects with properties:
  - name, address, phone, website, image, membership level

---

## Performance Considerations

### Async Operations
- Multiple API calls execute in parallel
- Non-blocking execution prevents page freezing
- Error handling could be enhanced with try/catch blocks

### DOM Updates
- Single DOM queries per function
- Batch HTML generation before DOM insertion
- Efficient use of innerHTML for complex content

---

## Security Notes

### API Key Exposure
- API key visible in client-side code
- Consider environment variables for production
- OpenWeatherMap has usage limits per key

### External Links
- Member websites open in new tabs (`target="_blank"`)
- Could benefit from `rel="noopener"` for security

---

## Potential Improvements

1. **Error Handling**
   - Add try/catch blocks for API failures
   - Display fallback content if data unavailable

2. **Loading States**
   - Show loading indicators during API calls
   - Improve user experience with skeleton content

3. **Caching**
   - Cache weather data to reduce API calls
   - Store member data locally for faster loading

4. **Accessibility**
   - Add ARIA labels for screen readers
   - Ensure proper heading hierarchy

---

**Document Generated:** November 13, 2025  
**Code Version:** Chamber of Commerce Home Page JavaScript  
**File Location:** `/chamber/scripts/home.js`