// For Subscribe button
const subsBtn = document.getElementById("subs-btn");
subsBtn.addEventListener("click", () => {
    window.alert("গ্রাহক হওয়ার জন্য ধন্যবাদ! শারদীয় দুর্গাপূজার অগ্রিম শুভেচ্ছা আপনাকে!");
});


// Countdown start after whole page reloaded
document.addEventListener("DOMContentLoaded", () => {
    const targetDate = new Date("October 17, 2026 00:00:00").getTime();
    const timer = setInterval(() => {
        const timeLeft = targetDate - Date.now();
        if (timeLeft <= 0) {
            clearInterval(timer);
            return;
        }
        document.getElementById("cd-days").textContent = String(Math.floor(timeLeft / 86400000)).padStart(2, '0');
        document.getElementById("cd-hours").textContent = String(Math.floor((timeLeft % 86400000) / 3600000)).padStart(2, '0');
        document.getElementById("cd-mins").textContent = String(Math.floor((timeLeft % 3600000) / 60000)).padStart(2, '0');
        document.getElementById("cd-secs").textContent = String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, '0');
    }, 1000);
});


// Hero Section Carousel for those six day's
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("carousel");
    const slides = carousel.querySelectorAll(".slide");
    const prevBtn = carousel.querySelector(".carousel-nav.prev");
    const nextBtn = carousel.querySelector(".carousel-nav.next");
    const dotsContainer = document.getElementById("dots");
    let currentSlide = 0;
    let slideInterval;
    const autoPlayTime = 5000;

    // Dot make depend on slides
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                goToSlide(index);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });
    }

    // Slide show function
    function goToSlide(index) {
        slides[currentSlide].classList.remove("active");
        dotsContainer.children[currentSlide].classList.remove("active");
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        slides[currentSlide].classList.add("active");
        dotsContainer.children[currentSlide].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {
        goToSlide(currentSlide + 1);
        resetAutoPlay();
    });
    prevBtn.addEventListener("click", () => {
        goToSlide(currentSlide - 1);
        resetAutoPlay();
    });
    function startAutoPlay() {
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, autoPlayTime);
    }
    function resetAutoPlay() {
        clearInterval(slideInterval);
        startAutoPlay();
    }
    carousel.addEventListener("mouseenter", () => clearInterval(slideInterval));
    carousel.addEventListener("mouseleave", startAutoPlay);
    createDots();
    startAutoPlay();
});