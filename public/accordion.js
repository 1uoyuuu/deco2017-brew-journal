import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const config = {
    duration: 400,
    showMultiple: true,
    collapse: true
}
new Accordion('.accordion-container', config);