const taskInput = document.querySelector("input");
const ClearBtn = document.querySelector(`.clear-btn`);
const filters = document.querySelectorAll(`.filters span`);
const taskBox = document.querySelector(`.task-box`);
const ClearAll = document.querySelector(`.clear-btn`);

let editId;
let isEditedTask = false;

let todos = JSON.parse(localStorage.getItem(`todo-list`));

filters.forEach((btn) => {
  btn.addEventListener(`click`, () => {
    document.querySelector(`span.Active`).classList.remove(`Active`);
    btn.classList.add(`Active`);
    showTodo(btn.id);
  });
});

const showTodo = function (filters) {
  let li = ``;
  if (todos) {
    todos.forEach((todo, id) => {
      let isCompleted = todo.status == `completed` ? `checked` : ``;
      if (filters == todo.status || filters == `all`) {
        li += `<li class="task">
       <label for="${id}">
         <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted} />
         <p class=${isCompleted}>${todo.name}</p>
       </label>
       <div class="settings">
         <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
         <ul class="task-menu">
         <li onclick="editTask(${id}, '${todo.name}')"><i class="uil uil-pen">Edit</i></li>
         <li onclick="deleteTask(${id})"><i class="uil uil-trash">Delete</i></li>
         </ul>
       </div>
     </li>`;
      }
    });
  }
  taskBox.innerHTML = li || `<span>You don't have any task here</span>`;
};
const editTask = function (taskId, taskName) {
  editId = taskId;
  isEditedTask = true;
  taskInput.value = taskName;
};
const deleteTask = function (deleteId) {
  todos.splice(deleteId, 1);
  localStorage.setItem(`todo-list`, JSON.stringify(todos));
  showTodo(`all`);
};
ClearAll.addEventListener(`click`, () => {
  todos.splice(0, todos.length);
  localStorage.setItem(`todo-list`, JSON.stringify(todos));
  showTodo(`all`);
});

showTodo(`all`);
const showMenu = function (selectedTask) {
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add(`show`);
  document.addEventListener(`click`, (e) => {
    if (e.target.tagName != `I` || e.target != selectedTask) {
      taskMenu.classList.remove(`show`);
    }
  });
};
const updateStatus = function (selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add(`checked`);
    todos[selectedTask.id].status = `completed`;
  } else {
    taskName.classList.remove(`checked`);
    todos[selectedTask.id].status = `pending`;
  }
  localStorage.setItem(`todo-list`, JSON.stringify(todos));
};

taskInput.addEventListener("keyup", (e) => {
  const userTask = taskInput.value.trim();
  if (e.key === "Enter" && userTask) {
    if (!isEditedTask) {
      if (!todos) {
        todos = [];
      }
      let taskInfo = { name: userTask, status: `pending` };
      todos.push(taskInfo);
    } else {
      isEditedTask = false;
      todos[editId].name = userTask;
    }

    taskInput.value = "";
    localStorage.setItem(`todo-list`, JSON.stringify(todos));
    showTodo(`all`);
  }
});
