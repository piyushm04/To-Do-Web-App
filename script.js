let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🔥 MAIN FEATURE: Goal-based generator
function generateFromGoal() {
  let goal = document.getElementById("goalInput").value.toLowerCase();

  if (goal === "") return;

  let generatedTasks = [];

  // Weight loss
  if (goal.includes("lose weight")) {
    generatedTasks = [
      { text: "30 min cardio", priority: "High" },
      { text: "Drink 3L water", priority: "Medium" },
      { text: "Avoid sugar", priority: "High" },
      { text: "Eat salad", priority: "Medium" },
      { text: "Sleep 8 hours", priority: "Low" }
    ];
  }

  // Weight gain
  else if (goal.includes("gain weight")) {
    generatedTasks = [
      { text: "Eat high protein diet", priority: "High" },
      { text: "Strength training", priority: "High" },
      { text: "Drink milk daily", priority: "Medium" },
      { text: "Eat 5 meals/day", priority: "High" }
    ];
  }

  // Study goal
  else if (goal.includes("study")) {
    generatedTasks = [
      { text: "2 hrs focused study", priority: "High" },
      { text: "Revise notes", priority: "Medium" },
      { text: "Practice problems", priority: "High" }
    ];
  }

  // Default fallback
  else {
    generatedTasks = [
      { text: "Set clear goal steps", priority: "Medium" },
      { text: "Track progress", priority: "Low" }
    ];
  }

  // Add to main tasks list
  generatedTasks.forEach(task => {
    tasks.push({
      text: task.text,
      priority: task.priority,
      deadline: "",
      status: "Pending"
    });
  });

  saveTasks();
  renderTasks();
}
