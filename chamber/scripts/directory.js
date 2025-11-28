// Dynamic Year and Last Modified Date
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// HAMBURGER MENU FUNCTIONALITY
const menuButton = document.querySelector('#menu-button');
const navLinks = document.querySelector('#nav-links');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    // Toggle visibility
    const isOpen = navLinks.classList.toggle('show');

    // Reflect state on the button for accessibility
    menuButton.classList.toggle('active', isOpen);
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // Swap icon between hamburger and cross
    menuButton.textContent = isOpen ? '✕' : '☰';
  });
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
    hamburgerMenu.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Close mobile menu when window is resized to larger screen
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    hamburgerMenu.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Fetch and display members
const directory = document.querySelector("#directory");

async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data.members);
}

function getMembershipLabel(level) {
  switch (level) {
    case 3:
      return `<span class="badge gold">Gold Member</span>`;
    case 2:
      return `<span class="badge silver">Silver Member</span>`;
    default:
      return `<span class="badge bronze">Member</span>`;
  }
}

function displayMembers(members) {
  directory.innerHTML = "";
  members.forEach(member => {
    const card = document.createElement("section");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      ${getMembershipLabel(member.membership)}
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
    `;
    directory.appendChild(card);
  });
}

// View toggle
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

gridbutton.addEventListener("click", () => {
  directory.classList.add("grid");
  directory.classList.remove("list");
});

listbutton.addEventListener("click", () => {
  directory.classList.add("list");
  directory.classList.remove("grid");
});

// Run
getMembers();
