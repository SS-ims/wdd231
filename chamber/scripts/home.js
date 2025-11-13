// FOOTER DATES
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// WEATHER API SETTINGS
const API_KEY = "0032371a1ab5579119bdd08ab8e12b78";
const lat = -20.1325;  // Bulawayo
const lon = 28.6265;

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

getWeather();
getForecast();


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

loadSpotlights();
