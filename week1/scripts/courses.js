const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "CSE 110", name: "Introduction to Programming", credits: 2, type: "CSE", completed: false },
  { code: "CSE 111", name: "Programming with Functions", credits: 2, type: "CSE", completed: false },
  { code: "WDD 231", name: "Front-End Web Development", credits: 3, type: "WDD", completed: false }
];

const courseContainer = document.getElementById("course-cards");
const totalCredits = document.getElementById("total-credits");

function displayCourses(list) {
  courseContainer.innerHTML = "";
  let total = 0;
  list.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) card.classList.add("completed");
    card.innerHTML = `<strong>${course.code}</strong> - ${course.name}`;
    courseContainer.appendChild(card);
    total += course.credits;
  });
  totalCredits.textContent = `The total credits for courses listed above is ${total}.`;
}

document.getElementById("all").addEventListener("click", () => displayCourses(courses));
document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.type === "CSE")));
document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.type === "WDD")));

displayCourses(courses);

// Highlight active button
const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
