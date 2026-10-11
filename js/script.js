document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("portfolioSlider");

    if (!slider) {
        console.error("Slider not found! Check portfolioSlider in HTML.");
        return;
    }

    const slides = slider.querySelectorAll(".slide");
    const dots = slider.querySelectorAll(".dot");
    const prev = slider.querySelector(".prev");
    const next = slider.querySelector(".next");
    const counter = slider.querySelector(".slide-counter");

    if (slides.length === 0 || !prev || !next) {
        console.error("Check your slides and button class names.");
        return;
    }

    let index = 0;
    let autoSlide;

    function displaySlide(number) {
        index = (number + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
            slide.style.opacity = i === index ? "1" : "0";
            slide.style.visibility = i === index ? "visible" : "hidden";
            slide.style.zIndex = i === index ? "1" : "0";
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);

            if (i === index) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });

        if (counter) {
            counter.textContent = `${index + 1} / ${slides.length}`;
        }
    }

    // Previous button
    prev.addEventListener("click", () => {
        displaySlide(index - 1);
        restartAutoSlide();
    });

    // Next button
    next.addEventListener("click", () => {
        displaySlide(index + 1);
        restartAutoSlide();
    });

    // Navigation dots
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            displaySlide(i);
            restartAutoSlide();
        });
    });

    // Automatically change images every 3 seconds
    function startAutoSlide() {
        clearInterval(autoSlide);

        autoSlide = setInterval(() => {
            if (!slider.matches(":hover") && !document.hidden) {
                displaySlide(index + 1);
            }
        }, 3000);
    }

    function restartAutoSlide() {
        startAutoSlide();
    }

    // Pause autoplay while the mouse is over the slider
    slider.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    slider.addEventListener("mouseleave", () => {
        startAutoSlide();
    });

    // Pause when the browser tab is hidden
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            clearInterval(autoSlide);
        } else if (!slider.matches(":hover")) {
            startAutoSlide();
        }
    });

    // Show the first image and start autoplay
    displaySlide(0);
    startAutoSlide();
});