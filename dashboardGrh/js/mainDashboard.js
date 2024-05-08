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
