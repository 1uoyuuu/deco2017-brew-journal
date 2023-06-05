import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const config = {
    duration: 400,
    showMultiple: true,
    collapse: true,
    beforeOpen: (c) => {changeArrow(c)},
    beforeClose: (c) => {changeArrow(c)}
}
new Accordion('.accordion-container', config);


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