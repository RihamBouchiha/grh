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
    const response = await fetch('http://localhost:3018/employees');
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
    const response = await fetch('http://localhost:3018/condidats/count');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const numberOfCondidats = data.count;

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
document.addEventListener('DOMContentLoaded', async () => {
  const addButton = document.getElementById('addTask');

  addButton.addEventListener('click', async function (event) {
      event.preventDefault();

      const taskInput = document.getElementById('taskInput');
      const taskValue = taskInput.value.trim();

      if (taskValue !== '') {
          try {
              // Effectuer une requête POST vers votre backend
              const response = await fetch('http://localhost:3018/todos/add', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ task: taskValue })
              });

              if (response.ok) {
                  // Si la tâche est ajoutée avec succès dans la base de données,
                  // alors ajouter la tâche à la liste côté client
                  const newTaskItem = document.createElement('li');
                  newTaskItem.classList.add('not-completed');
                  newTaskItem.innerHTML = `
                      <p>${taskValue}</p>
                      <button class="btn btn-success btn-validate">Valider</button>
                  `;
                  const todoList = document.querySelector('.todo-list');
                  todoList.appendChild(newTaskItem);

                  taskInput.value = '';

                  document.getElementById('taskInputContainer').style.display = 'none';
              } else {
                  console.error('Erreur lors de l\'ajout de la tâche :', response.statusText);
              }
          } catch (error) {
              console.error('Erreur lors de l\'ajout de la tâche :', error);
          }
      }
  });

  document.getElementById('showAlert').addEventListener('click', function () {
      document.getElementById('taskInputContainer').style.display = 'block';
  });

  document.getElementById('closeAlert').addEventListener('click', function () {
      document.getElementById('taskInputContainer').style.display = 'none';
  });

  // Fetch tasks from the backend and populate the todo list
  try {
      const response = await fetch('http://localhost:3018/todos');
      if (!response.ok) {
          throw new Error('Failed to fetch tasks');
      }

      const tasks = await response.json();
      const todoList = document.querySelector('.todo-list');

      tasks.forEach(task => {
          const newTaskItem = document.createElement('li');
          newTaskItem.innerHTML = `
              <p>${task.task}</p>
              <button class="btn btn-success btn-validate">${task.completed ? 'Complet' : 'Valider'}</button>
          `;
          if (task.completed) {
              newTaskItem.classList.add('completed');
          } else {
              newTaskItem.classList.add('not-completed');
          }
          todoList.appendChild(newTaskItem);

          // Ajouter un écouteur d'événement uniquement pour le bouton de validation
          newTaskItem.querySelector('.btn-validate').addEventListener('click', async function () {
              try {
                  // Récupérer l'ID de la tâche à partir de l'élément li
                  const taskId = task._id; // Assurez-vous que votre modèle de tâche utilise _id

                  // Effectuer une requête PATCH pour inverser l'état completed de la tâche
                  const response = await fetch(`http://localhost:3018/todos/${taskId}/complete`, {
                      method: 'PATCH',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ completed: !newTaskItem.classList.contains('completed') })
                  });

                  if (response.ok) {
                      // Mettre à jour l'apparence de la tâche côté client si la requête est réussie
                      newTaskItem.classList.toggle('completed');
                      const validateButton = newTaskItem.querySelector('.btn-validate');
                      validateButton.textContent = newTaskItem.classList.contains('completed') ? 'complet' : 'Valider';
                  } else {
                      console.error('Échec de la mise à jour de la tâche:', response.statusText);
                  }
              } catch (error) {
                  console.error('Erreur lors de la mise à jour de la tâche:', error);
              }
          });
      });

  } catch (error) {
      console.error('Error fetching tasks:', error);
  }
});
document.addEventListener('DOMContentLoaded', async () => {
  try {
      // Effectuer une requête GET pour récupérer le nombre de tâches complétées depuis le backend
      const response = await fetch('http://localhost:3018/todos/completed/count');
      if (!response.ok) {
          throw new Error('Failed to fetch completed tasks count');
      }

      const data = await response.json();
      const completedTasksCountElement = document.getElementById('completedTasksCount');

      // Mettre à jour l'élément HTML avec le nombre de tâches complétées
      completedTasksCountElement.textContent = data.count;
  } catch (error) {
      console.error('Error fetching completed tasks count:', error);
  }
});
document.addEventListener('DOMContentLoaded', () => {
  // Votre code JavaScript ici
  const globalSearchForm = document.getElementById('globalSearchForm');
  const globalSearchInput = document.getElementById('globalSearchInput');

  globalSearchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchTerm = globalSearchInput.value.trim().toLowerCase();

      // Fonction de filtre pour rechercher les éléments correspondants sur la page
      const filterElements = (searchTerm) => {
          const allElements = document.querySelectorAll('.todo-list li, #condidats-table td');
          
          allElements.forEach(element => {
              const textElement = element.textContent.trim().toLowerCase();
              if (textElement.includes(searchTerm)) {
                  element.style.display = 'block';  // Affiche l'élément correspondant
              } else {
                  element.style.display = 'none';   // Masque l'élément qui ne correspond pas
              }
          });
      };

      filterElements(searchTerm);
  });
});
