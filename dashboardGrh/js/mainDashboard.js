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
      event.preventDefault();

      const taskInput = document.getElementById('taskInput');
      const taskValue = taskInput.value.trim(); 

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

// Fonction pour ajouter une nouvelle tâche
function ajouterTache() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();

  if (taskText !== '') {
      const todoList = document.querySelector('.todo-list');

      const newTask = document.createElement('li');
      newTask.className = 'not-completed';
      newTask.innerHTML = `
          <p>${taskText}</p>
          <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-ellipsis-v"></i>
              </button>
              <div class="dropdown-menu">
                  <a class="dropdown-item modifier">Modifier</a>
                  <a class="dropdown-item complet">Compléter</a>
              </div>
          </div>
      `;
      todoList.appendChild(newTask);
      input.value = '';
  }
}
//code pour le bouton de validation de chaque todo list
// Écouteur d'événement pour le clic sur les boutons de validation
document.querySelector('.todo-list').addEventListener('click', function(event) {
  if (event.target && event.target.classList.contains('btn-validate')) {
      // Appliquer le style au texte de la tâche
      event.target.closest('li').classList.add('completed');
  }
});

// Fonction pour ajouter une tâche à la liste
function ajouterTache() {
  // Récupérer la valeur de la tâche depuis l'input
  var taskInput = document.getElementById('taskInput').value;
  
  // Vérifier si la tâche n'est pas vide
  if (taskInput !== '') {
      // Créer un nouvel élément de liste
      var listItem = document.createElement('li');
      listItem.textContent = taskInput;
      
      // Ajouter un bouton de validation à la tâche
      var validateButton = document.createElement('button');
      validateButton.innerHTML = '<i class="fas fa-check"></i>';
      validateButton.classList.add('btn', 'btn-success', 'btn-validate');
      listItem.appendChild(validateButton);
      
      // Ajouter la tâche à la liste
      document.querySelector('.todo-list').appendChild(listItem);
      
      // Effacer le champ de saisie après l'ajout de la tâche
      document.getElementById('taskInput').value = '';
  }
}

// Écouteur d'événement pour le clic sur le bouton Ajouter
document.getElementById('addTask').addEventListener('click', ajouterTache);

document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('addTask');

  addButton.addEventListener('click', async function (event) {
      event.preventDefault();

      const taskInput = document.getElementById('taskInput');
      const taskValue = taskInput.value.trim(); 

      if (taskValue !== '') {
          try {
              // Effectuer une requête POST vers votre backend
              const response = await fetch('http://localhost:3017/todos/add', {
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
                      <div class="dropdown">
                          <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i class="fas fa-ellipsis-v"></i>
                          </button>
                          <div class="dropdown-menu">
                              <a class="dropdown-item modifier">Modifier</a>
                              <a class="dropdown-item complet">Compléter</a>
                          </div>
                      </div>
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
});

document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('addTask');

  addButton.addEventListener('click', async function (event) {
    event.preventDefault();

    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim(); 

    if (taskValue !== '') {
      try {
        const response = await fetch('http://localhost:3017/todos/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ task: taskValue })
        });

        if (response.ok) {
          // La tâche a été ajoutée avec succès
          // Réactualiser la liste des tâches ou effectuer d'autres actions nécessaires
        } else {
          console.error('Erreur lors de l\'ajout de la tâche :', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche :', error);
      }
    }
  });
});


