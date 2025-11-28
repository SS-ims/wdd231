// Timestamp field
document.querySelector("#timestamp").value = new Date().toISOString();

// Footer info
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Hamburger menu toggle (UNCHANGED)
const menuButton = document.querySelector("#menu-button");
const navLinks = document.querySelector("#nav-links");
menuButton.addEventListener("click", () => {
  // Toggle visibility
  const isOpen = navLinks.classList.toggle("show");

  // Reflect state on the button for accessibility
  menuButton.classList.toggle("active", isOpen);
  menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");

  // Swap icon between hamburger and cross
  menuButton.textContent = isOpen ? '✕' : '☰';
});

// Membership modals
const modals = document.querySelectorAll("dialog");
const links = document.querySelectorAll(".membership-cards a");
const closeButtons = document.querySelectorAll(".close-modal");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const modal = document.querySelector(link.getAttribute("href"));
    modal.showModal();
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener("click", e => {
    e.target.closest("dialog").close();
  });
});

// Allow closing modals with ESC key
modals.forEach(modal => {
  modal.addEventListener("cancel", () => modal.close());
});

// Card animation on load
window.addEventListener("load", () => {
  document.querySelectorAll(".card").forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    setTimeout(() => {
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, i * 200);
  });
});

// Client-side validation feedback (ENHANCED)
const form = document.querySelector("#membershipForm");

if (form) {
  // Show live feedback as user types
  form.addEventListener("input", e => {
    const field = e.target;
    if (field.tagName === "INPUT" || field.tagName === "TEXTAREA" || field.tagName === "SELECT") {
      if (field.checkValidity()) {
        field.style.borderColor = "#28a745"; // green
        field.style.backgroundColor = "#f6fff6";
      } else {
        field.style.borderColor = "#d9534f"; // red
        field.style.backgroundColor = "#fff5f5";
      }
    }
  });

  // Prevent submission if invalid
  form.addEventListener("submit", e => {
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
    }
  });
}
