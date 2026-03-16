const tasks = [];
const input = document.querySelector('#newtask');
const add = document.querySelector('#addtask');
const listTasks = document.querySelector('.listTasks');

function addTask() {
    add.addEventListener('click', (e) => {
        e.preventDefault();
        if (input.value.trim()) {
            const taskText = input.value;
            tasks.push({ text: taskText, done: false });

            const task = document.createElement('div');
            task.className = 'task';

            const taskInput = document.createElement('input');
            taskInput.type = 'checkbox';

            const taskInputLabel = document.createElement('label');
            taskInputLabel.textContent = taskText;

            const x = document.createElement('button');
            x.className = 'taskdelete';
            x.innerHTML = '<i class="fa-solid fa-xmark"></i>';

            task.appendChild(taskInput);
            task.appendChild(taskInputLabel);
            task.appendChild(x);
            listTasks.appendChild(task);

            input.value = '';

            deleteTask(x, task, taskText);
            doneTask(taskInput, taskInputLabel, taskText);
        }
    });
}

function deleteTask(btn, taskEl, taskText) {
    btn.addEventListener('click', () => {
        listTasks.removeChild(taskEl);
        const index = tasks.findIndex(t => t.text === taskText);
        if (index !== -1) tasks.splice(index, 1);
    });
}

function doneTask(checkbox, label, taskText) {
    checkbox.addEventListener('change', () => {
        const taskObj = tasks.find(t => t.text === taskText);
        if (taskObj) taskObj.done = checkbox.checked;
        label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    });
}

addTask();
