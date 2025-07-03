// Variables de elementos del DOM
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const moodButtons = document.querySelectorAll('.mood');

let currentMood = null;
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Función para mostrar tareas
function renderTasks() {
  taskList.innerHTML = ''; // Limpia la lista

  tasks.forEach((task, index) => {
    if (currentMood && task.mood !== currentMood) return;

    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);
    li.innerHTML = `
      <span>${task.text}</span>
      <button onclick="toggleTask(${index})">✔️</button>
    `;
    taskList.appendChild(li);
  });
}

// Agregar tarea
addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text === '' || !currentMood) {
    alert('Escribe una tarea y elige tu estado de ánimo');
    return;
  }

  tasks.push({ text, completed: false, mood: currentMood });
  saveTasks();
  taskInput.value = '';
  renderTasks();
});

// Marcar como completada o no
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Cambiar estado de ánimo
moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    moodButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMood = btn.getAttribute('data-mood');
    renderTasks();
  });
});

// Guardar en localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Mostrar las tareas al cargar la página
renderTasks();
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
