// Dynamic Year and Last Modified Date
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// HAMBURGER MENU FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  console.log('DOM loaded');
  console.log('Hamburger element:', hamburger);
  console.log('Nav Links element:', navLinks);

  if (hamburger && navLinks) {
    console.log('Both elements found, adding event listener');
    
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Hamburger clicked!');
      
      // Toggle the show class
      const isShown = navLinks.classList.contains('show');
      
      if (isShown) {
        navLinks.classList.remove('show');
        console.log('Menu closed');
      } else {
        navLinks.classList.add('show');
        console.log('Menu opened');
      }
      
      console.log('Nav links classes:', navLinks.className);
      console.log('Computed style display:', window.getComputedStyle(navLinks).display);
    });

    // Close menu when clicking on a link
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('show');
        console.log('Menu closed by link click');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('show');
        console.log('Menu closed by outside click');
      }
    });
  } else {
    console.error('Hamburger or nav-links element not found!');
  }
});

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
