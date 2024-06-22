document.addEventListener('DOMContentLoaded', function() {
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

  let searchForm = document.querySelector(".content nav form");
  let searchBtn = document.getElementById("search-btn");
  let searchIcon = document.querySelector(".search-icon");
  searchBtn.addEventListener("click", (e) => {
      if (window.innerWidth < 576) {
          e.preventDefault();
          searchForm.classList.toggle("show");
          if (searchForm.classList.contains("show")) {
              searchIcon.classList.replace("fa-search", "fa-times");
          } else {
              searchIcon.classList.replace("fa-times", "fa-search");
          }
      }
  });

  window.addEventListener("resize", () => {
      if (window.innerWidth > 576) {
          searchIcon.classList.replace("fa-times", "fa-search");
          searchForm.classList.remove("show");
      }
      if (window.innerWidth < 768) {
          sideBar.classList.add("hide");
      }
  });

  if (window.innerWidth < 768) {
      sideBar.classList.add("hide");
  }

  document.getElementById('searchForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const employeeId = document.getElementById('employeeId').value;

      fetch(`http://localhost:3018/api/employees/${employeeId}`) // Assurez-vous que le port est correct
          .then(response => {
              if (!response.ok) {
                  throw new Error('Employee not found');
              }
              return response.json();
          })
          .then(employee => {
              const employeeDetails = document.getElementById('employeeDetails');
              employeeDetails.innerHTML = `
                  <p><strong>ID:</strong> ${employee.id}</p>
                  <p><strong>Nom:</strong> ${employee.nom}</p>
                  <p><strong>Prénom:</strong> ${employee.prenom}</p>
                  <p><strong>Genre:</strong> ${employee.genre}</p>
                  <p><strong>Date de Naissance:</strong> ${new Date(employee.dateNaissance).toLocaleDateString()}</p>
                  <p><strong>Téléphone:</strong> ${employee.telephone}</p>
                  <p><strong>Email:</strong> ${employee.adresseEmail}</p>
                  <p><strong>Poste:</strong> ${employee.poste}</p>
                  <p><strong>Statut d'Emploi:</strong> ${employee.statutEmploi}</p>
                  <p><strong>Salaire:</strong> ${employee.salaire}</p>
                  <p><strong>CNSS:</strong> ${employee.cnss}</p>
              `;
              $('#employeeDetailsModal').modal('show');
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Employé non trouvé');
          });
  });
});
/*
$(document).ready(function() {
  const modal = $('#employeeDetailsModal');
  const netSalaryModal = $('#netSalaryModal');
  const btnCalculateNetSalary = $('#btnCalculateNetSalary');
  const searchForm = $('#searchForm');

  // Fonction pour calculer le salaire net en fonction des règles spécifiques au Maroc
  function calculateNetSalary(salaireBrut) {
    // Exemple de taux de taxe pour le Maroc
    const tauxTaxe = 0.2; // 20% de taxe

    // Calculer le salaire net
    const salaireNet = salaireBrut * (1 - tauxTaxe);
    return salaireNet;
  }

  // Fonction pour afficher les détails de l'employé dans le premier modal
  function displayEmployeeDetails(employee) {
    $('#empNom').text(employee.nom);
    $('#empPrenom').text(employee.prenom);
    $('#empId').text(employee.id); // Assurez-vous que employee.id est correct
    $('#empSalaireBrut').text(employee.salaire); // Assurez-vous que employee.salaire est correct

    // Afficher le premier modal
    modal.modal('show');
  }

  // Fonction pour afficher les détails du salaire net dans le deuxième modal
  function displayNetSalary(employee, salaireNet) {
    $('#netEmpNom').text(employee.nom);
    $('#netEmpPrenom').text(employee.prenom);
    $('#netEmpId').text(employee.id);
    $('#netEmpSalaireNet').text(salaireNet.toFixed(2));

    // Afficher le deuxième modal
    netSalaryModal.modal('show');
  }

  // Écouteur d'événement pour soumettre le formulaire de recherche
  searchForm.on('submit', async function(event) {
    event.preventDefault();

    const employeeId = $('#employeeId').val();

    try {
      // Effectuer la requête GET pour récupérer les détails de l'employé par ID
      const response = await fetch(`http://localhost:3018/api/employees/${employeeId}`);
      if (!response.ok) {
        throw new Error('Employee not found');
      }
      const employee = await response.json();

      // Afficher les détails de l'employé dans le premier modal
      displayEmployeeDetails(employee);
    } catch (error) {
      console.error('Error fetching employee details:', error);
      alert('Employee not found or an error occurred');
    }
  });

  // Écouteur d'événement pour le clic sur le bouton "Calculer le salaire net"
  btnCalculateNetSalary.on('click', function() {
    const salaireBrutElement = $('#empSalaireBrut');
    if (salaireBrutElement.length > 0) {
      const salaireBrut = parseFloat(salaireBrutElement.text());
      const salaireNet = calculateNetSalary(salaireBrut);

      // Cacher le premier modal
      modal.modal('hide');

      // Afficher les détails calculés dans le deuxième modal
      displayNetSalary({
        nom: $('#empNom').text(),
        prenom: $('#empPrenom').text(),
        id: $('#empId').text()
      }, salaireNet);
    } else {
      console.error('Element empSalaireBrut not found in modal');
    }
  });
});*/

$(document).ready(function() {
  const modal = $('#employeeDetailsModal');
  const netSalaryModal = $('#netSalaryModal');
  const btnCalculateNetSalary = $('#btnCalculateNetSalary');
  const searchForm = $('#searchForm');

  // Fonction pour calculer le salaire net en fonction des règles spécifiques au Maroc
  function calculateNetSalary(salaireBrut) {
    // Exemple de taux de taxe pour le Maroc (à ajuster selon les règles fiscales réelles)
    const tauxTaxe = 0.2; // 20% de taxe

    // Calculer le salaire net
    const salaireNet = salaireBrut * (1 - tauxTaxe);
    return salaireNet;
  }

  // Fonction pour afficher les détails de l'employé dans le premier modal
  function displayEmployeeDetails(employee) {
    $('#empNom').text(employee.nom);
    $('#empPrenom').text(employee.prenom);
    $('#empId').text(employee.id); // Assurez-vous que employee.id est correct
    $('#empSalaireBrut').text(employee.salaire); // Assurez-vous que employee.salaire est correct

    // Afficher le premier modal
    modal.modal('show');
  }

  // Fonction pour afficher les détails du salaire net dans le deuxième modal
  function displayNetSalary(employee, salaireNet) {
    $('#netEmpNom').text(employee.nom);
    $('#netEmpPrenom').text(employee.prenom);
    $('#netEmpId').text(employee.id);
    $('#empSalaireNet').text(salaireNet.toFixed(2)); // Afficher le salaire net dans l'élément correspondant

    // Afficher le deuxième modal
    netSalaryModal.modal('show');
  }

  // Écouteur d'événement pour soumettre le formulaire de recherche
  searchForm.on('submit', async function(event) {
    event.preventDefault();

    const employeeId = $('#employeeId').val();

    try {
      // Effectuer la requête GET pour récupérer les détails de l'employé par ID
      const response = await fetch(`http://localhost:3018/api/employees/${employeeId}`);
      if (!response.ok) {
        throw new Error('Employee not found');
      }
      const employee = await response.json();

      // Afficher les détails de l'employé dans le premier modal
      displayEmployeeDetails(employee);
    } catch (error) {
      console.error('Error fetching employee details:', error);
      alert('Employee not found or an error occurred');
    }
  });

  // Écouteur d'événement pour le clic sur le bouton "Calculer le salaire net"
  btnCalculateNetSalary.on('click', function() {
    const salaireBrutElement = $('#empSalaireBrut');
    if (salaireBrutElement.length > 0) {
      const salaireBrut = parseFloat(salaireBrutElement.text());
      const salaireNet = calculateNetSalary(salaireBrut);

      // Cacher le premier modal
      modal.modal('hide');

      // Afficher les détails calculés dans le deuxième modal
      displayNetSalary({
        nom: $('#empNom').text(),
        prenom: $('#empPrenom').text(),
        id: $('#empId').text()
      }, salaireNet);
    } else {
      console.error('Element empSalaireBrut not found in modal');
    }
  });
});
