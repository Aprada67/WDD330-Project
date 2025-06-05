const menu = document.getElementById("menu");
const menuIcon = document.getElementById("menu-icon");
const logo = document.getElementById("logo");

function toogleMenu() {
    // Toogle the menu
    menu.classList.toggle("menu-active");

    // Change the icon to an X
    menuIcon.classList.toggle("open");

    // Menu List
    menu.classList.toggle("menu-list");
}

menuIcon.addEventListener("click", toogleMenu);

// Close the menu when clicks outside
document.addEventListener("click", function(event) {
    if (!menu.contains(event.target) &&  !menuIcon.contains(event.target)) {
        menu.classList.remove("menu-active");
        menuIcon.classList.remove("open");
        menu.classList.remove("menu-list")
    }
});

// Close the menu on link click
document.querySelectorAll("#menu li a").forEach(link => {
    link.addEventListener("click", function() {
        document.getElementById("menu").classList.remove("menu-active");
        document.getElementById("menu").classList.remove("menu-list");
        document.getElementById("menu-icon").classList.remove("open");
    });
});

window.addEventListener("resize", function() {
    if (window.innerWidth >= 768) {
        menu.classList.remove("menu-list");
    } else {
        if (menu.classList.contains("menu-active")) {
            menu.classList.remove("menu-active");
            menuIcon.classList.remove("open");
            menu.classList.remove("menu-list");
        }
    }
});