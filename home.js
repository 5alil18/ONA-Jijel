/**
 * O.N.A JIJEL - Modern Combined JS Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Selectors ---
    const header = document.querySelector('.main-header');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main > section, footer');

    // --- 1. Sticky Navigation on Scroll ---
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Trigger on load in case page is already scrolled

    // --- 2. Mobile Navigation Toggle ---
    const toggleMobileMenu = () => {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.classList.toggle('menu-active'); // Prevent scroll behind menu
    };

    const closeMobileMenu = () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-active');
    };

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburgerBtn.contains(event.target);
        
        if (navMenu.classList.contains('open') && !isClickInsideMenu && !isClickOnHamburger) {
            closeMobileMenu();
        }
    });

    // --- 3. Scroll Active Highlighter ---
    const highlightActiveNav = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 160; // offset header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Special case: if we scrolled to the absolute bottom, activate the contacts/footer link
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            currentSectionId = 'contact';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', highlightActiveNav);
    highlightActiveNav(); // Initial highlight on load
});

// --- 4. Service Accordion Toggle (Global Scope) ---
function toggleService(id) {
    const descElement = document.getElementById(`service-desc-${id}`);
    if (!descElement) return;

    const card = descElement.closest('.service-card');
    if (!card) return;

    const isExpanded = card.classList.toggle('expanded');
    const btnText = card.querySelector('.btn-more .btn-text');

    if (btnText) {
        btnText.textContent = isExpanded ? 'Moins...' : 'Plus...';
    }
}