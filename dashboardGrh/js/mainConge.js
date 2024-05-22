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

document.addEventListener('DOMContentLoaded', function() {
  const rootDiv = document.getElementById('root');
  let tableHtml = `
      <div class="table-responsive">
          <table class="table table-bordered table-striped">
              <thead class="thead-dark">
                  <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>De la période</th>
                      <th>À la période</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
  `;

  employees.forEach(emp => {
      tableHtml += `
          <tr>
              <td>${emp.id}</td>
              <td>${emp.nom}</td>
              <td>${emp.prenom}</td>
              <td>${emp.dePeriode}</td>
              <td>${emp.aPeriode}</td>
              <td>
                  <button class="btn btn-success btn-sm">Accepter</button>
                  <button class="btn btn-danger btn-sm">Refuser</button>
              </td>
          </tr>
      `;
  });

  tableHtml += `
              </tbody>
          </table>
      </div>
  `;

  rootDiv.innerHTML = tableHtml;
});
