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

document.getElementById('employeeForm').addEventListener('submit', function(e) {
  e.preventDefault(); 
  var id = document.getElementById('id').value;
  var nom = document.getElementById('nom').value;
  var newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${id}</td>
    <td>${nom}</td>
    <td>${document.getElementById('prenom').value}</td>
    <td>${document.getElementById('genre').value}</td>
    <td>${document.getElementById('dateNaissance').value}</td>
    <td>${document.getElementById('telephone').value}</td>
    <td>${document.getElementById('Adressee-mail').value}</td>
    <td>${document.getElementById('Poste').value}</td>
    <td>${document.getElementById('Departement').value}</td>
    <td>${document.getElementById('Statutdemploi').value}</td>
    <td>${document.getElementById('Salaire').value}</td>
    <td>${document.getElementById('CNSS').value}</td>
    <td><button class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></button></td>
    <td><button class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
  `;

  document.querySelector('tbody').appendChild(newRow);

  $('#addEmployeeModal').modal('hide');

  document.getElementById('employeeForm').reset();
});
const deleteButtons = document.querySelectorAll('.btn-danger');

deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer cette ligne?");
        if (isConfirmed) {
            const row = this.closest('tr');
            row.remove();
        }
    });
});

