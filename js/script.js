// =========================
// SCROLL GLOBAL SUAVE
// =========================

const prefersReducedMotion =
window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hasSmoothTools =
window.Lenis && window.gsap && window.ScrollTrigger && !prefersReducedMotion;

let lenis;

if (hasSmoothTools) {
    gsap.registerPlugin(ScrollTrigger);

    lenis = new Lenis({
        lerp:.075,
        smoothWheel:true,
        wheelMultiplier:.85,
        touchMultiplier:1.15,
        anchors:false
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });
}

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
// ETIQUETAS INTERACTIVAS
// =========================

const roomTags =
document.querySelectorAll(".room-tag");

roomTags.forEach((tag) => {

    tag.addEventListener("click", () => {

        const isOpen =
        tag.classList.contains("is-open");

        roomTags.forEach((item) => {
            item.classList.remove("is-open");
            item.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
            tag.classList.add("is-open");
            tag.setAttribute("aria-expanded", "true");
        }

    });

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

            const target =
            document.querySelector(this.getAttribute("href"));

            if (!target) return;

            if (lenis) {
                lenis.scrollTo(target, {
                    offset:-70,
                    duration:1.35,
                    easing:(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            } else {
                target.scrollIntoView({
                    behavior:prefersReducedMotion ? "auto" : "smooth"
                });
            }

        }
    );

});

// =========================
// MOVIMIENTO GLOBAL DE LA WEB
// =========================

if (hasSmoothTools) {
    gsap.utils.toArray(".fade-in").forEach((el) => {
        gsap.fromTo(
            el,
            {
                y:70,
                opacity:0,
                scale:.97
            },
            {
                y:0,
                opacity:1,
                scale:1,
                ease:"power3.out",
                scrollTrigger:{
                    trigger:el,
                    start:"top 88%",
                    end:"top 50%",
                    scrub:.55
                }
            }
        );
    });

    gsap.utils.toArray(".features, .process .container, .reviews, .cta .container").forEach((el, index) => {
        gsap.to(el, {
            yPercent:index % 2 === 0 ? -5 : -3,
            ease:"none",
            scrollTrigger:{
                trigger:el,
                start:"top bottom",
                end:"bottom top",
                scrub:true
            }
        });
    });

    gsap.to(".hero-content", {
        yPercent:18,
        opacity:.45,
        ease:"none",
        scrollTrigger:{
            trigger:".hero",
            start:"top top",
            end:"bottom top",
            scrub:true
        }
    });

    gsap.utils.toArray("section").forEach((section) => {
        gsap.fromTo(
            section,
            { "--section-soft-light":0 },
            {
                "--section-soft-light":1,
                ease:"none",
                scrollTrigger:{
                    trigger:section,
                    start:"top bottom",
                    end:"top center",
                    scrub:true
                }
            }
        );
    });
}

// =========================
// CÍRCULOS EN MOVIMIENTO
// =========================

const audience = document.querySelector(".audience");

if (audience) {
    let animationFrame;

    const moveOrbit = () => {
        const bounds = audience.getBoundingClientRect();
        const availableScroll = audience.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -bounds.top / availableScroll));
        const leftStart = 140;
        const leftEnd = -50;
        const rightStart = -140;
        const rightEnd = 50;

        audience.style.setProperty(
            "--orbit-spin-left",
            `${leftStart + progress * (leftEnd - leftStart)}deg`
        );
        audience.style.setProperty(
            "--orbit-spin-right",
            `${rightStart + progress * (rightEnd - rightStart)}deg`
        );
        audience.style.setProperty(
            "--orbit-text-opacity",
            Math.min(1, Math.max(0, (progress - .10) / .12))
        );
        animationFrame = undefined;
    };

    window.addEventListener("scroll", () => {
        if (!animationFrame) animationFrame = requestAnimationFrame(moveOrbit);
    }, { passive:true });

    window.addEventListener("resize", moveOrbit);
    moveOrbit();
}

// =========================
// BENEFICIOS ANIMADOS
// =========================

const scrollBenefits = document.querySelector(".scroll-benefits");

if (scrollBenefits) {
    let benefitsFrame;

    const clamp = (value, min = 0, max = 1) => {
        return Math.min(max, Math.max(min, value));
    };

    const stepProgress = (progress, start, end) => {
        return clamp((progress - start) / (end - start));
    };

    const smoothStep = (value) => {
        const progress = clamp(value);
        return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
    };

    const setCardMotion = (name, progress) => {
        const easedProgress = smoothStep(progress);
        const centerWeight = Math.sin(easedProgress * Math.PI);
        const x = 82 - (easedProgress * 164);
        const y = centerWeight * -38;
        const rotate = 10 - (easedProgress * 20);
        const scale = .92 + (centerWeight * .08);
        const opacity = Math.min(
            clamp(progress / .18),
            clamp((1 - progress) / .22)
        );

        scrollBenefits.style.setProperty(`--card-${name}-x`, `${x}vw`);
        scrollBenefits.style.setProperty(`--card-${name}-y`, `calc(-50% + ${y}px)`);
        scrollBenefits.style.setProperty(`--card-${name}-rotate`, `${rotate}deg`);
        scrollBenefits.style.setProperty(`--card-${name}-scale`, scale);
        scrollBenefits.style.setProperty(`--card-${name}-opacity`, opacity);
    };

    const moveBenefits = () => {
        const bounds = scrollBenefits.getBoundingClientRect();
        const availableScroll = scrollBenefits.offsetHeight - window.innerHeight;
        const progress = clamp(-bounds.top / availableScroll);
        const introExit = smoothStep(stepProgress(progress, .02, .18));
        const cardOne = stepProgress(progress, .055, .43);
        const cardTwo = stepProgress(progress, .205, .58);
        const cardThree = stepProgress(progress, .355, .73);
        const outroEnter = smoothStep(stepProgress(progress, .70, .92));

        scrollBenefits.style.setProperty("--benefit-progress", progress);
        scrollBenefits.style.setProperty("--intro-x", `${introExit * -88}vw`);
        scrollBenefits.style.setProperty("--intro-y", `${introExit * 14}px`);
        scrollBenefits.style.setProperty("--intro-rotate", `${introExit * -6}deg`);
        scrollBenefits.style.setProperty("--intro-opacity", clamp(1 - (introExit * 1.25)));
        scrollBenefits.style.setProperty("--outro-x", `${100 - (outroEnter * 100)}vw`);
        scrollBenefits.style.setProperty("--outro-y", `calc(-50% + ${outroEnter * -18}px)`);
        scrollBenefits.style.setProperty("--outro-rotate", `${7 - (outroEnter * 10)}deg`);
        scrollBenefits.style.setProperty("--outro-scale", 1);
        scrollBenefits.style.setProperty("--outro-opacity", clamp(outroEnter * 1.35));
        scrollBenefits.style.setProperty("--bubbles-y", `${80 - (outroEnter * 120)}px`);
        scrollBenefits.style.setProperty("--bubbles-opacity", clamp(outroEnter * 1.15));

        setCardMotion("one", cardOne);
        setCardMotion("two", cardTwo);
        setCardMotion("three", cardThree);

        benefitsFrame = undefined;
    };

    window.addEventListener("scroll", () => {
        if (!benefitsFrame) benefitsFrame = requestAnimationFrame(moveBenefits);
    }, { passive:true });

    window.addEventListener("resize", moveBenefits);
    moveBenefits();
}
