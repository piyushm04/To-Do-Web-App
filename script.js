let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value;

    if (text === "") return;

    let task = {
        text: text,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    input.value = "";
    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span onclick="toggleTask(${index})" 
                  class="${task.completed ? 'completed' : ''}">
                  ${task.text}
            </span>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

displayTasks();
