let sideMenu = document.querySelectorAll(".nav-link");
sideMenu.forEach((item) => {
  let li = item.parentElement;

  item.addEventListener("click", () => {
    sideMenu.forEach((link) => {
      link.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

let menuBar = document.querySelector(".menu-btn");
let sideBar = document.querySelector(".sidebar");
menuBar.addEventListener("click", () => {
  sideBar.classList.toggle("hide");
});

let switchMode = document.getElementById("switch-mode");
switchMode.addEventListener("change", (e) => {
  if (e.target.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

let searchFrom = document.querySelector(".content nav form");
let searchBtn = document.querySelector(".search-btn");
let searchIcon = document.querySelector(".search-icon");
searchBtn.addEventListener("click", (e) => {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchFrom.classList.toggle("show");
    if (searchFrom.classList.contains("show")) {
      searchIcon.classList.replace("fa-search", "fa-times");
    } else {
      searchIcon.classList.replace("fa-times", "fa-search");
    }
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 576) {
    searchIcon.classList.replace("fa-times", "fa-search");
    searchFrom.classList.remove("show");
  }
  if (window.innerWidth < 768) {
    sideBar.classList.add("hide");
  }
});

if (window.innerWidth < 768) {
  sideBar.classList.add("hide");
}

//get des employés 
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('http://localhost:3017/employees');
    const employees = await response.json();

    const numberOfEmployees = employees.length;

    const numberOfEmployeesElement = document.getElementById('numberOfEmployees');
    if (!numberOfEmployeesElement) {
        console.error('Élément HTML introuvable');
        return;
    }

    numberOfEmployeesElement.querySelector('h3').textContent = numberOfEmployees;
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre d\'employés :', error);
  }
});

//get condidats
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('http://localhost:3017/condidats');
    const condidats = await response.json();

    const numberOfCondidats = condidats.length;

    const numberOfCondidatsElement = document.getElementById('numberOfCondidats');
    if (!numberOfCondidatsElement) {
        console.error('Élément HTML introuvable');
        return;
    }

    numberOfCondidatsElement.querySelector('h3').textContent = numberOfCondidats;
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de condidats :', error);
  }
});
/*
//code todo list
// Sélection des éléments
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.querySelector('.fa-plus');
  const todoList = document.querySelector('.todo-list');

  addButton.addEventListener('click', () => {
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group');

    const inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.classList.add('form-control');
    inputField.classList.add('new-task');

    const addButton = document.createElement('button');
    addButton.textContent = 'Ajouter';
    addButton.classList.add('btn');
    addButton.classList.add('btn-primary');

    addButton.addEventListener('click', () => {
      const inputValue = inputField.value;
      if (inputValue.trim() !== '') {
        const newTask = document.createElement('li');
        newTask.textContent = inputValue;
        newTask.classList.add('not-completed');

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complété';
        completeButton.classList.add('btn');
        completeButton.classList.add('btn-success');

        completeButton.addEventListener('click', () => {
          newTask.classList.toggle('completed');
        });

        newTask.appendChild(completeButton);
        todoList.appendChild(newTask);

        inputField.value = '';
      }
    });

    inputGroup.appendChild(inputField);
    inputGroup.appendChild(addButton);
    todoList.appendChild(inputGroup);
  });
});*/
document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('addTask');

  addButton.addEventListener('click', function (event) {
      event.preventDefault(); // Empêcher le comportement par défaut du formulaire

      const taskInput = document.getElementById('taskInput');
      const taskValue = taskInput.value.trim(); // Supprimez les espaces vides au début et à la fin

      if (taskValue !== '') {
          const newTaskItem = document.createElement('li');
          newTaskItem.classList.add('not-completed');
          newTaskItem.innerHTML = `
              <p>${taskValue}</p>
              <i class="fas fa-ellipsis-vertical"></i>
          `;

          const todoList = document.querySelector('.todo-list');
          todoList.appendChild(newTaskItem);

          taskInput.value = '';

          document.getElementById('taskInputContainer').style.display = 'none';
      }
  });
  document.getElementById('showAlert').addEventListener('click', function () {
      document.getElementById('taskInputContainer').style.display = 'block';
  });
  document.getElementById('closeAlert').addEventListener('click', function () {
      document.getElementById('taskInputContainer').style.display = 'none';
  });
});




