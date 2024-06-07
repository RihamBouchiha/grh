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
    const response = await fetch('http://localhost:3018/employees');
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
            <td><button class="btn btn-primary edit-btn" data-employee-id="${employee.id}"><i class="fa-solid fa-pen"></i></button></td>
            <td><button class="btn btn-danger delete-btn" data-employee-id="${employee.id}"><i class="fa-solid fa-trash"></i></button></td>
        `;
        tbody.appendChild(row);
    });

    // Gérer les boutons de suppression
   const deleteButtons = document.querySelectorAll('.delete-btn');
    let deleteId; 

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            deleteId = button.getAttribute('data-employee-id');
            $('#deleteConfirmationModal').modal('show');
        });
    });

    // Gestion des boutons de modification
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
          const row = btn.closest('tr');
          const id = row.querySelector('td:nth-child(1)').innerText;
          const nom = row.querySelector('td:nth-child(2)').innerText;
          const prenom = row.querySelector('td:nth-child(3)').innerText;
          const genre = row.querySelector('td:nth-child(4)').innerText;
          const dateNaissance = row.querySelector('td:nth-child(5)').innerText.split('/').reverse().join('-');
          const telephone = row.querySelector('td:nth-child(6)').innerText;
          const adresseEmail = row.querySelector('td:nth-child(7)').innerText;
          const poste = row.querySelector('td:nth-child(8)').innerText;
          const statutEmploi = row.querySelector('td:nth-child(9)').innerText;
          const salaire = row.querySelector('td:nth-child(10)').innerText;
          const cnss = row.querySelector('td:nth-child(11)').innerText;
    
          document.getElementById('edit-id').value = id;
          document.getElementById('edit-nom').value = nom;
          document.getElementById('edit-prenom').value = prenom;
          document.getElementById('edit-genre').value = genre;
          document.getElementById('edit-dateNaissance').value = dateNaissance;
          document.getElementById('edit-telephone').value = telephone;
          document.getElementById('edit-adressee-mail').value = adresseEmail;
          document.getElementById('edit-poste').value = poste;
          document.getElementById('edit-statutdemploi').value = statutEmploi;
          document.getElementById('edit-salaire').value = salaire;
          document.getElementById('edit-cnss').value = cnss;
    
          $('#editEmployeeModal').modal('show');
      });
    });

    // Soumission du formulaire de modification
    document.getElementById('editEmployeeForm').addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(document.getElementById('editEmployeeForm'));
      const employeeData = {};
      formData.forEach((value, key) => {
          employeeData[key] = value;
      });

      const id = document.getElementById('edit-id').value;

      try {
          const response = await fetch(`http://localhost:3018/employees/update/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(employeeData)
          });

          if (!response.ok) {
              throw new Error('Erreur lors de la mise à jour de l\'employé');
          }

          window.location.href = 'indexEmploye.html'; 
      } catch (error) {
          console.error('Erreur lors de la mise à jour de l\'employé :', error);
      } finally {
          $('#editEmployeeModal').modal('hide');
      }
    });

    // Suppression de l'employé
    document.getElementById('confirmDeleteButton').addEventListener('click', async () => {
        try {
            const response = await fetch(`http://localhost:3018/employees/delete/${deleteId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'employé');
            }

            window.location.href = 'indexEmploye.html';
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'employé :', error);
        } finally {
            $('#deleteConfirmationModal').modal('hide');
        }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des employés :', error);
  }
});

//code pour post des employés 
const addEmployeeForm = document.getElementById('employeeForm');
if (addEmployeeForm) {
    addEmployeeForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const formData = new FormData(addEmployeeForm);
        const employeeData = {};
        formData.forEach((value, key) => {
            employeeData[key] = value;
        });

        try {
            const response = await fetch('http://localhost:3018/employees/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de l\'employé');
            }

            window.location.href = 'indexEmploye.html';

            const addEmployeeModal = new bootstrap.Modal(document.getElementById('addEmployeeModal'));
            addEmployeeModal.hide();
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'employé :', error);
        }
    });
}

// Fonction pour formater la date au format YYYY-MM-DD
function formatDate(dateStr) {
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month}-${day}`;
}

