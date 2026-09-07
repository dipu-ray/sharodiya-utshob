document.addEventListener('DOMContentLoaded', () => {
    // Only one track (from the lists OR the featured card) plays at a time.
    const audio = new Audio();
    let activeItem = null;
    let activeIsFeatured = false;

    function formatTime(sec) {
        if (!isFinite(sec) || isNaN(sec)) return '00:00';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function toBengaliDigits(str) {
        return str.replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
    }

    function stopCurrent() {
        audio.pause();
        if (activeItem) {
            activeItem.classList.remove('playing');
        }
        activeItem = null;
        activeIsFeatured = false;
    }

    // Song list items
    const songItems = document.querySelectorAll('.song-item');

    songItems.forEach(item => {
        const playBtn = item.querySelector('.song-play-btn');
        const progressTrack = item.querySelector('.song-progress-track');
        const progressFill = item.querySelector('.song-progress-fill');
        const timeLabel = item.querySelector('.song-time');
        const src = item.dataset.src;

        playBtn.addEventListener('click', () => {
            const isThisPlaying = activeItem === item && !audio.paused;

            if (isThisPlaying) {
                audio.pause();
                item.classList.remove('playing');
                return;
            }

            if (activeItem && activeItem !== item) {
                stopCurrent();
            }

            if (activeItem !== item) {
                audio.src = src;
                activeItem = item;
                activeIsFeatured = false;
            }

            audio.play().catch(() => {
                console.warn('Could not play:', src, '— add the audio file at this path.');
            });
            item.classList.add('playing');
        });

        progressTrack.addEventListener('click', (e) => {
            if (activeItem !== item || !audio.duration) return;
            const rect = progressTrack.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            audio.currentTime = ratio * audio.duration;
        });

        audio.addEventListener('timeupdate', () => {
            if (activeItem !== item || activeIsFeatured) return;
            const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
            progressFill.style.width = pct + '%';
            timeLabel.textContent = toBengaliDigits(formatTime(audio.currentTime));
        });

        audio.addEventListener('ended', () => {
            if (activeItem === item) {
                item.classList.remove('playing');
                progressFill.style.width = '0%';
            }
        });
    });

    // Featured Mahalaya card
    const featuredCard = document.getElementById('featuredCard');
    const featuredPlayBtn = document.getElementById('featuredPlayBtn');
    const featuredProgressTrack = featuredCard.querySelector('.featured-progress-track');
    const featuredProgressFill = featuredCard.querySelector('.featured-progress-fill');
    const featuredTime = featuredCard.querySelector('.featured-time');
    const featuredSrc = featuredCard.dataset.src;

    featuredPlayBtn.addEventListener('click', () => {
        const isThisPlaying = activeItem === featuredCard && !audio.paused;

        if (isThisPlaying) {
            audio.pause();
            featuredCard.classList.remove('playing');
            return;
        }

        if (activeItem && activeItem !== featuredCard) {
            stopCurrent();
        }

        if (activeItem !== featuredCard) {
            audio.src = featuredSrc;
            activeItem = featuredCard;
            activeIsFeatured = true;
        }

        audio.play().catch(() => {
            console.warn('Could not play:', featuredSrc, '— add the audio file at this path.');
        });
        featuredCard.classList.add('playing');
    });

    featuredProgressTrack.addEventListener('click', (e) => {
        if (activeItem !== featuredCard || !audio.duration) return;
        const rect = featuredProgressTrack.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        audio.currentTime = ratio * audio.duration;
    });

    audio.addEventListener('timeupdate', () => {
        if (activeItem !== featuredCard) return;
        const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
        featuredProgressFill.style.width = pct + '%';
        featuredTime.textContent =
            `${toBengaliDigits(formatTime(audio.currentTime))} / ${toBengaliDigits(formatTime(audio.duration || 0))}`;
    });

    audio.addEventListener('ended', () => {
        if (activeItem === featuredCard) {
            featuredCard.classList.remove('playing');
            featuredProgressFill.style.width = '0%';
        }
    });
});