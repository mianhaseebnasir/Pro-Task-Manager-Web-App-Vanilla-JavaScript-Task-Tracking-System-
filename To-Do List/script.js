let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let text = document.getElementById("taskText").value;
    let priority = document.getElementById("priority").value;
    let dueDate = document.getElementById("dueDate").value;

    if (text.trim() === "") return;

    tasks.push({
        text,
        priority,
        dueDate,
        completed: false
    });

    saveTasks();
    renderTasks();
    document.getElementById("taskText").value = "";
}

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let filtered = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "today")
            return task.dueDate === new Date().toISOString().split("T")[0];
        return true;
    });

    filtered.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = `task priority-${task.priority} ${task.completed ? "completed" : ""}`;

        li.innerHTML = `
            <span>${task.text} ${task.dueDate ? "📅 " + task.dueDate : ""}</span>
            <div>
                <button onclick="toggleComplete(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function filterTasks(type) {
    currentFilter = type;
    document.getElementById("viewTitle").innerText =
        type.charAt(0).toUpperCase() + type.slice(1);
    renderTasks();
}

renderTasks();