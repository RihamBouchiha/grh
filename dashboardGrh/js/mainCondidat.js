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

//code get condidat

document.addEventListener("DOMContentLoaded", async () => {
  try {
      const response = await fetch('http://localhost:3018/condidats');
      const condidats = await response.json();
      
      console.log(condidats); // Vérifiez la structure des données dans la console
      
      const tbody = document.querySelector('tbody');
      tbody.innerHTML = ''; // Nettoyer le contenu existant du tbody
      
      condidats.forEach(condidat => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${condidat.nom}</td>
              <td>${condidat.prenom}</td>
              <td>${condidat.email}</td>
              <td>${condidat.telephone}</td>
              <td>${condidat.statutSocial}</td>
              <td>${condidat.positionCiblee}</td>
              
              <td><button class="btn btn-primary"><i class="fa-solid fa-check"></i></button></td>
              <td><button class="btn btn-danger"><i class="fa-solid fa-user-minus"></i></button></td>
          `;
          tbody.appendChild(row);
      });
  } catch (error) {
      console.error('Erreur lors de la récupération des candidats :', error);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const globalSearchForm = document.getElementById('globalSearchForm');
  const globalSearchInput = document.getElementById('globalSearchInput');
  const tbody = document.querySelector('tbody'); // Sélectionnez le tbody

  globalSearchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchTerm = globalSearchInput.value.trim().toLowerCase();

      // Fonction de filtrage pour rechercher les éléments correspondants sur la page
      const filterElements = (searchTerm) => {
          const allRows = tbody.querySelectorAll('tr'); // Sélectionnez les lignes de tableau appropriées ici

          allRows.forEach(row => {
              let found = false;
              row.querySelectorAll('td').forEach(cell => {
                  const text = cell.textContent.trim().toLowerCase();
                  if (text.includes(searchTerm)) {
                      found = true;
                  }
              });

              if (found) {
                  row.style.display = 'table-row'; // Affiche l'élément correspondant
              } else {
                  row.style.display = 'none'; // Masque l'élément qui ne correspond pas
              }
          });
      };

      filterElements(searchTerm);
  });
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
      const response = await fetch('http://localhost:3018/condidats');
      const condidats = await response.json();

      console.log(condidats); // Vérifiez la structure des données dans la console

      const tbody = document.querySelector('tbody');
      tbody.innerHTML = ''; // Nettoyer le contenu existant du tbody

      // Récupérer les candidats cachés du localStorage ou initialiser un tableau vide
      let hiddenCandidates = JSON.parse(localStorage.getItem('hiddenCandidates')) || [];

      // Filtrer les candidats cachés
      const visibleCandidates = condidats.filter(condidat => !hiddenCandidates.includes(condidat.id));

      visibleCandidates.forEach(condidat => {
          const row = document.createElement('tr');
          row.setAttribute('data-id', condidat.id); // Assurez-vous que condidat.id est unique pour chaque candidat
          row.innerHTML = `
              <td>${condidat.nom}</td>
              <td>${condidat.prenom}</td>
              <td>${condidat.email}</td>
              <td>${condidat.telephone}</td>
              <td>${condidat.statutSocial}</td>
              <td>${condidat.positionCiblee}</td>
              <td><button class="btn btn-primary accept-btn"><i class="fa-solid fa-check"></i></button></td>
              <td><button class="btn btn-danger"><i class="fa-solid fa-user-minus"></i></button></td>
          `;
          tbody.appendChild(row);
      });

      // Gestion des clics sur les boutons "Accepter"
      tbody.addEventListener('click', async (event) => {
          if (event.target.classList.contains('accept-btn')) {
              const row = event.target.closest('tr');
              const candidatId = row.getAttribute('data-id'); // Récupérer l'ID du candidat

              try {
                  // Vous pouvez ici appeler une API pour marquer le candidat comme accepté
                  // Par exemple, une requête PUT ou POST pour mettre à jour l'état du candidat

                  // Ajouter l'ID du candidat aux candidats cachés dans localStorage
                  hiddenCandidates.push(candidatId);
                  localStorage.setItem('hiddenCandidates', JSON.stringify(hiddenCandidates));

                  // Cacher la ligne de tableau
                  row.style.display = 'none'; // Cacher la ligne après avoir cliqué sur Accepter
              } catch (error) {
                  console.error('Erreur lors de l\'acceptation du candidat :', error);
              }
          }
      });

  } catch (error) {
      console.error('Erreur lors de la récupération des candidats :', error);
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:3018/condidats');
    const condidats = await response.json();

    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Nettoyer le contenu existant du tbody

    condidats.forEach(condidat => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${condidat.nom}</td>
          <td>${condidat.prenom}</td>
          <td>${condidat.email}</td>
          <td>${condidat.telephone}</td>
          <td>${condidat.statutSocial}</td>
          <td>${condidat.positionCiblee}</td>
          <td>
            <button class="btn btn-primary accept-btn"><i class="fa-solid fa-check"></i> </button>
          </td>
          <td>
            <button class="btn btn-danger delete-btn" data-toggle="modal" data-target="#confirmationModal">
              <i class="fa-solid fa-user-minus"></i> 
            </button>
          </td>
      `;
      tbody.appendChild(row);
    });

    // Gestion du clic sur le bouton "Supprimer"
    tbody.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-btn')) {
        const row = event.target.closest('tr');
        const nom = row.querySelector('td:nth-child(1)').textContent.trim();
        const prenom = row.querySelector('td:nth-child(2)').textContent.trim();

        // Pré-remplir le modal avec les informations du candidat à supprimer
        const modalBody = document.querySelector('#confirmationModal .modal-body');
        modalBody.textContent = `Êtes-vous sûr de vouloir supprimer ${prenom} ${nom} ?`;

        // Stocker la ligne à supprimer pour utilisation dans la confirmation
        $('#confirmationModal').data('relatedTarget', row);
      }
    });

    // Gestion du clic sur le bouton "Confirmer" du modal de confirmation
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    confirmDeleteBtn.addEventListener('click', async () => {
      const rowToDelete = $('#confirmationModal').data('relatedTarget');

      if (rowToDelete) {
        const nom = rowToDelete.querySelector('td:nth-child(1)').textContent.trim();
        const prenom = rowToDelete.querySelector('td:nth-child(2)').textContent.trim();

        try {
          // Envoyer une requête DELETE pour supprimer le candidat
          const response = await fetch(`http://localhost:3018/supprimer-candidat/${nom}/${prenom}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            // Si la suppression est réussie, cacher la ligne du tableau
            rowToDelete.remove();
            $('#confirmationModal').modal('hide');
          } else {
            console.error('Erreur lors de la suppression du candidat :', response.statusText);
          }
        } catch (error) {
          console.error('Erreur lors de la suppression du candidat :', error);
        }
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des candidats :', error);
  }
});




