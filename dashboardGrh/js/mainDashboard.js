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

//code todo list
// Sélection des éléments
const addButton = document.querySelector('.fa-plus');
const todoList = document.querySelector('.todo-list');

// Ajouter un événement click au bouton de plus
addButton.addEventListener('click', () => {
  // Afficher la zone de saisie
  const inputField = document.createElement('input');
  inputField.setAttribute('type', 'text');
  inputField.classList.add('new-task');
  
  // Bouton pour ajouter la nouvelle tâche
  const addButton = document.createElement('button');
  addButton.textContent = 'Ajouter';
  
  // Ajouter un événement click au bouton d'ajout
  addButton.addEventListener('click', () => {
    const inputValue = inputField.value;
    if (inputValue.trim() !== '') {
      // Créer un nouvel élément de liste avec le texte de la saisie
      const newTask = document.createElement('li');
      newTask.textContent = inputValue;
      newTask.classList.add('not-completed');
      
      // Bouton pour marquer la tâche comme complétée
      const completeButton = document.createElement('button');
      completeButton.textContent = 'Complété';
      completeButton.addEventListener('click', () => {
        newTask.classList.toggle('completed');
      });
      
      // Ajouter la tâche et le bouton de complétion à la liste
      newTask.appendChild(completeButton);
      todoList.appendChild(newTask);
      
      // Effacer la zone de saisie après l'ajout
      inputField.value = '';
    }
  });
  
  // Ajouter la zone de saisie et le bouton d'ajout à la page
  todoList.appendChild(inputField);
  todoList.appendChild(addButton);
});


