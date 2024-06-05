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
      const response = await fetch('http://localhost:3014/condidats');
      const condidats = await response.json();

      const tbody = document.querySelector('tbody');
      tbody.innerHTML = ''; // Clear existing rows

      condidats.forEach(condidat => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${condidat.nom}</td>
              <td>${condidat.prenom}</td>
              <td>${condidat.email}</td>
              <td>${condidat.telephone}</td>
              <td>${condidat.statutSocial}</td>
              <td>${condidat.positionCiblee}</td>
              <td>${condidat.cv}</td>
              <td><button class="btn btn-primary"><i class="fa-solid fa-check"></i></button></td>
              <td><button class="btn btn-danger"><i class="fa-solid fa-user-minus"></i></button></td>
          `;
          tbody.appendChild(row);
      });
  } catch (error) {
      console.error('Erreur lors de la récupération des candidats :', error);
  }
});

