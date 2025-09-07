document.addEventListener('DOMContentLoaded', function () {

    // --- 1. Smooth Scrolling for the "Explore Topics" Button ---
    const exploreButton = document.querySelector('.hero-button');
    if (exploreButton) {
        exploreButton.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default jump
            const topicsSection = document.querySelector('#topics');
            if (topicsSection) {
                // Modern, smooth scroll behavior
                topicsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }


    // --- 2. 3D Tilt Effect for Resource Cards ---
    // This uses the vanilla-tilt.js library
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".card"), {
            max: 15,     // Max tilt rotation (degrees)
            speed: 400,  // Speed of the enter/exit transition
            glare: true, // A shiny glare effect
            "max-glare": 0.5 // Glare intensity
        });
    }


    // --- 3. Fade-in Animation on Scroll ---
    // This uses the Intersection Observer API
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When the element is in view, add the 'visible' class
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Select all elements you want to animate
    const elementsToAnimate = document.querySelectorAll('.card, .category');
    // Tell the observer to watch each of them
    elementsToAnimate.forEach(el => {
        el.classList.add('hidden'); // Initially hide the element
        observer.observe(el);
    });


    // --- 4. Dark Mode Toggle Logic ---
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (toggleSwitch) {
                toggleSwitch.checked = true;
            }
        } else {
            document.body.classList.remove('dark-mode');
            if (toggleSwitch) {
                toggleSwitch.checked = false;
            }
        }
    }

    // Check for saved theme in localStorage on page load
    if (currentTheme) {
        setTheme(currentTheme);
    }

    // Listen for toggle switch clicks
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function (e) {
            if (e.target.checked) {
                localStorage.setItem('theme', 'dark');
                setTheme('dark');
            } else {
                localStorage.setItem('theme', 'light');
                setTheme('light');
            }
        });
    }

});

// --- 6. Animated "View more/less" Button Logic ---
const viewMoreBtn = document.getElementById('viewMoreBtn');
if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', function () {
        const hiddenCategories = document.querySelectorAll('.hidden-category');

        // Check if the categories are currently expanded or not
        const isExpanded = viewMoreBtn.textContent === 'View less';

        if (isExpanded) {
            // --- If Expanded, COLLAPSE them ---
            hiddenCategories.forEach(category => {
                category.classList.remove('is-visible');
            });
            viewMoreBtn.textContent = 'View more';

            // Optional: Scroll the user back to the button smoothly
            viewMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } else {
            // --- If Collapsed, EXPAND them ---
            hiddenCategories.forEach(category => {
                category.classList.add('is-visible');
            });
            viewMoreBtn.textContent = 'View less';
        }
    });
}