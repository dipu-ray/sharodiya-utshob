// Mobile hamburger menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

function closeMenu() {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
}

hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMenu();
});





// State Variables and DOM Elements
const slides = [
    { title: "মহালয়া", subtitle: "দেবীপিয়ারি আগমন" },
    { title: "ষষ্ঠী", subtitle: "বোধন ও আবাহন" },
    { title: "সপ্তমী", subtitle: "কলাবউ স্নান ও নবপত্রিকা প্রবেশ" },
    { title: "অষ্টমী", subtitle: "সন্ধিপূজা ও অঞ্জলি" },
    { title: "নবমী", subtitle: "মহা নবমী ও ধুনুচি নাচ" },
    { title: "দশমী", subtitle: "বিজয়া ও প্রতিমা বিসর্জন" }
];

let current = 0;
const titleEl = document.getElementById('heroTitle');
const currentNumEl = document.getElementById('currentNum');
const ghostNumEl = document.getElementById('ghostNum');
const totalNumEl = document.getElementById('totalNum');
const slideBgEls = document.querySelectorAll('.slide-bg');

// Convert english num to bengali num
function convertToBengaliNum(num) {
    const bengaliDigits = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬' };
    return String(num).split('').map(digit => bengaliDigits[digit] || digit).join('');
}
totalNumEl.textContent = slides.length.toLocaleString('bn-BD');
let isAnimating = false;

// Render active slide components
function renderSlide() {
    const s = slides[current];
    titleEl.innerHTML = `<span class="slide-title">${s.title}</span><span class="slide-divider"></span><span class="slide-subtitle">${s.subtitle}</span>`;
    const bengaliCurrentNum = convertToBengaliNum(current + 1);
    currentNumEl.textContent = bengaliCurrentNum;
    ghostNumEl.textContent = bengaliCurrentNum;
    slideBgEls.forEach((bg, index) => {
        bg.classList.toggle('active', index === current);
    });
}

// Reset and trigger number counter animation
function bumpNumbers() {
    [currentNumEl, ghostNumEl].forEach(el => {
        el.classList.remove('num-swap');
        void el.offsetWidth;
        el.classList.add('num-swap');
    });
}

// Main slide navigation
function goToSlide(direction) {
    if (isAnimating) return;
    isAnimating = true;
    const outClass = direction === 'next' ? 'slide-out-next' : 'slide-out-prev';
    const inClass = direction === 'next' ? 'slide-in-next' : 'slide-in-prev';
    titleEl.classList.add(outClass);

    // Handle slide-out animation completion
    titleEl.addEventListener('animationend', function onOut() {
        titleEl.removeEventListener('animationend', onOut);
        current = direction === 'next'
            ? (current + 1) % slides.length
            : (current - 1 + slides.length) % slides.length;
        renderSlide();
        bumpNumbers();
        titleEl.classList.remove(outClass);
        titleEl.classList.add(inClass);

        // Handle entry animation completion
        titleEl.addEventListener('animationend', function onIn() {
            titleEl.removeEventListener('animationend', onIn);
            titleEl.classList.remove(inClass);
            isAnimating = false;
        }, { once: true });
    }, { once: true });
}

document.getElementById('nextBtn').addEventListener('click', () => goToSlide('next'));
document.getElementById('prevBtn').addEventListener('click', () => goToSlide('prev'));
renderSlide();





// Countdown set for Durga Puja Day's
document.addEventListener('DOMContentLoaded', () => {
    const countdownTarget = new Date('2026-10-17T00:00:00+06:00').getTime();
    const countdownEls = {
        days: document.getElementById('countdownDays'),
        hours: document.getElementById('countdownHours'),
        minutes: document.getElementById('countdownMinutes'),
        seconds: document.getElementById('countdownSeconds')
    };

    // Convert English num to Bengali num
    function convertToBengaliNum(num) {
        const bengaliDigits = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
        return String(num).split('').map(digit => bengaliDigits[digit] || digit).join('');
    }

    // Countdown timer calculator and renderer
    function updateCountdown() {
        const remaining = countdownTarget - Date.now();

        // Target will finished then show : '০০'
        if (remaining <= 0) {
            countdownEls.days.textContent = '০০';
            countdownEls.hours.textContent = '০০';
            countdownEls.minutes.textContent = '০০';
            countdownEls.seconds.textContent = '০০';
            return;
        }

        // Time calculation formulas
        const totalSeconds = Math.floor(remaining / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // Format to 2 digits
        const formattedDays = String(days).padStart(2, '0');
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        // Convert to Bengali and render to UI
        countdownEls.days.textContent = convertToBengaliNum(formattedDays);
        countdownEls.hours.textContent = convertToBengaliNum(formattedHours);
        countdownEls.minutes.textContent = convertToBengaliNum(formattedMinutes);
        countdownEls.seconds.textContent = convertToBengaliNum(formattedSeconds);
    }
    updateCountdown();

    // Manage the live countdown interval
    const countdownTimer = setInterval(() => {
        updateCountdown();
        if (Date.now() >= countdownTarget) {
            clearInterval(countdownTimer);
        }
    }, 1000);
});





// Scroll to Top Button Logic's
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});