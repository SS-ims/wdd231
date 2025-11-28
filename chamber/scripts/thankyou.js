// thankyou.js

document.addEventListener("DOMContentLoaded", () => {
  // === FOOTER INFO ===
  const yearSpan = document.querySelector("#year");
  const lastModifiedSpan = document.querySelector("#lastModified");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

  // === HAMBURGER MENU TOGGLE (same behavior as join.js) ===
  const menuButton = document.querySelector("#menu-button");
  const navLinks = document.querySelector("#nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      // Toggle visibility
      const isOpen = navLinks.classList.toggle("show");

      // Reflect state for accessibility
      menuButton.classList.toggle("active", isOpen);
      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");

      // Swap icon between hamburger and cross
      menuButton.textContent = isOpen ? "✕" : "☰";
    });
  }

  // === EXTRACT FORM DATA FROM URL ===
  const params = new URLSearchParams(window.location.search);

  // Populate thank-you info fields
  const fieldMap = {
    fname: "#fname",
    lname: "#lname",
    email: "#email",
    phone: "#phone",
    organization: "#organization",
    membership: "#membership",
    timestamp: "#timestamp",
  };

  Object.entries(fieldMap).forEach(([key, selector]) => {
    const element = document.querySelector(selector);
    const value = params.get(key);
    if (element) {
      if (key === "timestamp" && value) {
        const date = new Date(value);
        element.textContent = isNaN(date)
          ? "Invalid date"
          : date.toLocaleString();
      } else {
        element.textContent = value && value.trim() !== "" ? value : "—";
      }
    }
  });
});
