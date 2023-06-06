let menu = document.getElementById("menu");
const overlay = document.querySelector(".overlay");
menu.addEventListener("click", ()=> {
    
    if(!overlay.classList.contains("open")){
        overlay.classList.add("open");
        menu.innerHTML = "CLOSE";
    }else{
        overlay.classList.remove("open");
        menu.innerHTML = "MENU";
    }
});

let overlayOptions = document.querySelectorAll("#overlay-menu a");
overlayOptions.forEach(btn => {
    btn.addEventListener("click", ()=>{
        overlay.classList.remove("open");
    });
});


//smart sticky navigation bar with accessibility concern by Jemima Abu 
//tutorial from https://css-tricks.com/creating-a-smart-navbar-with-vanilla-javascript/
const nav = document.querySelector("#top-nav");
const supportPageOffset = window.pageXOffset !== undefined;
const isCSS1Compat = (document.compatMode || "") === "CSS1Compat";

let previousScrollPosition = 0;

const isScrollingDown = () => {
    let scrolledPosition = supportPageOffset ?
        window.pageYOffset :
        isCSS1Compat ?
        document.documentElement.scrollTop :
        document.body.scrollTop;
    let isScrollDown;

    if (scrolledPosition > previousScrollPosition) {
        isScrollDown = true;
    } else {
        isScrollDown = false;
    }
    previousScrollPosition = scrolledPosition;
    return isScrollDown;
};

const handleNavScroll = () => {
    if (isScrollingDown() && !nav.contains(document.activeElement)) {
        nav.classList.add("scroll-down");
        nav.classList.remove("scroll-up");
    } else {
        nav.classList.add("scroll-up");
        nav.classList.remove("scroll-down");
    }
};

var throttleTimer;

const throttle = (callback, time) => {
    if (throttleTimer) return;

    throttleTimer = true;
    setTimeout(() => {
        callback();
        throttleTimer = false;
    }, time);
};

const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

window.addEventListener("scroll", () => {
    if (mediaQuery && !mediaQuery.matches) {
        throttle(handleNavScroll, 100);
    }
});