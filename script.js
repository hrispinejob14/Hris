// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to the HTML elements we need to interact with
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a'); // Get all links within the mobile menu
    const body = document.body;

    // Function to toggle the menu's active state
    function toggleMenu() {
        hamburger.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-active');
        body.classList.toggle('no-scroll'); // Prevents scrolling when menu is open
    }

    // Add a click event listener to the hamburger icon
    hamburger.addEventListener('click', toggleMenu);

    // Add click event listeners to each link in the mobile menu
    // This makes the menu close automatically when a user clicks a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if the menu is active before trying to close it
            if (mobileMenu.classList.contains('is-active')) {
                toggleMenu();
            }
        });
    });

});
