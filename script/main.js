document.addEventListener('DOMContentLoaded', () => {
    // Dynamic glow effect for cards on mouse move
    // Select all types of cards: original home page cards, category cards, and project cards
    const cards = document.querySelectorAll('.card, .category-card, .project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // Extracting RGB values for CSS variables (for dynamic glow)
    const primaryGlowColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-glow');
    const secondaryGlowColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-glow');
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');

    // Function to convert hex to RGB
    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        // Handle #rgb or #rrggbb
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex.substring(1, 3), 16);
            g = parseInt(hex.substring(3, 5), 16);
            b = parseInt(hex.substring(5, 7), 16);
        }
        return `${r}, ${g}, ${b}`;
    }

    // Set RGB values as CSS variables so they can be used in dynamic gradients
    document.documentElement.style.setProperty('--primary-glow-rgb', hexToRgb(primaryGlowColor));
    document.documentElement.style.setProperty('--secondary-glow-rgb', hexToRgb(secondaryGlowColor));
    document.documentElement.style.setProperty('--accent-color-rgb', hexToRgb(accentColor));
});