"use strict";

let tasks = [];

const form = document.querySelector("#new-task-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = document.querySelector("#task-text").value;
  const amount = document.querySelector("#task-amount").value;

  if (!text) return;

  const task = {
    id: Date.now(),
    text: text,
    amount: Number(amount),
    done: false,
  };

  tasks.push(task);

  displayTasks(); // opdater visning
  form.reset(); // ryd inputfelter
});

function displayTasks() {
  const todoList = document.querySelector("#todo_list");
  const doneList = document.querySelector("#done-list");

  todoList.innerHTML = "";
  doneList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = `${task.text} (${task.amount})`;

    // Knapper
    const doneBtn = document.createElement("button");
    doneBtn.textContent = task.done ? "Fortryd" : "Done";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Slet";

    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);

    // tilføj event listeners
    doneBtn.addEventListener("click", () => {
      task.done = !task.done;
      displayTasks();
    });

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      displayTasks();
    });

    // færdige tasks
    if (task.done) {
      li.classList.add("done");
      doneList.appendChild(li);
    } else {
      li.classList.remove("done");
      todoList.appendChild(li);
    }
  });

  const todoCountEl = document.querySelector("#todo-count");
  const doneCountEl = document.querySelector("#done-count");

  if (todoCountEl) todoCountEl.textContent = `ToDo: ${todoList.children.length} tasks`;
  if (doneCountEl) doneCountEl.textContent = `Done: ${doneList.children.length} tasks`;
}
