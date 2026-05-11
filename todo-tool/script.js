const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const showAllBtn = document.getElementById("showAll");
const showActiveBtn = document.getElementById("showActive");
const showCompletedBtn = document.getElementById("showCompleted");

function saveTasks() {
    const tasks = [];
    const items = taskList.querySelectorAll("li");

    items.forEach(function(item) {
        const text = item.querySelector("span").textContent;
        const done = item.querySelector("span").classList.contains("done");

        tasks.push({
            text: text,
            done: done
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(text, done = false) {
    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = text;

    if (done) {
        taskText.classList.add("done");
    }

    const completeButton = document.createElement("button");
    completeButton.textContent = "完了";

    completeButton.addEventListener("click", function () {
        taskText.classList.toggle("done");
        saveTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function () {
        li.remove();
        saveTasks();
    });

    li.appendChild(taskText);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    createTaskElement(text);
    saveTasks();

    taskInput.value = "";
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks === null) {
        return;
    }

    const tasks = JSON.parse(savedTasks);

    tasks.forEach(function(task) {
        createTaskElement(task.text, task.done);
    });
}

addButton.addEventListener("click", addTask);

showAllBtn.addEventListener("click", function() {
    setActiveFilterButton(showAllBtn);

    const items = taskList.querySelectorAll("li");

    items.forEach(function(item) {
        item.style.display = "list-item";
    });
});

showActiveBtn.addEventListener("click", function() {
    setActiveFilterButton(showActiveBtn);

    const items = taskList.querySelectorAll("li");

    items.forEach(function(item) {
        const done = item.querySelector("span").classList.contains("done");

        if (done) {
            item.style.display = "none";
        } else {
            item.style.display = "list-item";
        }
    });
});

showCompletedBtn.addEventListener("click", function() {
    setActiveFilterButton(showCompletedBtn);

    const items = taskList.querySelectorAll("li");

    items.forEach(function(item) {
        const done = item.querySelector("span").classList.contains("done");

        if (done) {
            item.style.display = "list-item";
        } else {
            item.style.display = "none";
        }
    });
});

function setActiveFilterButton(activeButton) {
    showAllBtn.classList.remove("active");
    showActiveBtn.classList.remove("active");
    showCompletedBtn.classList.remove("active");

    activeButton.classList.add("active");
}

taskInput.addEventListener("keydown", function(e) {
    if (e.isComposing) {
        return;
    }

    if (e.key === "Enter") {
        addTask();
    }
});

loadTasks();
setActiveFilterButton(showAllBtn);