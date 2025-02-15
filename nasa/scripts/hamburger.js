document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector("nav"); // Select the nav element

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active"); // Toggle the active class on the nav element
    });
});
