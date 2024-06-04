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

//code cote client
document.getElementById('employeeForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const jsonData = {};
  formData.forEach((value, key) => {
      jsonData[key] = value;
  });

  try {
      const response = await fetch('http://localhost:3012/employees', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonData)
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Employé ajouté:', data);

          const table = document.querySelector('.table tbody');
          const newRow = document.createElement('tr');

          Object.values(data).forEach(value => {
              const newCell = document.createElement('td');
              newCell.textContent = value;
              newRow.appendChild(newCell);
          });

          const modifyCell = document.createElement('td');
          const deleteCell = document.createElement('td');

          modifyCell.innerHTML = `<button class="btn btn-primary">Modifier</button>`;
          deleteCell.innerHTML = `<button class="btn btn-danger">Supprimer</button>`;

          newRow.appendChild(modifyCell);
          newRow.appendChild(deleteCell);

          table.appendChild(newRow);

          deleteCell.querySelector('button').addEventListener('click', function() {
              const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer cette ligne?");
              if (isConfirmed) {
                  const row = this.closest('tr');
                  row.remove();
              }
          });

      } else {
          console.error('Erreur lors de l\'ajout de l\'employé:', response.statusText);
      }
  } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'employé:', err);
  }
});





