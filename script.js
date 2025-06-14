document.addEventListener('DOMContentLoaded', () => {
  loadTasks();

  document.getElementById('taskForm').addEventListener('submit', function (e) {
    e.preventDefault();
    addTask();
  });
});

function loadTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})" aria-label="Delete Task">🗑️</button>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();

  if (taskText === '') return;

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  input.value = '';
  loadTasks();
}

function toggleComplete(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}
