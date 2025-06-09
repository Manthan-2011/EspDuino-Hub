document.addEventListener('DOMContentLoaded', () => {
    // Rating Slider Logic (remains unchanged)
    const ratingSlider = document.getElementById('ratingSlider');
    const starDisplay = document.getElementById('starDisplay');
    const currentRatingSpan = document.getElementById('currentRating');
    const submitRatingButton = document.getElementById('submitRating');

    function updateStars(rating) {
        starDisplay.innerHTML = ''; // Clear existing stars
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            star.classList.add('fas', 'fa-star');
            if (i <= rating) {
                star.classList.add('filled');
            }
            starDisplay.appendChild(star);
        }
        currentRatingSpan.textContent = rating;
    }

    updateStars(ratingSlider.value);

    ratingSlider.addEventListener('input', (event) => {
        const rating = event.target.value;
        updateStars(rating);
    });

    submitRatingButton.addEventListener('click', () => {
        const rating = ratingSlider.value;
        alert(`You rated this project: ${rating} out of 5 stars! (This would typically send data to a server)`);
    });

    // Copy Code Button Logic
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.nextElementSibling; // Assumes <pre><code> is next to the button
            let textToCopy = '';

            if (codeBlock && codeBlock.tagName === 'PRE') {
                textToCopy = codeBlock.textContent || codeBlock.innerText;
            }

            if (textToCopy) {
                // Use the older document.execCommand('copy') for better iFrame compatibility
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => {
                        button.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    alert('Failed to copy code. Please copy manually.');
                }
                document.body.removeChild(textArea);
            } else {
                alert('No code found to copy.');
            }
        });
    });

    // Web Flasher Integration (using esp-web-tools)
    // The esp-web-install-button custom element handles the core logic.
    // We just need to ensure it's present and linked to the correct manifest.
    const espFlashButton = document.getElementById('espFlashButton');
    if (espFlashButton) {
        // We can add event listeners for custom UI feedback if needed,
        // but the esp-web-install-button handles the popup and flashing process internally.
        // For example:
        // espFlashButton.addEventListener('state-changed', (e) => {
        //     console.log('Flasher state changed:', e.detail.state);
        // });
        // espFlashButton.addEventListener('error', (e) => {
        //     console.error('Flasher error:', e.detail.message);
        // });
        console.log("ESP Flash button initialized with manifest:", espFlashButton.manifestUrl);
    }
});

// IMPORTANT: The dynamic glow effect logic from main.js should still be active
// as main.js is also linked on this page. Make sure main.js selects all relevant card types.
// (Already handled in previous main.js update: document.querySelectorAll('.card, .category-card, .project-card');)