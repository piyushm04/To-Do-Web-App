let dataset = [];

// Load dataset
async function loadDataset() {
  let res = await fetch("dataset.json");
  dataset = await res.json();
}
loadDataset();

// Levenshtein Distance (real fuzzy search)
function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => []);

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }

  return matrix[a.length][b.length];
}

// Find best match
function findBestMatch(input) {
  input = input.toLowerCase();

  let bestMatch = null;
  let lowestDistance = Infinity;

  dataset.forEach(item => {
    item.keywords.forEach(keyword => {
      let dist = levenshtein(input, keyword);

      if (dist < lowestDistance) {
        lowestDistance = dist;
        bestMatch = item;
      }
    });
  });

  return lowestDistance < 10 ? bestMatch : null;
}

// Generate Plan
function generatePlan() {
  let goal = document.getElementById("goalInput").value;
  let output = document.getElementById("output");

  if (!goal) {
    output.innerHTML = "Please enter a goal";
    return;
  }

  let plan = findBestMatch(goal);

  if (!plan) {
    output.innerHTML = `<div class="card">No matching plan found</div>`;
    return;
  }

  output.innerHTML = `
    <div class="card">
      <h3>Goal: ${plan.goal}</h3>
    </div>

    <div class="card">
      <h3>Tasks</h3>
      <ul>${plan.tasks.map(t => `<li>${t}</li>`).join("")}</ul>
    </div>

    <div class="card">
      <h3>Diet Plan</h3>
      <ul>${plan.diet.map(d => `<li>${d}</li>`).join("")}</ul>
    </div>

    <div class="card">
      <h3>Routine</h3>
      <ul>${plan.routine.map(r => `<li>${r}</li>`).join("")}</ul>
    </div>
  `;
}
