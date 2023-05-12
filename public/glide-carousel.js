import Glide from '@glidejs/glide';

const config = {
    type: 'carousel',
    startAt: 0,
    perView: 3,
    autoplay: 3000, //autoplay the carousel every 2 seconds
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
new Glide('.glide', config).mount();