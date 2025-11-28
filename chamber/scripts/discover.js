import { places } from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".discover-grid");
  const message = document.querySelector(".visit-message");

  // Display last visit message
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    message.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (days < 1) message.textContent = "Back so soon! Awesome!";
    else if (days === 1) message.textContent = "You last visited 1 day ago.";
    else message.textContent = `You last visited ${days} days ago.`;
  }

  localStorage.setItem("lastVisit", now);

  // Render place cards
  places.forEach(place => {
    const card = document.createElement("article");
    card.classList.add("discover-card");
    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="${place.image}" alt="${place.name}">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button class="cta-button">Learn More</button>
    `;
    grid.appendChild(card);
  });

  // Update footer date
  document.querySelector("#year").textContent = new Date().getFullYear();
  document.querySelector("#lastModified").textContent = document.lastModified;
});
