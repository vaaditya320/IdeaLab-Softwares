// Hide preloader after page loads
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";

    // Animate buttons one by one
    const buttons = document.querySelectorAll(".software-button");
    buttons.forEach((button, index) => {
        setTimeout(() => {
            button.classList.add("show-button");
        }, index * 200); // Delays each button
    });
});
