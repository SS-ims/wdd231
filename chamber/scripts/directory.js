// Dynamic Year and Last Modified Date
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

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
