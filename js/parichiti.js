// Five Days of Puja — tab content data
document.addEventListener('DOMContentLoaded', () => {
    const daysData = [
        {
            title: "ষষ্ঠী — বোধন ও কল্পারম্ভ",
            text: "মহাষষ্ঠীর সন্ধ্যায় বিল্ববৃক্ষের নিচে দেবীর বোধন সম্পন্ন হয়। কাঠামোর চক্ষুদান সম্পন্ন করে দেবীকে জাগ্রত করা হয় এবং আনুষ্ঠানিকভাবে শুরু হয় পাঁচ দিনের মহোৎসব।"
        },
        {
            title: "সপ্তমী — কলাবউ স্নান ও নবপত্রিকা প্রবেশ",
            text: "মহাসপ্তমীর প্রত্যুষে নদী বা জলাশয়ে কলাবউ স্নান করিয়ে মণ্ডপে প্রবেশ করানো হয়। নয়টি উদ্ভিদ নিয়ে গঠিত নবপত্রিকা স্থাপনের মধ্য দিয়ে শুরু হয় মূল পূজার আনুষ্ঠানিকতা।"
        },
        {
            title: "অষ্টমী — সন্ধিপূজা ও অঞ্জলি",
            text: "মহাঅষ্টমী ও নবমীর সন্ধিক্ষণে অনুষ্ঠিত হয় অত্যন্ত পবিত্র সন্ধিপূজা। কুমারী পূজা ও ভক্তদের সম্মিলিত অঞ্জলি প্রদানের মধ্য দিয়ে এই দিনটি বিশেষ মাহাত্ম্য বহন করে।"
        },
        {
            title: "নবমী — মহানবমী ও ধুনুচি নাচ",
            text: "মহানবমীতে দেবীর পূর্ণ আরাধনা সম্পন্ন হয়। সন্ধ্যায় ঢাকের তালে তালে ধুনুচি নাচের মাধ্যমে ভক্তরা দেবীর উদ্দেশ্যে আনন্দ ও শ্রদ্ধা নিবেদন করেন।"
        },
        {
            title: "দশমী — বিজয়া ও প্রতিমা বিসর্জন",
            text: "বিজয়া দশমীতে সিঁদুর খেলার মধ্য দিয়ে বিবাহিতা নারীরা দেবীকে বরণ করেন। দিনের শেষে ভারাক্রান্ত মনে প্রতিমা বিসর্জনের মাধ্যমে সমাপ্তি ঘটে এই মহোৎসবের।"
        }
    ];

    // Day tabs interaction
    const dayTabs = document.querySelectorAll('.day-tab');
    const dayPanel = document.getElementById('dayPanel');
    const dayPanelTitle = document.getElementById('dayPanelTitle');
    const dayPanelText = document.getElementById('dayPanelText');

    dayTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('active')) return;
            dayTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const dayIndex = Number(tab.dataset.day);
            const data = daysData[dayIndex];
            dayPanel.classList.remove('fade');
            void dayPanel.offsetWidth;
            dayPanelTitle.textContent = data.title;
            dayPanelText.textContent = data.text;
            dayPanel.classList.add('fade');
        });
    });
});

// Scroll to Top Button show and hide
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Scroll to top with smooth
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});