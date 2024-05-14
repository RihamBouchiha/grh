document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("a[href='indexSeconnecter.html']").forEach(function(element) {
        element.addEventListener("click", function(event) {
            event.preventDefault(); 
            window.location.href = "indexSeconnecter.html"; 
        });
    });
});
