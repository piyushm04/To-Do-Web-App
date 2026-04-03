// 🔥 DATASET
let dataset = [
  {
    goal: "lose weight",
    keywords: ["lose weight","fat loss","reduce weight","loose weight","los weight"],
    tasks: ["30 min cardio","10k steps","avoid sugar"],
    diet: ["low carbs","salads","fruits"],
    routine: ["morning workout","sleep 8 hrs"]
  },
  {
    goal: "gain weight",
    keywords: ["gain weight","bulk","increase weight","gian weight"],
    tasks: ["strength training","eat frequently"],
    diet: ["high protein","milk","eggs"],
    routine: ["gym","sleep well"]
  },
  {
    goal: "study",
    keywords: ["study","studdy"],
    tasks: ["2 hr study","revise notes"],
    diet: ["light meals","water"],
    routine: ["morning study","pomodoro"]
  }
];


// 🔥 STORAGE
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// 🔥 MATCH
function findBestMatch(input) {
  input = input.toLowerCase();

  for (let item of dataset) {
    for (let keyword of item.keywords) {
      if (input.includes(keyword)) {
        return item;
      }
    }
  }
  return null;
}


// 🔥 ADD TASKS (NO DUPLICATE)
function addGeneratedTasks(plan) {
  plan.tasks.forEach(task => {
    if (!tasks.some(t => t.text === task)) {
      tasks.push({
        text: task,
        status: "Pending"
      });
    }
  });

  saveTasks();
}


// 🔥 DELETE
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}


// 🔥 TOGGLE COMPLETE
function toggleTask(index) {
  tasks[index].status =
    tasks[index].status === "Pending" ? "Done" : "Pending";

  saveTasks();
  renderTasks();
}


// 🔥 DISPLAY PLAN (SEPARATE UI)
function displayPlan(plan) {
  const output = document.getElementById("output");

  output.innerHTML = `
    <div class="card">
      <h3>Goal: ${plan.goal}</h3>
    </div>

    <div class="card">
      <h3>Tasks</h3>
      <ul>${plan.tasks.map(t => `<li>${t}</li>`).join("")}</ul>
    </div>

    <div class="card">
      <h3>Diet</h3>
      <ul>${plan.diet.map(d => `<li>${d}</li>`).join("")}</ul>
    </div>

    <div class="card">
      <h3>Routine</h3>
      <ul>${plan.routine.map(r => `<li>${r}</li>`).join("")}</ul>
    </div>

    <div id="todoContainer"></div>
  `;
}


// 🔥 RENDER TODO LIST (FIXED)
function renderTasks() {
  const container = document.getElementById("todoContainer");

  if (!container) return;

  let taskHTML = tasks.map((t, i) => `
    <li style="margin:5px 0;">
      <span style="${t.status === 'Done' ? 'text-decoration:line-through;color:gray;' : ''}">
        ${t.text}
      </span>
      <button onclick="toggleTask(${i})">✔</button>
      <button onclick="deleteTask(${i})">❌</button>
    </li>
  `).join("");

  container.innerHTML = `
    <div class="card">
      <h3>Your To-Do List</h3>
      <ul>${taskHTML}</ul>
    </div>
  `;
}


// 🔥 MAIN FUNCTION (FINAL)
function generatePlan() {
  const goal = document.getElementById("goalInput").value;

  if (!goal) return;

  const plan = findBestMatch(goal);

  if (!plan) {
    document.getElementById("output").innerHTML =
      "<div class='card'>No match found</div>";
    return;
  }

  // ✅ Add tasks
  addGeneratedTasks(plan);

  // ✅ Show plan
  displayPlan(plan);

  // ✅ Show updated To-Do list
  renderTasks();
}


// 🔥 LOAD EXISTING TASKS ON PAGE LOAD
window.onload = function () {
  const output = document.getElementById("output");

  if (tasks.length > 0) {
    output.innerHTML = `<div id="todoContainer"></div>`;
    renderTasks();
  }
};
