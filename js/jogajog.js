document.addEventListener('DOMContentLoaded', () => {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('nameInput').value.trim();
            const email = document.getElementById('emailInput').value.trim();
            const subject = document.getElementById('subjectInput').value.trim();
            const message = document.getElementById('messageInput').value.trim();

            if (!name || !email || !subject || !message) {
                formStatus.textContent = 'অনুগ্রহ করে সব ঘর পূরণ করুন।';
                formStatus.className = 'form-status show error';
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                formStatus.textContent = 'অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা লিখুন।';
                formStatus.className = 'form-status show error';
                return;
            }

            formStatus.textContent = 'ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে।';
            formStatus.className = 'form-status show success';
            contactForm.reset();
        });
    }
});