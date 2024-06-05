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

//code de get employe
document.addEventListener("DOMContentLoaded", async () => {
  try {
      const response = await fetch('http://localhost:3016/employees');
      const employees = await response.json();

      const tbody = document.querySelector('tbody');
      if (!tbody) {
          console.error('Élément <tbody> introuvable');
          return;
      }

      tbody.innerHTML = '';

      employees.forEach(employee => {
          const row = document.createElement('tr');
          const dateNaissance = new Date(employee.dateNaissance);
          const formattedDate = `${dateNaissance.getDate()}/${dateNaissance.getMonth() + 1}/${dateNaissance.getFullYear()}`;

          row.innerHTML = `
              <td>${employee.id}</td>
              <td>${employee.nom}</td>
              <td>${employee.prenom}</td>
              <td>${employee.genre}</td>
              <td>${formattedDate}</td>
              <td>${employee.telephone}</td>
              <td>${employee['adresseEmail']}</td>
              <td>${employee.poste}</td>
              <td>${employee.statutEmploi}</td>
              <td>${employee.salaire}</td>
              <td>${employee.cnss}</td>
              <td><button class="btn btn-primary"><i class="fa-solid fa-pen"></i></button></td>
              <td><button class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
          `;
          tbody.appendChild(row);
      });
  } catch (error) {
      console.error('Erreur lors de la récupération des employés :', error);
  }
  
});
const addEmployeeForm = document.getElementById('employeeForm');
if (addEmployeeForm) {
    addEmployeeForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêcher la soumission du formulaire par défaut

        // Récupérer les valeurs des champs du formulaire
        const formData = new FormData(addEmployeeForm);
        const employeeData = {};
        formData.forEach((value, key) => {
            employeeData[key] = value;
        });

        try {
            // Envoyer une requête POST à votre backend avec les données du nouvel employé
            const response = await fetch('http://localhost:3016/employees/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de l\'employé');
            }

            // Rediriger l'utilisateur vers la page souhaitée après l'ajout réussi
            window.location.href = 'indexEmploye.html';

            // Fermer la modal d'ajout d'employé après l'ajout réussi
            const addEmployeeModal = new bootstrap.Modal(document.getElementById('addEmployeeModal'));
            addEmployeeModal.hide();
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'employé :', error);
        }
    });
}









