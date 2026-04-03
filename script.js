let dataset = [];

// ✅ Load dataset (GitHub Pages safe)
async function loadDataset() {
  try {
    const res = await fetch("./dataset.json");
    dataset = await res.json();
    console.log("Dataset loaded:", dataset);
  } catch (err) {
    console.error("Error loading dataset:", err);
  }
}

loadDataset();

// ✅ Simple + reliable matching
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

// ✅ Main function
function generatePlan() {
  const goal = document.getElementById("goalInput").value;
  const output = document.getElementById("output");

  if (!goal) {
    output.innerHTML = "<div class='card'>Enter a goal</div>";
    return;
  }

  if (!dataset || dataset.length === 0) {
    output.innerHTML = "<div class='card'>Dataset not loaded. Refresh page.</div>";
    return;
  }

  const plan = findBestMatch(goal);

  if (!plan) {
    output.innerHTML = "<div class='card'>No matching plan found</div>";
    return;
  }

  output.innerHTML = `
    <div class="card"><h3>${plan.goal}</h3></div>

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
  `;
}
