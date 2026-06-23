// =========================
// MENU MOBILE
// =========================

const hamburger =
document.querySelector(".hamburger");

const navLinks =
document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// =========================
// MODAL
// =========================

const modal =
document.querySelector(".modal");

const openModal =
document.querySelector(".open-modal");

const closeModal =
document.querySelector(".close-modal");

openModal.addEventListener("click", () => {
    modal.classList.add("active");
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

// =========================
// FADE IN ON SCROLL
// =========================

const observer =
new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

});

document
.querySelectorAll(".fade-in")
.forEach((el) => observer.observe(el));

// =========================
// SMOOTH SCROLL
// =========================

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            document
            .querySelector(
                this.getAttribute("href")
            )
            .scrollIntoView({
                behavior:"smooth"
            });

        }
    );

});