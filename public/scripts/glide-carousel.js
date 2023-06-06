import Glide from '@glidejs/glide';

const config = {
    type: 'slider',
    rewind: true,
    startAt: 0,
    perView: 3,
    autoplay: false, //autoplay the carousel every 2 seconds
    gap: 20, //A size of the gap added between slides.
    breakpoints: {
        1024: {
            perView: 2,
            gap: 10
        },
        600: {
            perView: 1
        }
    }

}

const carousel = document.querySelector(".glide");
const glide = new Glide('.glide', config);

document.addEventListener("DOMContentLoaded", function () {
    //after content fully loaded, then turn on the carousel visibility
    //this helps prevent the image flickering bug when refreshing the page
    carousel.style.visibility = "visible";
    glide.mount();
});



