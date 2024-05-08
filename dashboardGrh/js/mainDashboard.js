//descendre la barre
document.addEventListener("DOMContentLoaded", function() {
    const userAccountBtn = document.getElementById("userAccountBtn");
    const userAccountDropdown = document.getElementById("userAccountDropdown");

    userAccountBtn.addEventListener("click", function(event) {
        event.stopPropagation(); 
        userAccountDropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", function(event) {
        if (!userAccountBtn.contains(event.target) && !userAccountDropdown.contains(event.target)) {
            userAccountDropdown.classList.add("hidden");
        }
    });
});
//enlever la barre
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.getElementById('main-content');
    if (sidebar.style.display === 'none') {
        sidebar.style.display = 'block';
        mainContent.style.marginLeft = '64px'; 
    } else {
        sidebar.style.display = 'none';
        mainContent.style.marginLeft = '0'; 
    }
}
document.addEventListener('DOMContentLoaded', function() {
    var toggleButtons = document.querySelectorAll('.toggle-submenu');

    toggleButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            var submenu = this.nextElementSibling;
            submenu.classList.toggle('show');
            this.querySelector('.arrow').classList.toggle('rotated');
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    var toggleButtons = document.querySelectorAll('.toggle-submenu');

    toggleButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            var submenu = this.nextElementSibling;
            submenu.classList.toggle('hidden');
            var arrow = this.querySelector('.arrow i');
            arrow.classList.toggle('fa-chevron-right');
            arrow.classList.toggle('fa-chevron-down');
        });
    });
});


function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.getElementById('main-content');
    
    // Vérifie si le sidebar est actuellement affiché ou non
    var isSidebarVisible = !sidebar.classList.contains('hidden');
    
    // Si le sidebar est actuellement visible, alors cache-le, sinon affiche-le
    if (isSidebarVisible) {
        sidebar.classList.add('hidden');
        mainContent.style.marginLeft = '0'; // Réduire la marge à gauche
    } else {
        sidebar.classList.remove('hidden');
        mainContent.style.marginLeft = '64px'; // Rétablir la marge à gauche
    }
}

// Fonction pour afficher le sidebar
function showSidebar() {
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.getElementById('main-content');
    
    sidebar.classList.remove('hidden');
    mainContent.style.marginLeft = '64px'; // Rétablir la marge à gauche
}

// Fonction pour cacher le sidebar
function hideSidebar() {
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.getElementById('main-content');
    
    sidebar.classList.add('hidden');
    mainContent.style.marginLeft = '0'; // Réduire la marge à gauche
}




