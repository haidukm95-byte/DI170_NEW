const username = sessionStorage.getItem("username");
const useruid = sessionStorage.getItem("useruid");

document.querySelector("#accInfo b").textContent = username || "Guest";

const ol = document.createElement("ol");
document.querySelector("#active-tasks").appendChild(ol);

const olDone = document.createElement("ol");
document.querySelector("#done-tasks").appendChild(olDone);

const newTask = document.querySelector(".new-task");
const newTaskDT = document.querySelector(".new-task-dt");
const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
newTaskDT.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
const newTaskAdd = document.querySelector("#addtask-button");

function sortActiveTasks() {
  const items = Array.from(ol.querySelectorAll("li"));
  items.sort((a, b) => {
    const dtA = a.dataset.datetime || "";
    const dtB = b.dataset.datetime || "";
    if (!dtA) return 1;
    if (!dtB) return -1;
    return dtA < dtB ? -1 : dtA > dtB ? 1 : 0;
  });
  items.forEach((li) => ol.appendChild(li));
}

function formatDatetime(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  const pad = (n) => String(n).padStart(2, "0");
  return ` — ${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function renderTask(task) {
  const li = document.createElement("li");
  li.dataset.datetime = task.datetime || "";

  const taskName = document.createElement("span");
  taskName.textContent = task.task;

  const taskDT = document.createElement("span");
  taskDT.textContent = formatDatetime(task.datetime);

  li.appendChild(taskName);
  li.appendChild(taskDT);

  const liDone = document.createElement("input");
  liDone.type = "checkbox";
  liDone.checked = task.isdone;
  liDone.addEventListener("change", async () => {
    await fetch(`/api/tasks/${task.taskuid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isdone: liDone.checked }),
    });
    if (liDone.checked) {
      olDone.appendChild(li);
    } else {
      ol.appendChild(li);
      sortActiveTasks();
    }
  });

  const doneLabel = document.createElement("span");
  doneLabel.textContent = " Done";

  const liDelete = document.createElement("input");
  liDelete.type = "checkbox";
  liDelete.addEventListener("change", async () => {
    await fetch(`/api/tasks/${task.taskuid}`, { method: "DELETE" });
    li.remove();
  });

  const deleteLabel = document.createElement("span");
  deleteLabel.textContent = " Delete";

  li.appendChild(liDone);
  li.appendChild(doneLabel);
  li.appendChild(liDelete);
  li.appendChild(deleteLabel);

  if (task.isdone) {
    olDone.appendChild(li);
  } else {
    ol.appendChild(li);
  }
}

async function loadTasks() {
  const res = await fetch(`/api/tasks/${useruid}`);
  const tasks = await res.json();
  tasks.forEach((task) => renderTask(task));
  sortActiveTasks();
}

newTaskAdd.addEventListener("click", async (e) => {
  e.preventDefault();
  if (!newTask.value) {
    newTask.placeholder = "Enter your task!";
    return;
  }
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      useruid,
      task: newTask.value,
      datetime: newTaskDT.value || null,
    }),
  });
  const data = await res.json();
  renderTask({
    taskuid: data.taskuid,
    task: newTask.value,
    datetime: newTaskDT.value,
    isdone: false,
  });
  sortActiveTasks();
  newTask.value = "";
  const nowReset = new Date();
  newTaskDT.value = `${nowReset.getFullYear()}-${pad(nowReset.getMonth() + 1)}-${pad(nowReset.getDate())}T${pad(nowReset.getHours())}:${pad(nowReset.getMinutes())}`;
});

loadTasks();
