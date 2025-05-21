document.addEventListener('DOMContentLoaded', function() {
    // Existing initialization code...
    
    // Dropdown toggle functionality
    const languageDropdown = document.querySelector('.language-dropdown');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    const userDropdown = document.querySelector('.user-dropdown');
    const dropdowns = document.querySelectorAll('.dropdown-menu');

    // Toggle language dropdown
    languageDropdown.addEventListener('click', (event) => {
        const dropdownMenu = languageDropdown.querySelector('.dropdown-menu');
        dropdowns.forEach(menu => {
            if (menu !== dropdownMenu) {
                menu.classList.remove('show'); // Close other dropdowns
            }
        });
        dropdownMenu.classList.toggle('show'); // Toggle the clicked dropdown
        event.stopPropagation(); // Prevent event from bubbling up
    });

    // Toggle notification dropdown
    notificationDropdown.addEventListener('click', (event) => {
        const dropdownMenu = notificationDropdown.querySelector('.notifications-menu');
        dropdowns.forEach(menu => {
            if (menu !== dropdownMenu) {
                menu.classList.remove('show'); // Close other dropdowns
            }
        });
        dropdownMenu.classList.toggle('show'); // Toggle the clicked dropdown
        event.stopPropagation(); // Prevent event from bubbling up
    });

    // Toggle user dropdown
    userDropdown.addEventListener('click', (event) => {
        const dropdownMenu = userDropdown.querySelector('#user-dropdown-menu');
        dropdowns.forEach(menu => {
            if (menu !== dropdownMenu) {
                menu.classList.remove('show'); // Close other dropdowns
            }
        });
        dropdownMenu.classList.toggle('show'); // Toggle the clicked dropdown
        event.stopPropagation(); // Prevent event from bubbling up
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        dropdowns.forEach(menu => {
            menu.classList.remove('show'); // Close all dropdowns
        });
    });
});
