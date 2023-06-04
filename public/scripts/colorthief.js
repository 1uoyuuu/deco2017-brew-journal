import ColorThief from 'colorthief/dist/color-thief.mjs'

const colorThief = new ColorThief();
//convert rgb array to a hex string
const rgbToHex = ([r,g,b]) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('');


//images with class color-thief-images will set their border based on the dominant color
const imageBorder = document.querySelectorAll(".color-thief-images");

imageBorder.forEach(img => {
    if (img.complete) {
        let col = colorThief.getColor(img,200); 
        //the number above determines the quality, how many pixel it skips, the higher, the fuzzier it gets
        //as we goes for a proximity, so i don't really need a accurate dominant color here, so i increase the quality
        //all the way to 200, means it only runs maybe 2-3 times on an image size of 600-700px
        img.style.borderColor = rgbToHex(col);
    } else {
        image.addEventListener('load', function () {
            colorThief.getColor(img);
        });
    }
});

//images with class color-thief-images-for-bg will be used to set the parent container background color
const imageBackground = document.querySelectorAll(".color-thief-images-for-bg");

imageBackground.forEach(img => {
    if (img.complete) {
        let col = colorThief.getColor(img,200); 
        //the number above determines the quality, how many pixel it skips, the higher, the fuzzier it gets
        //as we goes for a proximity, so i don't really need a accurate dominant color here, so i increase the quality
        //all the way to 200, means it only runs maybe 2-3 times on an image size of 600-700px
        // const infoContainers = document.querySelectorAll(".info-col");
        // infoContainers.forEach(item => item.style.backgroundColor = rgbToHex(col))
        const columnOne = img.parentNode.parentNode;
        const columnTwo = columnOne.nextElementSibling;
        columnTwo.style.backgroundColor = rgbToHex(col);
        columnOne.style.backgroundColor = rgbToHex(col);

        //based on the color it got, it should choose the text color between white or black
        //here is my version of contrast checker with inspiration from: https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
        // the col is an array with three elements [r,g,b];
        var red = col[0];
        var green = col[1];
        var blue = col[2];
        let contrastFlag = (red * 0.299) + (green * 0.587) + (blue * 0.114) > 186 ? true : false;
        //if the contrast > 186, it should use dark color, else light white color
        if(contrastFlag){
            container.classList.add("black-contrast");
        }
    } else {
        image.addEventListener('load', function () {
            colorThief.getColor(img);
        });
    }
});

