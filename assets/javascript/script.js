const bgRedButton = document.getElementById("bgRed");
const bgBlueButton = document.getElementById("bgBlue");
const bgWhiteButton = document.getElementById("bgWhite");

const openGoogleButton = document.getElementById("openGoogle");
const openYouTubeButton = document.getElementById("openYouTube");

const todoInput = document.getElementById("todoInput");
const dateInput = document.getElementById("dateInput");
const submitTodoButton = document.getElementById("submitTodo");
const todoList = document.getElementById("todoList");

let todoId = 1;
let isEditing = false;
let editId = null;

// Ganti Background
function changeBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

bgRedButton.addEventListener("click", () => changeBackgroundColor("red"));
bgBlueButton.addEventListener("click", () => changeBackgroundColor("blue"));
bgWhiteButton.addEventListener("click", () => changeBackgroundColor("white"));

// Pindah Browser
openGoogleButton.addEventListener(
  "click",
  () => (window.location.href = "https://www.google.com")
);
openYouTubeButton.addEventListener(
  "click",
  () => (window.location.href = "https://www.youtube.com")
);

function addTodo() {
  const todoValue = todoInput.value;
  const dateValue = dateInput.value;

  if (todoValue === "" || dateValue === "") {
    alert("Mohon di isi kalau mau bikin todolist!");
    return;
  }

  if (isEditing) {
    // Update Todo
    const rowToUpdate = document.getElementById(`todo-${editId}`);
    rowToUpdate.children[1].textContent = todoValue;
    rowToUpdate.children[2].textContent = dateValue;

    isEditing = false;
    submitTodoButton.textContent = "Submit";
  } else {
    // Tambah Todo
    const newRow = document.createElement("tr");
    newRow.id = `todo-${todoId}`;

    newRow.innerHTML = `
        <td>${todoId}</td>
        <td>${todoValue}</td>
        <td>${dateValue}</td>
        <td>
          <button onclick="editTodo(${todoId})">Edit</button>
          <button onclick="deleteTodo(this)">Delete</button>
        </td>
    `;

    todoList.appendChild(newRow);
    todoId++;
  }

  // Membersihkan
  todoInput.value = "";
  dateInput.value = "";
}

submitTodoButton.addEventListener("click", addTodo);

// Edit Todo
function editTodo(id) {
  const rowToEdit = document.getElementById(`todo-${id}`);

  // Mengisi kolom input dengan nilai yang ada
  todoInput.value = rowToEdit.children[1].textContent;
  dateInput.value = rowToEdit.children[2].textContent;

  // Mengatur mode pengeditan
  isEditing = true;
  editId = id;
  submitTodoButton.textContent = "Update";
}

// Hapus Todo
function deleteTodo(button) {
  const row = button.parentNode.parentNode;
  todoList.removeChild(row);
}
