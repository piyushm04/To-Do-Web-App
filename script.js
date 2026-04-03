// 🔥 DATASET
let dataset = [
  {
    goal: "lose weight",
    keywords: ["lose weight","fat loss","reduce weight","loose weight","los weight"],
    tasks: ["30 min cardio","10k steps","avoid sugar"]
  },
  {
    goal: "study",
    keywords: ["study","studdy"],
    tasks: ["2 hr study","revise notes"]
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


// 🔥 ADD TASKS
function addGeneratedTasks(plan) {
  plan.tasks.forEach(task => {
    tasks.push({
      text: task,
      status: "Pending"
    });
  });

  saveTasks();
}


// 🔥 RENDER TASKS (FIXED)
function renderTasks() {
  const listHTML = tasks.map((t, i) => `
    <li>
      <span style="${t.status === 'Done' ? 'text-decoration: line-through;' : ''}">
        ${t.text}
      </span>
      <button onclick="toggleTask(${i})">✔</button>
      <button onclick="deleteTask(${i})">❌</button>
    </li>
  `).join("");

  return `
    <div class="card">
      <h3>Your To-Do List</h3>
      <ul>${listHTML}</ul>
    </div>
  `;
}


// 🔥 DELETE
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  generatePlan(); // 🔥 FIX: re-render properly
}


// 🔥 TOGGLE
function toggleTask(index) {
  tasks[index].status =
    tasks[index].status === "Pending" ? "Done" : "Pending";

  saveTasks();
  generatePlan(); // 🔥 FIX
}


// 🔥 MAIN FUNCTION (FIXED)
function generatePlan() {
  const goal = document.getElementById("goalInput").value;
  const output = document.getElementById("output");

  if (!goal) {
    output.innerHTML = "<div class='card'>Enter a goal</div>";
    return;
  }

  const plan = findBestMatch(goal);

  if (!plan) {
    output.innerHTML = "<div class='card'>No match found</div>";
    return;
  }

  // 🔥 ADD TASKS FIRST
  addGeneratedTasks(plan);

  // 🔥 THEN SHOW EVERYTHING
  output.innerHTML = `
    <div class="card">
      <h3>Goal: ${plan.goal}</h3>
    </div>

    <div class="card">
      <h3>Generated Tasks</h3>
      <ul>${plan.tasks.map(t => `<li>${t}</li>`).join("")}</ul>
    </div>

    ${renderTasks()}
  `;
}


// 🔥 LOAD EXISTING TASKS
window.onload = function () {
  const output = document.getElementById("output");

  if (tasks.length > 0) {
    output.innerHTML = renderTasks();
  }
};
