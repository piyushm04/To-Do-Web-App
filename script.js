// ✅ Embedded dataset (no fetch issues)
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

// ✅ Matching
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

// ✅ Generate Plan
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
