import ColorThief from 'colorthief/dist/color-thief.mjs'

const colorThief = new ColorThief();
//convert rgb array to a hex string
const rgbToHex = ([r,g,b]) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('');

const images = document.querySelectorAll(".color-thief-images");
console.log(images);
images.forEach(img => {
    if (img.complete) {
        let col = colorThief.getColor(img,50);
        img.style.borderColor = rgbToHex(col);
    } else {
        image.addEventListener('load', function () {
            colorThief.getColor(img);
        });
    }
});

