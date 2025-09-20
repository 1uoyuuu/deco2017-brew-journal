import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const config = {
    duration: 300,
    showMultiple: false,
    collapse: true,
    beforeOpen: (c) => {changeArrow(c)},
    beforeClose: (c) => {changeArrow(c)}
}

const accordion = document.querySelector(".accordion-container");
let accordionInstance = null;

function initializeAccordion() {
    // Destroy existing instance if it exists
    if (accordionInstance) {
        accordionInstance.destroy();
    }
    
    // Create new instance
    accordionInstance = new Accordion('.accordion-container', config);
}

// Initialize on page load
initializeAccordion();

document.addEventListener("DOMContentLoaded", function () {
    //after content fully loaded, then turn on the carousel visibility
    //this helps prevent the image flickering bug when refreshing the page
    accordion.style.visibility = "visible";
});

// Export functions for external use
window.initializeAccordion = initializeAccordion;

function changeArrow(element){
    let button = element.children[0].children[0].children[0].children;
    let arrow = button[button.length-1];
    
    if(arrow.classList.contains("down-arrow")){
        arrow.classList.remove("down-arrow");
        arrow.classList.add("up-arrow");
    }else {
        arrow.classList.add("down-arrow");
        arrow.classList.remove("up-arrow");
    }
}