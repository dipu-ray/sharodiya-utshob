// For the Subscribe button
const subsBtn = document.getElementById("subs-btn");
subsBtn.addEventListener("click", () => {
    window.alert("গ্রাহক হওয়ার জন্য ধন্যবাদ! শারদীয় দুর্গাপূজার অগ্রিম শুভেচ্ছা আপনাকে!");
});

// The timer will start after the page HTML is completely loaded.
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