document.addEventListener('DOMContentLoaded', () => {
    // Gallery Filter
    const filterTabs = document.querySelectorAll('.filter-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Check if both the filter tabs and gallery items exist in the DOM
    if (filterTabs.length && galleryItems.length) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Get the filter category value
                const filter = tab.dataset.filter;
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.filter === filter) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    // Lightbox DOM Elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxTag = document.getElementById('lightboxTag');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    // Check if the lightbox container and gallery items
    if (lightbox && galleryItems.length) {
        const allItems = Array.from(galleryItems);
        let currentIndex = 0;

        // Helper function to get only the items
        function getVisibleItems() {
            return allItems.filter(item => !item.classList.contains('hide'));
        }

        // Function to open the lightbox
        function openLightbox(item) {
            const visibleItems = getVisibleItems();
            currentIndex = visibleItems.indexOf(item);
            renderLightbox(visibleItems);
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        // Function to inject image sources and metadata
        function renderLightbox(visibleItems) {
            const item = visibleItems[currentIndex];
            if (!item) return;
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxTitle.textContent = item.dataset.title;
            lightboxTag.textContent = item.dataset.tag;
        }

        // Function to close the lightbox modal
        function closeLightbox() {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }

        // Attach click event listeners to all gallery items
        allItems.forEach(item => {
            item.addEventListener('click', () => openLightbox(item));
        });

        // Close the lightbox when clicking the explicit close button
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        lightboxPrev.addEventListener('click', () => {
            const visibleItems = getVisibleItems();
            currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
            renderLightbox(visibleItems);
        });

        lightboxNext.addEventListener('click', () => {
            const visibleItems = getVisibleItems();
            currentIndex = (currentIndex + 1) % visibleItems.length;
            renderLightbox(visibleItems);
        });

        // Add keyboard controls for a better desktop user experience
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightboxPrev.click();
            if (e.key === 'ArrowRight') lightboxNext.click();
        });
    }
});