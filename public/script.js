// define the class Coffee to better organise the data (I'm more used to work with OOP)
class Coffee {
    constructor(name, type, roastLevel, roastDate, roaster, process, origin, weight, price, flavour) {
        //attributes of basic information
        this.id = Date.now();
        this.name = name; //String
        this.type = type; //String
        this.process = process; //String
        this.price = price; //Number
        this.weight = weight; //Number
        this.flavour = flavour; //String
        //attributes related to roaster
        this.roastLevel = roastLevel; //String
        this.roastDate = roastDate; //String(date)
        this.roaster = roaster; //Object Roaster
        //attributes related to origin
        this.origin = origin; //Object Origin
    }
}
// define class Origin and class Roaster to store relevant information
class Roaster {
    constructor(name, country) {
        this.name = name; //String
        this.country = country; //String
    }
}
class Origin {
    constructor(country, region, farm, producer, elevation, varietal) {
        this.country = country; //String
        this.region = region; //String
        this.farm = farm; //String
        this.producer = producer; //String
        this.elevation = elevation; //Number
        this.varietal = varietal; //String
    }
}
class Dripper {
    constructor(name, material, brand) {
        this.id = Date.now();
        this.name = name;
        this.material = material;
        this.brand = brand;
    }
    toJSON() {
		return {
			type: "Dripper",
			name: this.name,
			material: this.material,
            brand: this.brand,
            id: this.id
		};
    }
}
class Grinder {
    constructor(name, burr, brand) {
        this.id = Date.now();
        this.name = name;
        this.burr = burr;
        this.brand = brand;
    }
    toJSON() {
		return {
			type: "Grinder",
			name: this.name,
			burr: this.burr,
            brand: this.brand,
            id: this.id
		};
    }
}

class Brew {
    constructor(coffee,image,dripper,grinder,grinderSetting,recipe,waterTemperature,coffeeAmount,waterAmount,timeMinute,timeSecond,bloomTime,beverageAmount,tastingNote, rating, note){
        this.id = Date.now();
        this.date = new Date().toLocaleDateString(); //generate today's date with the dd/mm/yyyy format
        this.coffee = coffee; //store the coffee Object
        this.image = image;
        this.dripper = dripper.name; //only retrieve the dripper name
        this.grinder = grinder.name; //same for grinder
        this.grinderSetting = grinderSetting=== "" ? "Not Set" : grinderSetting; //string
        this.recipe = recipe; //string(url)
        this.waterTemperature = waterTemperature;
        this.coffeeAmount = Number(coffeeAmount);
        this.waterAmount = Number(waterAmount);
        this.ratio = Math.round(waterAmount/coffeeAmount);
        this.beverageAmount = beverageAmount=== ""  ? "Not Recorded" : `${beverageAmount} Grams`;
        this.timeMinute = timeMinute;
        this.timeSecond = timeSecond;
        this.bloomTime = bloomTime;
        this.rating = rating;
        this.tastingNote = tastingNote;
        this.note = note;

    }
}

const setUnknown = value => value === "" ? "Unknown" : value.trim();

//for number input, if it is optional and user omits it, then set it at 0 by default
const setZero = value => value === "" ? 0 : value;
// the first form is adding coffee
// here I will set up variables for HTML elements with DOM selection
let coffeeForm = document.getElementById("coffee-form");
let gadgetForm = document.getElementById("gadget-form");
let brewForm = document.getElementById("brew-form");
// setup localstorage to store the all the informations
// if there is no such element, create a new array
// there will be three parts of information stored in the local storage
// they are coffees, gadgets(drippers,grinders), brews
let coffeeArray = [];
let dripperArray = [];
let grinderArray = [];
let brewArray = [];
let coffeeImageArray = [];
let grinderImageArray = [];
let dripperImageArray = [];

//----------------------------------------- TESTING IMAGES ----------------------------------------
// Image URLs will be set after DOM is loaded
let coffee1, coffee2, coffee3, dripperOrigami, dripperV60, dripperOrea, grinderC40, grinderEK43, grinderKinu;

// Function to get bundled image URLs - ONLY use served images, no fallbacks
function getImageUrls() {
    console.log('Getting image URLs...');
    
    // Find images in the DOM
    const allImages = document.querySelectorAll('img');
    console.log('All images found:', allImages.length);
    
    // Debug: log all image sources to see what we're working with
    allImages.forEach((img, index) => {
        console.log(`Image ${index}:`, img.src);
    });
    
    // Create a map of filename patterns to actual URLs
    const imageMap = {};
    allImages.forEach(img => {
        const src = img.src;
        if (src.includes('coffee-1')) imageMap.coffee1 = src;
        if (src.includes('coffee-2')) imageMap.coffee2 = src;
        if (src.includes('coffee-3')) imageMap.coffee3 = src;
        if (src.includes('dripper-origami')) imageMap.dripperOrigami = src;
        if (src.includes('dripper-v60')) imageMap.dripperV60 = src;
        if (src.includes('dripper-orea')) imageMap.dripperOrea = src;
        if (src.includes('grinder-c40')) imageMap.grinderC40 = src;
        if (src.includes('grinder-ek43')) imageMap.grinderEK43 = src;
        if (src.includes('grinder-kinu')) imageMap.grinderKinu = src;
    });
    
    console.log('Image map from DOM:', imageMap);
    
    // ONLY use the bundled URLs found in DOM - NO FALLBACKS
    // If not found, the images will be undefined and won't be used
    coffee1 = imageMap.coffee1;
    coffee2 = imageMap.coffee2;
    coffee3 = imageMap.coffee3;
    dripperOrigami = imageMap.dripperOrigami;
    dripperV60 = imageMap.dripperV60;
    dripperOrea = imageMap.dripperOrea;
    grinderC40 = imageMap.grinderC40;
    grinderEK43 = imageMap.grinderEK43;
    grinderKinu = imageMap.grinderKinu;
    
    console.log('Final image URLs (ONLY served images):', {
        coffee1, coffee2, coffee3, 
        dripperOrigami, dripperV60, dripperOrea,
        grinderC40, grinderEK43, grinderKinu
    });
}

//----------------------------------------- INITIALIZE DEFAULT SAMPLE DATA ----------------------------------------
function initializeDefaultData() {
    // Check if sample data has already been initialized
    const sampleDataInitialized = localStorage.getItem('sampleDataInitialized');
    if (sampleDataInitialized === 'true') {
        // Load existing data from localStorage
        coffeeArray = localStorage.getItem('coffees') ? JSON.parse(localStorage.getItem('coffees')) : [];
        dripperArray = localStorage.getItem('drippers') ? JSON.parse(localStorage.getItem('drippers')) : [];
        grinderArray = localStorage.getItem('grinders') ? JSON.parse(localStorage.getItem('grinders')) : [];
        brewArray = localStorage.getItem('brews') ? JSON.parse(localStorage.getItem('brews')) : [];
        coffeeImageArray = localStorage.getItem('coffeeImages') ? JSON.parse(localStorage.getItem('coffeeImages')) : [];
        grinderImageArray = localStorage.getItem('grinderImages') ? JSON.parse(localStorage.getItem('grinderImages')) : [];
        dripperImageArray = localStorage.getItem('dripperImages') ? JSON.parse(localStorage.getItem('dripperImages')) : [];
        
        // Don't return early - continue to update global arrays at the end
    } else {
    
    // Load existing data from localStorage first
    coffeeArray = localStorage.getItem('coffees') ? JSON.parse(localStorage.getItem('coffees')) : [];
    dripperArray = localStorage.getItem('drippers') ? JSON.parse(localStorage.getItem('drippers')) : [];
    grinderArray = localStorage.getItem('grinders') ? JSON.parse(localStorage.getItem('grinders')) : [];
    brewArray = localStorage.getItem('brews') ? JSON.parse(localStorage.getItem('brews')) : [];
    coffeeImageArray = localStorage.getItem('coffeeImages') ? JSON.parse(localStorage.getItem('coffeeImages')) : [];
    grinderImageArray = localStorage.getItem('grinderImages') ? JSON.parse(localStorage.getItem('grinderImages')) : [];
    dripperImageArray = localStorage.getItem('dripperImages') ? JSON.parse(localStorage.getItem('dripperImages')) : [];
    
    // Ensure flavour data is properly formatted as arrays
    coffeeArray.forEach(coffee => {
        if (typeof coffee.flavour === 'string') {
            coffee.flavour = coffee.flavour.split(',').map(f => f.trim());
        }
    });
    
    // Only add default data if arrays are empty (first time user)
    if (coffeeArray.length === 0) {
        // Add sample coffee data from README
        const sampleCoffees = [
            {
                id: Date.now() + 1,
                name: "Fruity Bomb",
                type: "Single Origin",
                process: "Carbonic Maceration",
                price: 30,
                weight: 250,
                flavour: ["Strawberry", "Cream", "Mango"],
                roastLevel: "Extra Light",
                roastDate: "2024-01-15",
                roaster: { name: "Standout", country: "Sweden" },
                origin: { country: "Colombia", region: "Cauca", farm: "El Paraiso", producer: "", elevation: 0, varietal: "Castillo" }
            },
            {
                id: Date.now() + 2,
                name: "Gundam Blend",
                type: "Blend",
                process: "Natural",
                price: 22,
                weight: 250,
                flavour: ["Apricot", "Rasberry jam", "French earl gray"],
                roastLevel: "Medium",
                roastDate: "2024-01-20",
                roaster: { name: "Sleepy Bloc", country: "Australia" },
                origin: { country: "Brazil", region: "", farm: "Sitio Melado", producer: "Señor Fonseca", elevation: 0, varietal: "Mundo Novo" }
            },
            {
                id: Date.now() + 3,
                name: "Daye Bensa",
                type: "Single Origin",
                process: "Natural Anaerobic",
                price: 25,
                weight: 75,
                flavour: ["Mango", "Kiwi", "Strawberry", "Floral"],
                roastLevel: "Light",
                roastDate: "2024-01-25",
                roaster: { name: "Jibbi Little", country: "Australia" },
                origin: { country: "Ethiopia", region: "Sidamo", farm: "", producer: "", elevation: 0, varietal: "Heirloom" }
            }
        ];
        
        coffeeArray = sampleCoffees;
        localStorage.setItem('coffees', JSON.stringify(coffeeArray));
        
        // Add real testing images for sample coffees
        const sampleCoffeeImages = [
            coffee1,
            coffee2,
            coffee3
        ];
        
        coffeeImageArray = sampleCoffeeImages;
        localStorage.setItem('coffeeImages', JSON.stringify(coffeeImageArray));
        
        console.log('Coffee images initialized:', sampleCoffeeImages);
        console.log('Individual image values:', { coffee1, coffee2, coffee3 });
    }
    
    if (dripperArray.length === 0) {
        // Add sample dripper data from README
        const sampleDrippers = [
            {
                id: Date.now() + 10,
                type: "Dripper",
                name: "Origami",
                material: "Ceramic",
                brand: "Fellow"
            },
            {
                id: Date.now() + 11,
                type: "Dripper", 
                name: "V60",
                material: "Metal",
                brand: "Hario"
            },
            {
                id: Date.now() + 12,
                type: "Dripper",
                name: "Orea V3",
                material: "Plastic", 
                brand: "Orea"
            }
        ];
        
        dripperArray = sampleDrippers;
        localStorage.setItem('drippers', JSON.stringify(dripperArray));
        
        // Add real testing images for sample drippers
        const sampleDripperImages = [
            dripperOrigami,
            dripperV60,
            dripperOrea
        ];
        
        dripperImageArray = sampleDripperImages;
        localStorage.setItem('dripperImages', JSON.stringify(dripperImageArray));
    }
    
    if (grinderArray.length === 0) {
        // Add sample grinder data from README
        const sampleGrinders = [
            {
                id: Date.now() + 20,
                type: "Grinder",
                name: "C40",
                burr: "Conical",
                brand: "Comandante"
            },
            {
                id: Date.now() + 21,
                type: "Grinder",
                name: "EK43",
                burr: "Flat",
                brand: "Mahlkonic"
            },
            {
                id: Date.now() + 22,
                type: "Grinder",
                name: "MK47",
                burr: "Conical",
                brand: "Kinu"
            }
        ];
        
        grinderArray = sampleGrinders;
        localStorage.setItem('grinders', JSON.stringify(grinderArray));
        
        // Add real testing images for sample grinders
        const sampleGrinderImages = [
            grinderC40,
            grinderEK43,
            grinderKinu
        ];
        
        grinderImageArray = sampleGrinderImages;
        localStorage.setItem('grinderImages', JSON.stringify(grinderImageArray));
    }
    
        // Mark that sample data has been initialized
        localStorage.setItem('sampleDataInitialized', 'true');
    }
    
    // Update global arrays with the latest data from localStorage (for both cases)
    coffeeArray = JSON.parse(localStorage.getItem('coffees')) || [];
    dripperArray = JSON.parse(localStorage.getItem('drippers')) || [];
    grinderArray = JSON.parse(localStorage.getItem('grinders')) || [];
    coffeeImageArray = JSON.parse(localStorage.getItem('coffeeImages')) || [];
    dripperImageArray = JSON.parse(localStorage.getItem('dripperImages')) || [];
    grinderImageArray = JSON.parse(localStorage.getItem('grinderImages')) || [];
    
}

// Function to apply color thief effects to dynamically added images
function applyColorThiefEffects() {
    // Import ColorThief directly
    import('colorthief/dist/color-thief.mjs').then(ColorThief => {
        const colorThief = new ColorThief.default();
        
        // Apply effects to color-thief-images
        const imageBorder = document.querySelectorAll(".color-thief-images");
        imageBorder.forEach(img => {
            if (img.complete) {
                let col = colorThief.getColor(img, 200);
                img.style.borderColor = rgbToHex(col);
            } else {
                img.addEventListener('load', function () {
                    let col = colorThief.getColor(img, 200);
                    img.style.borderColor = rgbToHex(col);
                });
            }
        });
        
        // Apply effects to color-thief-images-for-bg
        const imageBackground = document.querySelectorAll(".color-thief-images-for-bg");
        imageBackground.forEach(img => {
            if (img.complete) {
                let col = colorThief.getColor(img, 200);
                const columnOne = img.parentNode.parentNode;
                const columnTwo = columnOne.nextElementSibling;
                columnTwo.style.backgroundColor = rgbToHex(col);
                columnOne.style.backgroundColor = rgbToHex(col);
                
                // Apply contrast logic
                var red = col[0];
                var green = col[1];
                var blue = col[2];
                let contrastFlag = (red * 0.299) + (green * 0.587) + (blue * 0.114) > 186 ? true : false;
                if(contrastFlag){
                    columnOne.classList.add("black-contrast");
                    columnTwo.classList.add("black-contrast");
                } else {
                    columnOne.classList.remove("black-contrast");
                    columnTwo.classList.remove("black-contrast");
                }
            } else {
                img.addEventListener('load', function () {
                    let col = colorThief.getColor(img, 200);
                    const columnOne = img.parentNode.parentNode;
                    const columnTwo = columnOne.nextElementSibling;
                    columnTwo.style.backgroundColor = rgbToHex(col);
                    columnOne.style.backgroundColor = rgbToHex(col);
                    
                    var red = col[0];
                    var green = col[1];
                    var blue = col[2];
                    let contrastFlag = (red * 0.299) + (green * 0.587) + (blue * 0.114) > 186 ? true : false;
                    if(contrastFlag){
                        columnOne.classList.add("black-contrast");
                        columnTwo.classList.add("black-contrast");
                    } else {
                        columnOne.classList.remove("black-contrast");
                        columnTwo.classList.remove("black-contrast");
                    }
                });
            }
        });
    });
}

// Helper function for RGB to hex conversion
function rgbToHex([r,g,b]) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('');
}


// Function to re-initialize the carousel after adding new content
function reinitializeCarousel() {
    const carousel = document.querySelector(".glide");
    const carouselList = document.querySelector("#gadget-carousel");
    
    
    if (carousel && carouselList) {
        // Keep carousel hidden during initialization
        carousel.style.visibility = "hidden";
        
        // Import Glide and re-initialize
        import('@glidejs/glide').then(Glide => {
            // Destroy existing carousel if it exists
            if (window.glideInstance) {
                window.glideInstance.destroy();
            }
            
            // Create new carousel instance
            const config = {
                type: 'slider',
                rewind: true,
                startAt: 0,
                perView: 3,
                autoplay: false,
                gap: 20,
                breakpoints: {
                    1024: {
                        perView: 2,
                        gap: 10
                    },
                    600: {
                        perView: 1
                    }
                }
            };
            
            window.glideInstance = new Glide.default('.glide', config);
            window.glideInstance.mount();
            
            // Only make visible after carousel is fully initialized
            setTimeout(() => {
                carousel.style.visibility = "visible";
            }, 100);
            
        }).catch(error => {
            console.error('Error re-initializing carousel:', error);
            // Make visible even if there's an error
            carousel.style.visibility = "visible";
        });
    }
}

// Wait for DOM to be loaded, then initialize
document.addEventListener('DOMContentLoaded', function() {
    
    // Get the bundled image URLs
    getImageUrls();
    
    // Initialize default data
    initializeDefaultData();
    
    // Update the UI after initialization
    updateCoffeeSection();
    updateGadgetSection();
    updateBrewSection();
    updateStatistics();
    
    // Also update brew form selects in case dialog is already open
    updateBrewFormSelect();
    
    // Apply color thief effects and re-initialize carousel after UI updates
    setTimeout(() => {
        applyColorThiefEffects();
        // Only initialize carousel if there's content
        const carouselList = document.querySelector("#gadget-carousel");
        if (carouselList && carouselList.children.length > 0) {
            reinitializeCarousel();
        } else {
            // Hide carousel when empty
            const carousel = document.querySelector(".glide");
            if (carousel) {
                carousel.style.visibility = "hidden";
            }
        }
    }, 200);
});

// Also try immediate execution as fallback
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded
    getImageUrls();
    initializeDefaultData();
    updateCoffeeSection();
    updateGadgetSection();
    updateBrewSection();
    updateStatistics();
    
    // Also update brew form selects in case dialog is already open
    updateBrewFormSelect();
    
    // Apply color thief effects and re-initialize carousel
    setTimeout(() => {
        applyColorThiefEffects();
        // Only initialize carousel if there's content
        const carouselList = document.querySelector("#gadget-carousel");
        if (carouselList && carouselList.children.length > 0) {
            reinitializeCarousel();
        } else {
            // Hide carousel when empty
            const carousel = document.querySelector(".glide");
            if (carousel) {
                carousel.style.visibility = "hidden";
            }
        }
    }, 100);
}

// Debug function to clear localStorage and refresh (for testing)
window.clearAndRefresh = function() {
    localStorage.clear();
    location.reload();
}

// Function to reset sample data initialization (for testing)
window.resetSampleData = function() {
    localStorage.removeItem('sampleDataInitialized');
    location.reload();
};

// Function to test brew form dropdowns
window.testBrewDropdowns = function() {
    console.log('Testing brew dropdowns...');
    console.log('Current arrays:', {
        coffeeArray: coffeeArray,
        dripperArray: dripperArray,
        grinderArray: grinderArray
    });
    updateBrewFormSelect();
};


//----------------------------------------- UPDATE LOCAL STORAGE VALUES ----------------------------------------
//sending data to the localstorage after submitting the form
coffeeForm.addEventListener("submit", event => {
    //prevent the defualt action of submitting the form
    event.preventDefault();

    //validate all the inputs to be valid before submission
    //as validation already been done once in the msf-control.js, so here just want to make sure the value
    //satisfy our specific format
    //retrieve all the input from the coffee form and create a new new coffee object

    //for those user input text, perform a trim() to avoid unnecessary white space
    let roaster = new Roaster(
        coffeeForm.elements.roasterName.value.trim(), //required
        coffeeForm.elements.roasterCountry.value, //required
    );
    //if user doesn't fill in optional value, make it as unknown
    let origin = new Origin(
        coffeeForm.elements.originCountry.value.trim(), //required
        setUnknown(coffeeForm.elements.originRegion.value),
        setUnknown(coffeeForm.elements.originFarm.value),
        setUnknown(coffeeForm.elements.producerName.value),
        setZero(coffeeForm.elements.elevation.value),
        setUnknown(coffeeForm.elements.varietal.value)
    );
    //extract the tags from the tagify input and turn into a array of string
    let flavours = JSON.parse(document.getElementById("coffeeFlavour").value).map(tag => tag.value.trim().toLowerCase());

    let newCoffee = new Coffee(
        coffeeForm.elements.coffeeName.value.trim(), //required
        coffeeForm.elements.coffeeType.value, //required
        coffeeForm.elements.roastLevel.value.trim(), //required
        //the default will generate yyyy-mm-dd, but we here at australia prefer dd--mm--yyyy
        //this simple one line function will help reverse the date
        coffeeForm.elements.roastDate.value.split("-").reverse().join("/"), //required
        roaster, //reqruied
        coffeeForm.elements.processingMethod.value.trim(), //required
        origin, //reqruied
        setZero(coffeeForm.elements.coffeeWeight.value),
        setZero(coffeeForm.elements.coffeePrice.value),
        flavours //array of strings
    );
    //store the image inside the local storage
    getBase64(coffeeForm.elements.coffeeImage.files[0],e=>{
        coffeeImageArray.push(e);
        localStorage.setItem('coffeeImages', JSON.stringify(coffeeImageArray));
    });


    //push the new added coffee into localstorage
    coffeeArray.push(newCoffee);
    localStorage.setItem('coffees', JSON.stringify(coffeeArray));
    //reset the form
    coffeeForm.reset();

    //refresh the webpage when the form is submitted, this will make sure all the images display correctly
    //without refreshing, there have been several bugs such as the carousel out of height, the image wont show
    //adding refresh function here prevents all these bugs i encountered
    window.location.reload();

});
gadgetForm.addEventListener("submit", event => {
    event.preventDefault();

    if (gadgetForm.elements.gadgetType.value === "Grinder") {
        let newGrinder = new Grinder(
            gadgetForm.elements.grinderName.value,
            setUnknown(gadgetForm.elements.burrType.value),
            setUnknown(gadgetForm.elements.grinderBrand.value));
        getBase64(gadgetForm.elements.grinderImage.files[0],e=>{
            grinderImageArray.push(e);
            localStorage.setItem('grinderImages', JSON.stringify(grinderImageArray));
        });
        grinderArray.push(newGrinder);
        localStorage.setItem('grinders', JSON.stringify(grinderArray));
    } else if (gadgetForm.elements.gadgetType.value === "Dripper") {
        let newDripper = new Dripper(
            gadgetForm.elements.dripperName.value,
            setUnknown(gadgetForm.elements.dripperMaterial.value),
            setUnknown(gadgetForm.elements.dripperBrand.value),
            gadgetForm.elements.dripperImage.files[0]);

        getBase64(gadgetForm.elements.dripperImage.files[0],e=>{
                dripperImageArray.push(e);
                localStorage.setItem('dripperImages', JSON.stringify(dripperImageArray));
            });
        dripperArray.push(newDripper);
        localStorage.setItem('drippers', JSON.stringify(dripperArray));
    }
    //same here, after submitting the form successfully, reset the form and refresh the page
    gadgetForm.reset();
    window.location.reload();
});
brewForm.addEventListener("submit", event => {
    event.preventDefault();
    //as the raw input from html form are all string, we need to parse it into number first
    let coffeeID = Number(brewForm.elements.brewCoffee.value);
    let dripperID = Number(brewForm.elements.brewDripper.value);
    let grinderID = Number(brewForm.elements.brewGrinder.value);
    let coffee = coffeeArray.find(element => element.id === coffeeID);
    let dripper = dripperArray.find(element => element.id === dripperID);
    let grinder = grinderArray.find(element => element.id === grinderID);

    let tastingNote = JSON.parse(document.getElementById("tastingNote").value).map(tag => tag.value.trim().toLowerCase());

    let newBrew = new Brew(coffee,
        coffeeArray.findIndex(e => e.id === coffeeID), // the image index
        dripper,
        grinder,
        brewForm.elements.grinderSetting.value,
        brewForm.elements.recipeLink.value,
        brewForm.elements.brewTemperature.value,
        brewForm.elements.coffeeAmount.value,
        brewForm.elements.waterAmount.value,
        brewForm.elements.brewMinute.value,
        brewForm.elements.brewSecond.value,
        brewForm.elements.bloomTime.value,
        brewForm.elements.beverageAmount.value,
        tastingNote,
        parseFloat(brewForm.elements.rating.value).toFixed(1),
        brewForm.elements.note.value
        );
    brewArray.push(newBrew);
    localStorage.setItem('brews', JSON.stringify(brewArray));
    //reset the form
    brewForm.reset();
    window.location.reload(true);
});


//----------------------------------------- DIALOG EVENT LISTENERS ----------------------------------------
// Add event listener for when brew form dialog is opened
document.addEventListener('DOMContentLoaded', function() {
    // Listen for when the brew dialog is shown
    const brewDialog = document.getElementById('add-brew-dialog');
    if (brewDialog) {
        // Use MutationObserver to detect when dialog becomes visible
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
                    if (brewDialog.getAttribute('aria-hidden') === 'false') {
                        console.log('Brew dialog opened - updating dropdowns');
                        updateBrewFormSelect();
                    }
                }
            });
        });
        
        observer.observe(brewDialog, {
            attributes: true,
            attributeFilter: ['aria-hidden']
        });
    }
});

//----------------------------------------- RENDER CONTENT ON WEBPAGE ----------------------------------------

//this two event listener will keep webpage at the same potion after refreshing
//it is using sessionStorage, solution from: https://stackoverflow.com/questions/17642872/refresh-page-and-keep-scroll-position
document.addEventListener("DOMContentLoaded", function (event) {
    var scrollpos = sessionStorage.getItem('scrollpos');
    if (scrollpos) {
        window.scrollTo(0, scrollpos);
        sessionStorage.removeItem('scrollpos');
    }
});

window.addEventListener("beforeunload", function (e) {
    sessionStorage.setItem('scrollpos', window.scrollY);
});

//---------------------- INITIALIZE AND UPDATE CONTENT ----------------------
// Sections are now updated after images are loaded in the loadImages().then() block above

//---------------------- DELETE FUNCTION ----------------------
// Use event delegation to handle dynamically added delete buttons
document.addEventListener("click", e => {
    // Check if the clicked element is a delete button
    if (e.target && e.target.name === 'delete') {
        const btn = e.target;
        //traverse all the item array
        //try to find the item with the same id with the delete button
        if(dripperArray !== null) {
            dripperArray.forEach((item,index) => {
                if(item.id === parseInt(btn.id)){
                    //once it finds the corresponding item
                    //use splice to remove the item
                    dripperArray.splice(index,1);
                    dripperImageArray.splice(index,1);
                    //update the local storage
                    localStorage.setItem('drippers', JSON.stringify(dripperArray));
                    localStorage.setItem('dripperImages', JSON.stringify(dripperImageArray));

                    // Update UI without reload
                    updateGadgetSection();
                    updateStatistics();
                    //once it finds the item, no need to iterate, just return
                    return;
                }
            });
        }
        if(grinderArray !== null) {
            grinderArray.forEach((item,index) => {
                //notice here the item.id is a number, where the btn.id is a string
                //so solution here is either parse the btn.id into a number or use == which will convert the type automatically
                if(item.id === parseInt(btn.id)){
                    //once it finds the corresponding item
                    //use splice to remove the item
                    grinderArray.splice(index,1);
                    grinderImageArray.splice(index,1);
                    //update the local storage
                    localStorage.setItem('grinders', JSON.stringify(grinderArray));
                    localStorage.setItem('grinderImages', JSON.stringify(grinderImageArray));

                    // Update UI without reload
                    updateGadgetSection();
                    updateStatistics();
                    return

                }
            })
        }
        if(coffeeArray !== null){
            coffeeArray.forEach((item,index) => {
                //notice here the item.id is a number, where the btn.id is a string
                //so solution here is either parse the btn.id into a number or use == which will convert the type automatically
                if(item.id === parseInt(btn.id)){
                    //once it finds the corresponding item
                    //use splice to remove the item
                    coffeeArray.splice(index,1);
                    coffeeImageArray.splice(index,1);
                    //update the local storage
                    localStorage.setItem('coffees', JSON.stringify(coffeeArray));
                    localStorage.setItem('coffeeImages', JSON.stringify(coffeeImageArray));

                    // Update UI without reload
                    updateCoffeeSection();
                    updateStatistics();
                    return

                }
            })
        };
        if (brewArray !== null){
            brewArray.forEach((item,index) => {
                if(item.id === parseInt(btn.id)){
                    brewArray.splice(index,1);

                    localStorage.setItem('brews', JSON.stringify(brewArray));

                    // Update UI without reload
                    updateBrewSection();
                    updateStatistics();
                    return
                }
            });
        }
    }
});


function updateStatistics() {
    const statNumbers = document.querySelectorAll(".stat-number");
    let coffeeStat = coffeeArray.length;
    let gadgetStat = dripperArray.length + grinderArray.length;
    let brewStat = brewArray.length;
    let originCountry = [];
    let roasterCountry = [];
    let moneyStat = 0;
    coffeeArray.forEach(item => {
        if(!originCountry.includes(item.origin.country)) {originCountry.push(item.origin.country);}
        if(!roasterCountry.includes(item.roaster.country)){roasterCountry.push(item.roaster.country);}
        moneyStat += Number(item.price);
    });
    let originStat = originCountry.length;
    let roasterStat = roasterCountry.length;

    statNumbers.forEach((stat,index) => {
        stat.innerHTML = "0"; //initialise all the item with number 0
        //assign values to different statistics
        if(index === 0) stat.innerHTML = coffeeStat;
        else if (index === 1) stat.innerHTML = roasterStat;
        else if (index === 2) stat.innerHTML = originStat;
        else if (index === 3) stat.innerHTML = brewStat;
        else if (index === 4) stat.innerHTML = `$${moneyStat}`;

    });

}
//update the html content based on the local storage 
function updateCoffeeSection() {
    const coffeeList = document.querySelector("#coffee-list > ul");
    const coffeeInfo = document.querySelector("#coffee-info");
    //reset the content in the coffeeList
    //this will prevent the repetition of writing content into html
    //as we go through all the index of the localstorage obejct everytime we call it
    coffeeList.innerHTML = "";
    coffeeInfo.innerHTML = `<p id="hint-text">Here’s a list of all the coffee you have added so far. Click on any of them
    to reminisce about
    your favourite cup.</p>`;

    // Retrieve the coffee array from localStorage
    let coffees = JSON.parse(localStorage.getItem('coffees'));

    // iterate through all the coffee entries when it's not null
    if (coffees !== null) {
        coffees.forEach((coffee,index) => {
            let item = createCoffeeListItem(coffee);
            let description = createCoffeeDescription(coffee,index);

            coffeeList.prepend(item);
            coffeeInfo.prepend(description);
        });
    };
    toggleDisplay();


    // Apply color thief effects to newly added images
    setTimeout(() => {
        applyColorThiefEffects();
    }, 50);

};

// when user click on each coffee item, a full description will be shown on the left
// using setTimeout to achieve smooth animation, between display none to block
function toggleDisplay() {
    // select all the coffee list items
    const coffeeItems = document.querySelectorAll("a.coffee-item");
    // select all the corresponding info descriptions
    const coffeeInfos = document.querySelectorAll(".coffee-item-info");

    // select the hint text displayed at initial state
    const hintText = document.querySelector("#hint-text");
    // they correspond into pairs
    coffeeInfos.forEach(item => item.classList.add("is-hidden"));

    for (let i = 0; i < coffeeItems.length; i++) {
        coffeeItems[i].addEventListener("click", event => {
            //hide the hint text as well, if a coffee item is clicked
            if (!hintText.classList.contains("is-hidden")) {
                hintText.classList.add("is-hidden");
            }
            //hide all the coffee-info-items 
            coffeeInfos.forEach(item => item.classList.add("is-hidden"));
            //only display the item that is being clicked
            //only display the item that is being clicked
            coffeeInfos.forEach((item, index) => {
                if (index === i) {
                    item.style.display = "flex";
                    window.setTimeout(function () {
                        item.style.opacity = 1;
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = 0;
                    item.style.transform = 'scale(0)';
                    window.setTimeout(function () {
                        item.style.display = 'none';
                    }, 0); // timed to match animation-duration
                }
            })
        })
    }
}

//update the html content based on the local storage 
function updateGadgetSection(){
    const coffeeGadget = document.querySelector("#gadget-carousel");

    //delete all the previous content
    coffeeGadget.innerHTML = "";

    // Retrieve the coffee array from localStorage
    let drippers = JSON.parse(localStorage.getItem('drippers'));
    let grinders = JSON.parse(localStorage.getItem('grinders'));
    
    
    //iterate through the local storage and add gadget into the carousel
    if (drippers !== null) {
        drippers.forEach((dripper,index) => {
            let li = createNewGadget(dripper,index);
            coffeeGadget.appendChild(li);
        });
    };
    if (grinders !== null) {
        grinders.forEach((grinder,index) => {
            let li = createNewGadget(grinder,index);
            coffeeGadget.appendChild(li);
        });
    }
    
    
    
    // Apply color thief effects to newly added images
    setTimeout(() => {
        applyColorThiefEffects();
    }, 50);
    
    // Re-initialize the carousel only if there's content
    setTimeout(() => {
        const carouselList = document.querySelector("#gadget-carousel");
        if (carouselList && carouselList.children.length > 0) {
            reinitializeCarousel();
        } else {
            // Hide carousel when empty
            const carousel = document.querySelector(".glide");
            if (carousel) {
                carousel.style.visibility = "hidden";
            }
        }
    }, 100);
}

//update the brew section(including rendering item, generating custom-select values)
function updateBrewSection(){
    updateBrewFormSelect();//this will generate the dropdown options for brew form, it should be generated first
    const brewAccordion = document.querySelector(".accordion-container");

    //clear the innerHTML first to prevent overlapping information
    brewAccordion.innerHTML = "";

    let brews = JSON.parse(localStorage.getItem('brews'));

    if(brews !== null) {
        for(let i = 0; i < brews.length; i++){
            let accordionItem = createBrewItem(brews[i]);
            brewAccordion.appendChild(accordionItem);
        }
    }
    
    // Reinitialize accordion to make arrows work for new entries
    if (typeof window.initializeAccordion === 'function') {
        window.initializeAccordion();
    }
}
//----------------------------------------- WRITING HTML CONTENT ----------------------------------------
function createNewGadget(gadget,index) {
    //create a new li element
    const li = document.createElement("li");
    li.className = "glide__slide";
    const div = document.createElement("div");
    div.className = "carousel-item";
    if (gadget.type === "Dripper") {
        div.innerHTML = `<div class="flex-row">
                        <p>${gadget.material}</p>
                        <p>Dripper</p>
                    </div>
                    <input id="${gadget.id}" name="delete" class="gadget-delete black-fill white-border fill-in" type="button" value="Delete" />
                    <img class="color-thief-images" src="${dripperImageArray[index]}"
                        alt="a coffeee dripper ${gadget.name}">
                    <div class="flex-row">
                        <p>${gadget.name}</p>
                        <p>${gadget.brand}</p>
                    </div>`
    } else if (gadget.type === "Grinder") {
        div.innerHTML = `<div class="flex-row">
                        <p>${gadget.burr}</p>
                        <p>Grinder</p>
                    </div>
                    <input id="${gadget.id}" name="delete" class="gadget-delete black-fill white-border fill-in" type="button" value="Delete" />
                    <img class="color-thief-images" src="${grinderImageArray[index]}"
                        alt="a coffeee grinder ${gadget.name}">
                    <div class="flex-row">
                        <p>${gadget.name}</p>
                        <p>${gadget.brand}</p>
                    </div>`
    }
    li.appendChild(div);
    return li;
}
//this function will create the thumbnail information for each coffee item in the coffee list
function createCoffeeListItem(coffee) {
    const li = document.createElement("li");
    li.innerHTML = `
    <a class="coffee-item">
        <div class="coffee-item-wrap">
            <h3 class="coffee-item-name">${coffee.name}</h3>
            <p><span class="coffee-item-date">${coffee.roastDate}</span>
                <span class="coffee-item-roaster">${coffee.roaster.name}</span>
            </p>
        </div>
        <div class="coffee-item-wrap">
            <h3 class="coffee-item-origin">${coffee.origin.country}</h3>
            <p><span class="chips">${coffee.roastLevel}</span>
                <span class="chips">${coffee.process}</span>
            </p>
        </div>
    </a>`;
    return li;
}
//add description to the coffee, this will create a div container with all the information about the coffee
function createCoffeeDescription(coffee,index) {
    //div container for the coffeee description content
    const div = document.createElement("div");

    //create tags for flavours
    //it's easier for me to manage the html content here
    //as one coffee may have multiple tags, so a for loop here will translate all tags into the span
    let tempDiv = document.createElement("div");
    let flavourDiv = document.createElement("div");
    flavourDiv.className = "special-row-2";
    let titileSpan = document.createElement("span");
    titileSpan.className = "info-item-label";
    titileSpan.innerHTML = "Flavours:"
    flavourDiv.appendChild(titileSpan);
    console.log('Coffee flavour data:', coffee.flavour, 'Type:', typeof coffee.flavour);
    for (let i = 0; i < coffee.flavour.length; i++) {
        let tag = document.createElement("span");
        tag.className = "chips info-item-value";
        tag.innerHTML = coffee.flavour[i];
        flavourDiv.appendChild(tag);
    }
    tempDiv.appendChild(flavourDiv);

    //adding html content to the div 
    div.classList.add("coffee-item-info");
    div.innerHTML = `<div class="info-col">
                            <div class="info-row">
                                <span class="info-item-label">Name:</span>
                                <span class="info-item-value">${coffee.name}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-label">Roast Level:</span>
                                <span class="info-item-value">${coffee.roastLevel}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-label">Roaster:</span>
                                <span class="info-item-value">${coffee.roaster.name}</span>
                            </div>
                            <div class="info-row image-row">
                                <img class="color-thief-images-for-bg" src="${coffeeImageArray[index]}" alt="a photo of ${coffee.name}">
                            </div>
                            <div class="info-row">
                                <span class="info-item-label">Origin Country:</span>
                                <span class="info-item-value">${coffee.origin.country}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-label">Farm:</span>
                                <span class="info-item-value">${coffee.origin.farm}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-label">Varietal:</span>
                                <span class="info-item-value">${coffee.origin.varietal}</span>
                            </div>
                        </div>
                        <div class="info-col">
                        <div class="info-row">
                            <span class="info-item-label">Type:</span>
                            <span class="info-item-value">${coffee.type}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-item-label">Roast Date:</span>
                            <span class="info-item-value">${coffee.roastDate}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-item-label">Roaster Country:</span>
                            <span class="info-item-value">${coffee.roaster.country}</span>
                        </div>
                        <div class="info-row special-row">
                            <div class="special-row-1">
                                <span class="info-item-label">Process:</span>
                                <span class="info-item-value">${coffee.process}</span>
                            </div>${tempDiv.innerHTML}
                            <div class="special-row-3">
                                <div class="info-item-wrapper">
                                    <span class="info-item-label">Weight:</span>
                                    <span class="info-item-value">${coffee.weight} Grams</span>
                                </div>
                                <div class="info-item-wrapper">
                                    <span class="info-item-label">Price:</span>
                                    <span class="info-item-value">$${coffee.price}</span>
                                </div>
                            </div>
                        </div>
                        <div class="info-row">
                            <span class="info-item-label">Region:</span>
                            <span class="info-item-value">${coffee.origin.region}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-item-label">Producer:</span>
                            <span class="info-item-value">${coffee.origin.producer}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-item-label">Elevation:</span>
                            <span class="info-item-value">${coffee.origin.elevation} m.a.s.l</span>
                        </div>
                    </div>
                    <input id="${coffee.id}" name="delete" class="coffee-delete black-fill white-border fill-in" type="button" value="Delete" />`
    return div;
}

function updateBrewFormSelect(){
    const coffeeSelect = document.getElementById("brewCoffee");
    const dripperSelect = document.getElementById("brewDripper");
    const grinderSelect = document.getElementById("brewGrinder");


    // Clear existing options first (except the first placeholder option)
    if (coffeeSelect) {
        coffeeSelect.innerHTML = '<option value="" label="Select a coffee" selected="selected">Select a coffee</option>';
    }
    if (dripperSelect) {
        dripperSelect.innerHTML = '<option value="" label="Select a dripper" selected="selected">Select a dripper</option>';
    }
    if (grinderSelect) {
        grinderSelect.innerHTML = '<option value="" label="Select a grinder" selected="selected">Select a grinder</option>';
    }

    createSelectOption(coffeeArray,coffeeSelect);
    createSelectOption(grinderArray,grinderSelect);
    createSelectOption(dripperArray,dripperSelect);


    // Manually update the custom select components for brew form
    const brewCustomSelects = document.querySelectorAll('#add-brew-dialog .custom-select');
    brewCustomSelects.forEach(customSelect => {
        const originalSelect = customSelect.getElementsByTagName("select")[0];
        const selectSelected = customSelect.querySelector('.select-selected');
        const selectItems = customSelect.querySelector('.select-items');
        
        if (originalSelect && selectSelected && selectItems) {
            // Update the selected display
            selectSelected.innerHTML = originalSelect.options[originalSelect.selectedIndex].innerHTML;
            
            // Clear existing items
            selectItems.innerHTML = '';
            
            // Add new items (skip index 0 which is the placeholder)
            for (let j = 1; j < originalSelect.options.length; j++) {
                const option = originalSelect.options[j];
                const itemDiv = document.createElement("DIV");
                itemDiv.innerHTML = option.innerHTML;
                
                // Add click event listener
                itemDiv.addEventListener("click", function (e) {
                    // Update the original select
                    originalSelect.selectedIndex = j;
                    originalSelect.dispatchEvent(new Event('change'));
                    
                    // Update the selected display
                    selectSelected.innerHTML = this.innerHTML;
                    
                    // Update visual selection
                    const sameAsSelected = selectItems.getElementsByClassName("same-as-selected");
                    for (let k = 0; k < sameAsSelected.length; k++) {
                        sameAsSelected[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    
                    // Close the dropdown
                    selectItems.classList.add("select-hide");
                    selectSelected.classList.remove("select-arrow-active");
                    selectSelected.classList.remove("select-selected-bottom-square");
                });
                
                selectItems.appendChild(itemDiv);
            }
        }
    });
}
//this function will generate an array of options based on its source
//and append all the options into the selectContainer
function createSelectOption(arr,selectContainer) { 
    if(arr !== null && arr.length > 0){
        for(let i = 0; i< arr.length; i++){
            let option = document.createElement("option");
            option.innerHTML = arr[i].name;
            option.value = arr[i].id;

            selectContainer.appendChild(option);
        }
    }
}

//this function will generate content for the brew section accordion element
function createBrewItem(brew){
    //conatiner for the entire accordion
    const article = document.createElement("article");
    article.className = ("ac brew-item");

    //accordion header
    const h2 = document.createElement("h2");
    h2.classList.add("ac-header");
    h2.innerHTML = `<button type="button" class="ac-trigger">
    <div class="brew-basic-info-wrapper col-grid">
        <p>${brew.date}</p>
        <p>${brew.coffee.name}</p>
        <p>${brew.coffee.roaster.name}</p>
        <p>${brew.coffee.process}</p>
        <p>${brew.coffee.origin.country}</p>
        <p>${brew.rating}</p>
        <div class="down-arrow arrow"></div>
    </div>
    </button>`;
    article.appendChild(h2);

    // accordion panel    
    const panel = document.createElement("div");
    panel.classList.add("ac-panel");

    //before adding html content, we need to format the chips just like in the coffee description

    let tempDiv = document.createElement("div");

    let tastingDiv = document.createElement("div");
    tastingDiv.className = "info-row special-row";

    let titileSpan = document.createElement("span");
    titileSpan.className = "info-item-label";
    titileSpan.innerHTML = "Tasting Notes:"
    tastingDiv.appendChild(titileSpan);

    for (let i = 0; i < brew.tastingNote.length; i++) {
        let tag = document.createElement("span");
        tag.className = "chips info-item-value";
        tag.innerHTML = brew.tastingNote[i];
        tastingDiv.appendChild(tag);
    };
    tempDiv.appendChild(tastingDiv);

    //calculate the coffee age
    var date1 = parseDate(brew.coffee.roastDate);
    var date2 = parseDate(brew.date);
    let coffeeAge = getDaysDiff(date2,date1);

    //create the text prompt if input is not empty for the recipe link
    let recipeLink = brew.recipe === "" ? "None" : "Click here";
    panel.innerHTML = `<div class="brew-detail-info-wrapper col-grid">
                            <figure class="grid-item">
                                <img class="color-thief-images" src="${coffeeImageArray[brew.image]}" alt="a photo of brewing coffee ${brew.coffee.name}">
                            </figure>
                            <div class="grid-item">
                                <h3>Preparation.</h3>
                                <div class="info-row">
                                    <span class="info-item-label">Dripper:</span>
                                    <span class="info-item-value">${brew.dripper}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-item-label">Grinder:</span>
                                    <span class="info-item-value">${brew.grinder}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-item-label">Grinder Setting:</span>
                                    <span class="info-item-value">${brew.grinderSetting}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-item-label">Coffee Amount:</span>
                                    <span class="info-item-value">${brew.coffeeAmount} grams</span>
                                </div>
                                <div class="info-row">
                                        <span class="info-item-label">Coffee Age:</span>
                                        <span class="info-item-value">${coffeeAge} Days</span>
                                    </div>
                                
                            </div>
                            <div class="grid-item">
                                <h3>Brewing.</h3>
                                <div class="info-row">
                                    <span class="info-item-label">Water Temperature:</span>
                                    <span class="info-item-value">${brew.waterTemperature}°C</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-item-label">Blooming Time:</span>
                                    <span class="info-item-value">${brew.bloomTime}’’</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-item-label">Total Brew Time:</span>
                                    <span class="info-item-value">${brew.timeMinute}’${brew.timeSecond}’’</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-item-label">Water Amount:</span>
                                    <span class="info-item-value">${brew.waterAmount} grams</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-item-label">Brew Ratio:</span>
                                    <span class="info-item-value">1 : ${brew.ratio}</span>
                                </div>
                            </div>
                            <div class="grid-item">
                                <h3>Tasting.</h3>
                                <div class="info-col">
                                    <div class="info-row">
                                        <span class="info-item-label">Beverage Amount:</span>
                                        <span class="info-item-value">${brew.beverageAmount}</span>
                                    </div>
                                    ${tempDiv.innerHTML}
                                </div>
                                <div class="info-col">
                                    <div class="info-row special-row">
                                        <span class="info-item-label">Recipe Link:</span>
                                        <a class="info-item-value recipe-link" href="${brew.recipe}" target="_blank">${recipeLink}</a>
                                    </div>
                                    <div class="info-row special-row">
                                        <span class="info-item-label">Note:</span>
                                        <span class="info-item-value text-area">${brew.note}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="grid-item">
                                <input id="${brew.id}" name="delete" value="Delete" type="button" class="black-fill white-border fill-in"/>
                            </div>
                        </div>`;
    article.appendChild(panel);

    return article;
}


//----------------------------------------- HELPER FUNCTIONS ----------------------------------------
//this function will translate an image file into a based 64 string
function getBase64(file, callback) {

    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
}

function getDaysDiff(date1,date2) {
    return Math.ceil((date1 - date2) / (1000 * 60 * 60 * 24));
}
//parse a "dd/mm/yyyy" string to a Date object
function parseDate(str) {
    let date = str.split("/");//split the string into an array
    //notice here the month needs to be subtracting one, or it will give the next month
    return new Date(date[2],date[1]-1,date[0]);
}