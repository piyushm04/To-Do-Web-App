let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let text = document.getElementById("taskInput").value;
  let priority = document.getElementById("priority").value;
  let deadline = document.getElementById("deadline").value;

  if (text === "") return;

  tasks.push({
    text,
    priority,
    deadline,
    status: "Pending"
  });

  document.getElementById("taskInput").value = "";
  saveTasks();
  renderTasks();
}

function toggleStatus(index) {
  tasks[index].status =
    tasks[index].status === "Pending" ? "Done" : "Pending";
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  let search = document.getElementById("search").value.toLowerCase();
  let filter = document.getElementById("filter").value;

  tasks.forEach((task, index) => {
    if (
      task.text.toLowerCase().includes(search) &&
      (filter === "All" || task.status === filter)
    ) {
      let li = document.createElement("li");

      li.className = task.status === "Done" ? "done" : "";

      li.innerHTML = `
        <div>
          <strong>${task.text}</strong><br>
          ${task.priority} | ${task.deadline}
        </div>
        <div>
          <button onclick="toggleStatus(${index})">✔</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      `;

      list.appendChild(li);
    }
  });
}

renderTasks();
