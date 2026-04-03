// 🔥 DATASET (embedded - no fetch issues)
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
    keywords: ["study","studdy","exam prep"],
    tasks: ["2 hr study","revise notes"],
    diet: ["light meals","water"],
    routine: ["morning study","pomodoro"]
  },
  {
    goal: "learn coding",
    keywords: ["coding","codng","programming"],
    tasks: ["solve dsa","build projects"],
    diet: ["hydrate"],
    routine: ["daily coding"]
  },
  {
    goal: "fitness",
    keywords: ["fitness","fit","fitnes"],
    tasks: ["workout","stay active"],
    diet: ["balanced diet"],
    routine: ["morning exercise"]
  }
];


// 🔥 LOCAL STORAGE TASKS
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// 🔥 MATCH FUNCTION
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


// 🔥 ADD GENERATED TASKS TO TODO
function addGeneratedTasks(plan) {
  plan.tasks.forEach(task => {
    tasks.push({
      text: task,
      status: "Pending"
    });
  });

  saveTasks();
}


// 🔥 DELETE TASK
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


// 🔥 RENDER TODO LIST
function renderTasks() {
  let taskHTML = tasks.map((t, i) => `
    <li style="margin:5px 0;">
      <span style="${t.status === 'Done' ? 'text-decoration: line-through; color: gray;' : ''}">
        ${t.text}
      </span>
      <button onclick="toggleTask(${i})">✔</button>
      <button onclick="deleteTask(${i})">❌</button>
    </li>
  `).join("");

  return `
    <div class="card">
      <h3>Your To-Do List</h3>
      <ul>${taskHTML}</ul>
    </div>
  `;
}


// 🔥 MAIN FUNCTION
function generatePlan() {
  const goal = document.getElementById("goalInput").value;
  const output = document.getElementById("output");

  if (!goal) {
    output.innerHTML = "<div class='card'>Enter a goal</div>";
    return;
  }

  const plan = findBestMatch(goal);

  if (!plan) {
    output.innerHTML = "<div class='card'>No matching plan found</div>";
    return;
  }

  // ✅ Add tasks to To-Do list
  addGeneratedTasks(plan);

  // ✅ Display everything
  output.innerHTML = `
    <div class="card"><h3>Goal: ${plan.goal}</h3></div>

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

    ${renderTasks()}
  `;
}


// 🔥 LOAD EXISTING TASKS ON PAGE LOAD
window.onload = function () {
  const output = document.getElementById("output");

  if (tasks.length > 0) {
    output.innerHTML = renderTasks();
  }
};
