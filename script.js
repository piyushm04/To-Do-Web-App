let dataset = [];

// Load dataset properly
async function loadDataset() {
  try {
    let res = await fetch("./dataset.json");
    dataset = await res.json();
    console.log("Dataset loaded:", dataset);
  } catch (err) {
    console.error("Dataset error:", err);
  }
}

// Call and wait
loadDataset();


// 🔥 SIMPLE MATCH (NO COMPLEX FUZZY FOR NOW)
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


// Generate Plan
function generatePlan() {
  let goal = document.getElementById("goalInput").value;
  let output = document.getElementById("output");

  if (!goal) {
    output.innerHTML = "Enter a goal";
    return;
  }

  if (dataset.length === 0) {
    output.innerHTML = "Dataset not loaded yet";
    return;
  }

  let plan = findBestMatch(goal);

  if (!plan) {
    output.innerHTML = `<div class="card">No match found</div>`;
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
