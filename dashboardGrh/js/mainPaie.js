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

function searchEmployee() {
  var employeeId = document.getElementById('employeeId').value.trim();

  // Replace with your logic to find employee by ID
  var employee = findEmployeeById(employeeId);

  if (employee) {
    displayEmployeeDetails(employee);
  } else {
    displayErrorMessage('Aucun employé trouvé avec cet ID.');
  }
}

function findEmployeeById(id) {
  // Replace with actual logic to find employee by ID
  // Example: Fetch employee from a data source (API, database, etc.)
  var employees = [
    { id: '1', name: 'John Doe', department: 'HR', salary: 3000 },
    { id: '2', name: 'Jane Smith', department: 'IT', salary: 3500 }
    // Add more employees as needed
  ];

  return employees.find(function(emp) {
    return emp.id === id;
  });
}

function displayEmployeeDetails(employee) {
  var modalBody = document.getElementById('employeeModalBody');
  modalBody.innerHTML = `
    <p><strong>ID:</strong> ${employee.id}</p>
    <p><strong>Nom:</strong> ${employee.name}</p>
    <p><strong>Département:</strong> ${employee.department}</p>
    <p><strong>Salaire:</strong> ${employee.salary} EUR</p>
  `;
  $('#employeeModal').modal('show'); // Show modal using jQuery
}

function displayErrorMessage(message) {
  var searchResult = document.getElementById('searchResult');
  searchResult.innerHTML = `<p class="text-danger">${message}</p>`;
}
