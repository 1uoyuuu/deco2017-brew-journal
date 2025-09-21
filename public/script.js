// Brew Journal - Database Only Version (Simplified)
// This version uses Supabase as the primary data storage

// Import database service
import { DatabaseService } from './database-service.js';

// Helper function to convert image file to base64
function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// define the class Coffee to better organise the data (I'm more used to work with OOP)
class Coffee {
    constructor(name, type, roastLevel, roastDate, roaster, process, origin, weight, price, flavour, imageUrl = null) {
        //attributes of basic information
        this.id = Date.now();
        this.name = name; //String
        this.type = type; //String
        this.process = process; //String
        this.price = price; //Number
        this.weight = weight; //Number
        this.flavour = flavour; //String
        this.image_url = imageUrl; //String - image URL
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
    constructor(name, material, brand, imageUrl = null) {
        this.id = Date.now();
        this.name = name;
        this.material = material;
        this.brand = brand;
        this.image_url = imageUrl;
    }
}

class Grinder {
    constructor(name, burrType, brand, imageUrl = null) {
        this.id = Date.now();
        this.name = name;
        this.burrType = burrType;
        this.brand = brand;
        this.image_url = imageUrl;
    }
}

class Brew {
    constructor(coffee, dripper, grinder, notes, rating) {
        this.id = Date.now();
        this.coffee = coffee; //Object Coffee
        this.dripper = dripper; //Object Dripper
        this.grinder = grinder; //Object Grinder
        this.notes = notes; //String
        this.rating = rating; //Number
        this.date = new Date().toISOString().split('T')[0]; //String(date)
    }
}

// Global arrays to store data (loaded from database)
let coffeeArray = [];
let dripperArray = [];
let grinderArray = [];
let brewArray = [];

// Data management functions
async function loadData() {
    try {
        console.log('Loading data from Supabase...');
        coffeeArray = await DatabaseService.getCoffees();
        dripperArray = await DatabaseService.getDrippers();
        grinderArray = await DatabaseService.getGrinders();
        brewArray = await DatabaseService.getBrews();
        
        console.log('Data loaded from Supabase:', {
            coffees: coffeeArray.length,
            drippers: dripperArray.length,
            grinders: grinderArray.length,
            brews: brewArray.length
        });
        
        // Debug: Log first coffee to see data structure
        if (coffeeArray.length > 0) {
            console.log('First coffee data structure:', coffeeArray[0]);
            console.log('Roaster data:', coffeeArray[0].roasters);
            console.log('Origin data:', coffeeArray[0].origins);
        }
    } catch (error) {
        console.error('Error loading from database:', error);
        // Initialize empty arrays if database fails
        coffeeArray = [];
        dripperArray = [];
        grinderArray = [];
        brewArray = [];
    }
}

// Coffee management
async function addCoffee(coffeeData) {
    try {
        const newCoffee = await DatabaseService.addCoffee(coffeeData);
        if (newCoffee) {
            coffeeArray.unshift(newCoffee);
            return newCoffee;
        }
    } catch (error) {
        console.error('Error adding coffee to database:', error);
    }
    return null;
}

async function deleteCoffee(id) {
    try {
        const success = await DatabaseService.deleteCoffee(id);
        if (success) {
            coffeeArray = coffeeArray.filter(coffee => coffee.id !== id);
            return true;
        }
    } catch (error) {
        console.error('Error deleting coffee from database:', error);
    }
    return false;
}

// Dripper management
async function addDripper(dripperData) {
    try {
        const newDripper = await DatabaseService.addDripper(dripperData);
        if (newDripper) {
            dripperArray.unshift(newDripper);
            return newDripper;
        }
    } catch (error) {
        console.error('Error adding dripper to database:', error);
    }
    return null;
}

async function deleteDripper(id) {
    try {
        const success = await DatabaseService.deleteDripper(id);
        if (success) {
            dripperArray = dripperArray.filter(dripper => dripper.id !== id);
            return true;
        }
    } catch (error) {
        console.error('Error deleting dripper from database:', error);
    }
    return false;
}

// Grinder management
async function addGrinder(grinderData) {
    try {
        const newGrinder = await DatabaseService.addGrinder(grinderData);
        if (newGrinder) {
            grinderArray.unshift(newGrinder);
            return newGrinder;
        }
    } catch (error) {
        console.error('Error adding grinder to database:', error);
    }
    return null;
}

async function deleteGrinder(id) {
    try {
        const success = await DatabaseService.deleteGrinder(id);
        if (success) {
            grinderArray = grinderArray.filter(grinder => grinder.id !== id);
            return true;
        }
    } catch (error) {
        console.error('Error deleting grinder from database:', error);
    }
    return false;
}

// Brew management
async function addBrew(brewData) {
    try {
        const newBrew = await DatabaseService.addBrew(brewData);
        if (newBrew) {
            brewArray.unshift(newBrew);
            return newBrew;
        }
    } catch (error) {
        console.error('Error adding brew to database:', error);
    }
    return null;
}

async function deleteBrew(id) {
    try {
        const success = await DatabaseService.deleteBrew(id);
        if (success) {
            brewArray = brewArray.filter(brew => brew.id !== id);
            return true;
        }
    } catch (error) {
        console.error('Error deleting brew from database:', error);
    }
    return false;
}

// Helper function for RGB to hex conversion
function rgbToHex([r,g,b]) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('');
}

// Function to apply color thief effects to dynamically added images
function applyColorThiefEffects() {
    // Import ColorThief directly
    import('colorthief/dist/color-thief.mjs').then(ColorThief => {
        const colorThief = new ColorThief.default();
        
        // Apply effects to color-thief-images
        const imageBorder = document.querySelectorAll(".color-thief-images");
        imageBorder.forEach(img => {
            if (img.complete && img.naturalWidth > 0) {
                try {
                    let col = colorThief.getColor(img, 200);
                    img.style.borderColor = rgbToHex(col);
                } catch (error) {
                    console.warn('ColorThief error for image:', img.src, error);
                }
            } else {
                img.addEventListener('load', function () {
                    if (img.naturalWidth > 0) {
                        try {
                            let col = colorThief.getColor(img, 200);
                            img.style.borderColor = rgbToHex(col);
                        } catch (error) {
                            console.warn('ColorThief error for image:', img.src, error);
                        }
                }
            });
        }
        });
        
        // Apply effects to color-thief-images-for-bg
        const imageBackground = document.querySelectorAll(".color-thief-images-for-bg");
        imageBackground.forEach(img => {
            if (img.complete && img.naturalWidth > 0) {
                try {
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
                } catch (error) {
                    console.warn('ColorThief error for background image:', img.src, error);
                }
            } else {
                img.addEventListener('load', function () {
                    if (img.naturalWidth > 0) {
                        try {
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
                        } catch (error) {
                            console.warn('ColorThief error for background image:', img.src, error);
                        }
                }
            });
        }
        });
    });
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

function updateCoffeeSection() {
    const coffeeList = document.querySelector("#coffee-list > ul");
    const coffeeInfo = document.querySelector("#coffee-info");
    //reset the content in the coffeeList
    //this will prevent the repetition of writing content into html
    //as we go through all the index of the localstorage obejct everytime we call it
    coffeeList.innerHTML = "";
    coffeeInfo.innerHTML = `<p id="hint-text">Here's a list of all the coffee you have added so far. Click on any of them
    to reminisce about
    your favourite cup.</p>`;

    // iterate through all the coffee entries when it's not null
    if (coffeeArray !== null && coffeeArray.length > 0) {
        coffeeArray.forEach((coffee,index) => {
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
}

function updateGadgetSection(){
    const coffeeGadget = document.querySelector("#gadget-carousel");

    //delete all the previous content
    coffeeGadget.innerHTML = "";

    //iterate through the local storage and add gadget into the carousel
    if (dripperArray !== null && dripperArray.length > 0) {
        dripperArray.forEach((dripper,index) => {
            // Add type field for UI compatibility
            dripper.type = "Dripper";
            let li = createNewGadget(dripper,index);
            coffeeGadget.appendChild(li);
        });
    };
    if (grinderArray !== null && grinderArray.length > 0) {
        grinderArray.forEach((grinder,index) => {
            // Add type field for UI compatibility
            grinder.type = "Grinder";
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

function updateBrewSection() {
    console.log('Updating brew section with', brewArray.length, 'brews');
    
    const brewAccordion = document.querySelector(".accordion-container");
    if (!brewAccordion) {
        console.log('Brew accordion not found');
        return;
    }

    // Clear existing content
    brewAccordion.innerHTML = "";

    if (brewArray.length === 0) {
        brewAccordion.innerHTML = '<p>No brews recorded yet. Start brewing!</p>';
        return;
    }
    
    // Add each brew to the accordion
    brewArray.forEach(brew => {
        const accordionItem = createBrewItem(brew);
            brewAccordion.appendChild(accordionItem);
    });
    
    // Make accordion visible
    brewAccordion.style.visibility = "visible";
    
    // Reinitialize accordion to make arrows work for new entries
    if (typeof window.initializeAccordion === 'function') {
        window.initializeAccordion();
    }
}

// Create brew accordion item - matching original design exactly
function createBrewItem(brew) {
    // Container for the entire accordion
    const article = document.createElement("article");
    article.className = "ac brew-item";

    // Accordion header
    const h2 = document.createElement("h2");
    h2.classList.add("ac-header");
    h2.innerHTML = `<button type="button" class="ac-trigger">
        <div class="brew-basic-info-wrapper col-grid">
            <p>${new Date(brew.created_at).toLocaleDateString()}</p>
            <p>${brew.coffees?.name || 'N/A'}</p>
            <p>${brew.coffees?.roasters?.name || 'N/A'}</p>
            <p>${brew.coffees?.processing_method || 'N/A'}</p>
            <p>${brew.coffees?.origins?.country || 'N/A'}</p>
            <p>${brew.rating ? `${brew.rating}.0` : 'N/A'}</p>
            <div class="down-arrow arrow"></div>
        </div>
    </button>`;
    article.appendChild(h2);

    // Accordion panel    
    const panel = document.createElement("div");
    panel.classList.add("ac-panel");

    // Format tasting notes as chips
    let tempDiv = document.createElement("div");
    let tastingDiv = document.createElement("div");
    tastingDiv.className = "info-row special-row";

    let titleSpan = document.createElement("span");
    titleSpan.className = "info-item-label";
    titleSpan.innerHTML = "Tasting Notes:";
    tastingDiv.appendChild(titleSpan);

    if (brew.tasting_notes && brew.tasting_notes.length > 0) {
        for (let i = 0; i < brew.tasting_notes.length; i++) {
            let tag = document.createElement("span");
            tag.className = "chips info-item-value";
            tag.innerHTML = brew.tasting_notes[i];
            tastingDiv.appendChild(tag);
        }
    }
    tempDiv.appendChild(tastingDiv);

    // Use individual fields directly from database
    const dripper = brew.drippers?.name || 'N/A';
    const grinder = brew.grinders?.name || 'N/A';
    const grinderSetting = brew.grinder_setting || 'N/A';
    const coffeeAmount = brew.coffee_amount ? `${brew.coffee_amount} grams` : 'N/A';
    const waterTemperature = brew.temperature ? `${brew.temperature}°C` : 'N/A';
    const bloomTime = brew.bloom_time ? `${brew.bloom_time}''` : 'N/A';
    const brewTime = brew.brew_time_minutes && brew.brew_time_seconds 
        ? `${brew.brew_time_minutes}'${brew.brew_time_seconds.toString().padStart(2, '0')}''`
        : 'N/A';
    const waterAmount = brew.water_amount ? `${brew.water_amount} grams` : 'N/A';
    const beverageAmount = brew.beverage_amount ? `${brew.beverage_amount} grams` : 'N/A';
    const recipeLink = brew.recipe_link || '';
    const generalNotes = brew.general_notes || 'N/A';
    
    // Calculate coffee age (simplified for now)
    const coffeeAge = 'N/A';
    
    // Calculate brew ratio
    const ratio = (brew.coffee_amount && brew.water_amount) 
        ? Math.round(brew.water_amount / brew.coffee_amount) 
        : 'N/A';
    
    // Create recipe link
    const recipeLinkText = recipeLink === '' ? 'None' : 'Click here';
    const recipeHref = recipeLink === '' ? '#' : recipeLink;

    panel.innerHTML = `<div class="brew-detail-info-wrapper col-grid">
                            <figure class="grid-item">
                                <img class="color-thief-images" src="${brew.coffees?.image_data || 'src/images/coffee-placeholder.jpg'}" alt="a photo of brewing coffee ${brew.coffees?.name || 'Unknown'}">
                            </figure>
                            <div class="grid-item">
                                <h3>Preparation.</h3>
                                <div class="info-row">
                                    <span class="info-item-label">Dripper:</span>
                                    <span class="info-item-value">${dripper}</span>
                    </div>
                                <div class="info-row">
                                    <span class="info-item-label">Grinder:</span>
                                    <span class="info-item-value">${grinder}</span>
                    </div>
                                <div class="info-row">
                                    <span class="info-item-label">Grinder Setting:</span>
                                    <span class="info-item-value">${grinderSetting}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-item-label">Coffee Amount:</span>
                                    <span class="info-item-value">${coffeeAmount}</span>
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
                                    <span class="info-item-value">${waterTemperature}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-item-label">Blooming Time:</span>
                                    <span class="info-item-value">${bloomTime}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-item-label">Total Brew Time:</span>
                                    <span class="info-item-value">${brewTime}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-item-label">Water Amount:</span>
                                    <span class="info-item-value">${waterAmount}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-item-label">Brew Ratio:</span>
                                    <span class="info-item-value">1 : ${ratio}</span>
                                </div>
                            </div>
                            <div class="grid-item">
                                <h3>Tasting.</h3>
                                <div class="info-col">
                                    <div class="info-row">
                                        <span class="info-item-label">Beverage Amount:</span>
                                        <span class="info-item-value">${beverageAmount}</span>
                                    </div>
                                    ${tempDiv.innerHTML}
                                </div>
                                <div class="info-col">
                                    <div class="info-row special-row">
                                        <span class="info-item-label">Recipe Link:</span>
                                        <a class="info-item-value recipe-link" href="${recipeHref}" target="_blank">${recipeLinkText}</a>
                                    </div>
                                    <div class="info-row special-row">
                                        <span class="info-item-label">Note:</span>
                                        <span class="info-item-value text-area">${generalNotes}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="grid-item">
                                <input id="${brew.id}" name="delete" value="Delete" type="button" class="brew-delete black-fill white-border fill-in"/>
                            </div>
                        </div>`;
    article.appendChild(panel);

    return article;
}

function updateStatistics() {
    console.log('Updating statistics');
    
    // Calculate statistics from the data
    const coffeeCount = coffeeArray.length;
    const brewCount = brewArray.length;
    
    // Get unique roasters
    const uniqueRoasters = new Set(coffeeArray.map(coffee => {
        return coffee.roasters?.name || null;
    }).filter(Boolean));
    const roasterCount = uniqueRoasters.size;
    
    // Get unique origins
    const uniqueOrigins = new Set(coffeeArray.map(coffee => {
        return coffee.origins?.country || null;
    }).filter(Boolean));
    const originCount = uniqueOrigins.size;
    
    // Calculate total money spent
    const totalMoney = coffeeArray.reduce((sum, coffee) => sum + (coffee.price || 0), 0);
    
    // Update the DOM elements
    const statCoffees = document.getElementById('stat-coffees');
    const statRoasters = document.getElementById('stat-roasters');
    const statOrigins = document.getElementById('stat-origins');
    const statBrews = document.getElementById('stat-brews');
    const statMoney = document.getElementById('stat-money');
    
    if (statCoffees) statCoffees.textContent = coffeeCount;
    if (statRoasters) statRoasters.textContent = roasterCount;
    if (statOrigins) statOrigins.textContent = originCount;
    if (statBrews) statBrews.textContent = brewCount;
    if (statMoney) statMoney.textContent = `$${totalMoney}`;
    
    console.log('Statistics updated:', {
        coffees: coffeeCount,
        roasters: roasterCount,
        origins: originCount,
        brews: brewCount,
        money: totalMoney
    });
}

function updateBrewFormSelect() {
    console.log('Updating brew form selects');
    console.log('Coffee array:', coffeeArray);
    console.log('Dripper array:', dripperArray);
    console.log('Grinder array:', grinderArray);
    
    // Update coffee dropdown
    const coffeeSelect = document.getElementById('brewCoffee');
    if (coffeeSelect) {
        // Clear existing options except the first one
        coffeeSelect.innerHTML = '<option value="" label="Select a coffee" selected="selected">Select a coffee</option>';
        
        // Add coffee options
        coffeeArray.forEach(coffee => {
            const option = document.createElement('option');
            option.value = coffee.id;
            option.textContent = coffee.name;
            coffeeSelect.appendChild(option);
        });
        console.log('Coffee options added:', coffeeSelect.options.length);
    }
    
    // Update dripper dropdown
    const dripperSelect = document.getElementById('brewDripper');
    if (dripperSelect) {
        // Clear existing options except the first one
        dripperSelect.innerHTML = '<option value="" label="Select a dripper" selected="selected">Select a dripper</option>';
        
        // Add dripper options
        dripperArray.forEach(dripper => {
            const option = document.createElement('option');
            option.value = dripper.id;
            option.textContent = dripper.name;
            dripperSelect.appendChild(option);
        });
        console.log('Dripper options added:', dripperSelect.options.length);
    }
    
    // Update grinder dropdown
    const grinderSelect = document.getElementById('brewGrinder');
    if (grinderSelect) {
        // Clear existing options except the first one
        grinderSelect.innerHTML = '<option value="" label="Select a grinder" selected="selected">Select a grinder</option>';
        
        // Add grinder options
        grinderArray.forEach(grinder => {
            const option = document.createElement('option');
            option.value = grinder.id;
            option.textContent = grinder.name;
            grinderSelect.appendChild(option);
        });
        console.log('Grinder options added:', grinderSelect.options.length);
    }
    
    // Reinitialize custom select components for brew form
    setTimeout(() => {
        // Destroy existing custom selects for brew form
        const brewFormSelects = document.querySelectorAll('#brew-form .custom-select');
        brewFormSelects.forEach(select => {
            const selectElement = select.querySelector('select');
            if (selectElement) {
                // Remove custom select classes and restore original select
                selectElement.style.display = 'block';
                selectElement.classList.remove('select-hide');
                
                // Remove custom select elements
                const customSelected = select.querySelector('.select-selected');
                const customItems = select.querySelector('.select-items');
                if (customSelected) customSelected.remove();
                if (customItems) customItems.remove();
            }
        });
        
        // Reinitialize custom selects
        if (typeof createCustomSelect === 'function') {
            createCustomSelect();
        }
    }, 200);
}

// Helper functions from original design
function createCoffeeListItem(coffee) {
    const li = document.createElement("li");
    li.innerHTML = `
    <a class="coffee-item">
        <div class="coffee-item-wrap">
            <h3 class="coffee-item-name">${coffee.name}</h3>
            <p><span class="coffee-item-date">${coffee.roast_date || 'N/A'}</span>
                <span class="coffee-item-roaster">${coffee.roasters?.name || 'N/A'}</span>
            </p>
        </div>
        <div class="coffee-item-wrap">
            <h3 class="coffee-item-origin">${coffee.origins?.country || 'N/A'}</h3>
            <p><span class="chips">${coffee.roast_level || 'N/A'}</span>
                <span class="chips">${coffee.processing_method || 'N/A'}</span>
            </p>
        </div>
    </a>`;
    return li;
}

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
    
    // Handle both array and string flavours
    const flavours = Array.isArray(coffee.flavour) ? coffee.flavour : (coffee.flavour || []);
    for (let i = 0; i < flavours.length; i++) {
        let tag = document.createElement("span");
        tag.className = "chips info-item-value";
        tag.innerHTML = flavours[i];
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
                                <span class="info-item-value">${coffee.roast_level || 'N/A'}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-label">Roaster:</span>
                                <span class="info-item-value">${coffee.roasters?.name || 'N/A'}</span>
                            </div>
                            <div class="info-row image-row">
                                <img class="color-thief-images-for-bg" src="${coffee.image_data || 'src/images/coffee-placeholder.jpg'}" alt="a photo of ${coffee.name}">
                            </div>
                            <div class="info-row">
                                <span class="info-item-label">Origin Country:</span>
                                <span class="info-item-value">${coffee.origins?.country || 'N/A'}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-label">Farm:</span>
                                <span class="info-item-value">${coffee.origins?.farm || 'N/A'}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-label">Varietal:</span>
                                <span class="info-item-value">${coffee.origins?.varietal || 'N/A'}</span>
                            </div>
                        </div>
                        <div class="info-col">
                        <div class="info-row">
                            <span class="info-item-label">Type:</span>
                            <span class="info-item-value">${coffee.type || 'N/A'}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-item-label">Roast Date:</span>
                            <span class="info-item-value">${coffee.roast_date || 'N/A'}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-item-label">Roaster Country:</span>
                            <span class="info-item-value">${coffee.roasters?.country || 'N/A'}</span>
                        </div>
                        <div class="info-row special-row">
                            <div class="special-row-1">
                                <span class="info-item-label">Process:</span>
                                <span class="info-item-value">${coffee.processing_method || 'N/A'}</span>
                            </div>${tempDiv.innerHTML}
                            <div class="special-row-3">
                                <div class="info-item-wrapper">
                                    <span class="info-item-label">Weight:</span>
                                    <span class="info-item-value">${coffee.weight || 'N/A'} Grams</span>
                                </div>
                                <div class="info-item-wrapper">
                                    <span class="info-item-label">Price:</span>
                                    <span class="info-item-value">$${coffee.price || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                        <div class="info-row">
                            <span class="info-item-label">Region:</span>
                            <span class="info-item-value">${coffee.origins?.region || 'N/A'}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-item-label">Producer:</span>
                            <span class="info-item-value">${coffee.origins?.producer || 'N/A'}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-item-label">Elevation:</span>
                            <span class="info-item-value">${coffee.origins?.elevation || 'N/A'} m.a.s.l</span>
                        </div>
                    </div>
                    <input id="${coffee.id}" name="delete" class="coffee-delete black-fill white-border fill-in" type="button" value="Delete" />`
    return div;
}

function createNewGadget(gadget,index) {
    //create a new li element
    const li = document.createElement("li");
    li.className = "glide__slide";
    const div = document.createElement("div");
    div.className = "carousel-item";
    if (gadget.type === "Dripper") {
        div.innerHTML = `<div class="flex-row">
                        <p>${gadget.material || 'N/A'}</p>
                        <p>Dripper</p>
                    </div>
                    <input id="${gadget.id}" name="delete" class="gadget-delete black-fill white-border fill-in" type="button" value="Delete" />
                    <img class="color-thief-images" src="${gadget.image_data || 'src/images/dripper-placeholder.jpg'}"
                        alt="a coffeee dripper ${gadget.name}">
                    <div class="flex-row">
                        <p>${gadget.name}</p>
                        <p>${gadget.brand || 'N/A'}</p>
                    </div>`
    } else if (gadget.type === "Grinder") {
        div.innerHTML = `<div class="flex-row">
                        <p>${gadget.burr_type || 'N/A'}</p>
                        <p>Grinder</p>
                    </div>
                    <input id="${gadget.id}" name="delete" class="gadget-delete black-fill white-border fill-in" type="button" value="Delete" />
                    <img class="color-thief-images" src="${gadget.image_data || 'src/images/grinder-placeholder.jpg'}"
                        alt="a coffeee grinder ${gadget.name}">
                    <div class="flex-row">
                        <p>${gadget.name}</p>
                        <p>${gadget.brand || 'N/A'}</p>
                    </div>`
    }
    li.appendChild(div);
    return li;
}

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

// Delete button event listeners
function setupDeleteListeners() {
    // Use event delegation for dynamically created delete buttons
    document.addEventListener('click', async (e) => {
        if (e.target.name === 'delete') {
            const id = parseInt(e.target.id);
            const className = e.target.className;
            
            if (className.includes('coffee-delete')) {
                await deleteCoffeeUI(id);
            } else if (className.includes('gadget-delete')) {
                // For gadgets, we need to determine if it's a dripper or grinder
                // We can check the parent element or use a data attribute
                const gadgetElement = e.target.closest('.carousel-item');
                if (gadgetElement) {
                    const gadgetType = gadgetElement.querySelector('.flex-row p:last-child')?.textContent;
                    if (gadgetType === 'Dripper') {
                        await deleteGadgetUI('Dripper', id);
                    } else if (gadgetType === 'Grinder') {
                        await deleteGadgetUI('Grinder', id);
                    }
                }
            } else if (className.includes('brew-delete')) {
                await deleteBrewUI(id);
            }
        }
    });
}

// Form submission handlers
function setupFormHandlers() {
    // Coffee form submission
    const coffeeForm = document.getElementById('coffee-form');
    if (coffeeForm) {
        coffeeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleCoffeeFormSubmission();
        });
    }

    // Gadget form submission (handles both drippers and grinders)
    const gadgetForm = document.getElementById('gadget-form');
    if (gadgetForm) {
        gadgetForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleGadgetFormSubmission();
        });
    }

    // Brew form submission
    const brewForm = document.getElementById('brew-form');
    if (brewForm) {
        brewForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleBrewFormSubmission();
        });
    }
}

// Coffee form submission handler
async function handleCoffeeFormSubmission() {
    try {
        const formData = new FormData(document.getElementById('coffee-form'));
        
        // Get image file and convert to base64
        const imageFile = formData.get('coffeeImage');
        let imageData = null;
        if (imageFile && imageFile.size > 0) {
            imageData = await convertImageToBase64(imageFile);
        }

        // Get flavour tags
        const flavourInput = document.getElementById('coffeeFlavour');
        const flavours = flavourInput.value ? flavourInput.value.split(',').map(f => f.trim()) : [];

        // Create coffee data object
        const coffeeData = {
            name: formData.get('coffeeName'),
            type: formData.get('coffeeType'),
            roastLevel: formData.get('roastLevel'),
            roastDate: formData.get('roastDate'),
            process: formData.get('processingMethod'),
            weight: parseInt(formData.get('coffeeWeight')) || 0,
            price: parseFloat(formData.get('coffeePrice')) || 0,
            flavour: flavours,
            image_data: imageData,
            roaster: {
                name: formData.get('roasterName'),
                country: formData.get('roasterCountry')
            },
            origin: {
                country: formData.get('originCountry'),
                region: formData.get('originRegion'),
                farm: formData.get('originFarm'),
                producer: formData.get('producerName'),
                elevation: parseInt(formData.get('elevation')) || 0,
                varietal: formData.get('varietal')
            }
        };

        // Add coffee to database
        const newCoffee = await addCoffee(coffeeData);
        if (newCoffee) {
            // Update UI
            updateCoffeeSection();
            updateStatistics();
            
            // Close dialog
            const dialog = document.getElementById('add-coffee-dialog');
            if (dialog) {
                dialog.setAttribute('aria-hidden', 'true');
            }
            
            // Reset form
            document.getElementById('coffee-form').reset();
            
            console.log('Coffee added successfully:', newCoffee);
        }
    } catch (error) {
        console.error('Error submitting coffee form:', error);
    }
}

// Gadget form submission handler (handles both drippers and grinders)
async function handleGadgetFormSubmission() {
    try {
        const formData = new FormData(document.getElementById('gadget-form'));
        const gadgetType = formData.get('gadgetType');
        
        if (gadgetType === 'Dripper') {
            // Handle dripper submission
            const imageFile = formData.get('dripperImage');
            let imageData = null;
            if (imageFile && imageFile.size > 0) {
                imageData = await convertImageToBase64(imageFile);
            }

            const dripperData = {
                name: formData.get('dripperName'),
                brand: formData.get('dripperBrand'),
                material: formData.get('dripperMaterial'),
                image_data: imageData
            };

            const newDripper = await addDripper(dripperData);
            if (newDripper) {
                updateGadgetSection();
                updateStatistics();
                
                const dialog = document.getElementById('add-gadget-dialog');
                if (dialog) {
                    dialog.setAttribute('aria-hidden', 'true');
                }
                
                document.getElementById('gadget-form').reset();
                console.log('Dripper added successfully:', newDripper);
            }
            
        } else if (gadgetType === 'Grinder') {
            // Handle grinder submission
            const imageFile = formData.get('grinderImage');
            let imageData = null;
            if (imageFile && imageFile.size > 0) {
                imageData = await convertImageToBase64(imageFile);
            }

            const grinderData = {
                name: formData.get('grinderName'),
                brand: formData.get('grinderBrand'),
                burrType: formData.get('burrType'),
                image_data: imageData
            };

            const newGrinder = await addGrinder(grinderData);
            if (newGrinder) {
                updateGadgetSection();
                updateStatistics();
                
                const dialog = document.getElementById('add-gadget-dialog');
                if (dialog) {
                    dialog.setAttribute('aria-hidden', 'true');
                }
                
                document.getElementById('gadget-form').reset();
                console.log('Grinder added successfully:', newGrinder);
            }
        }
    } catch (error) {
        console.error('Error submitting gadget form:', error);
    }
}

// Brew form submission handler
async function handleBrewFormSubmission() {
    try {
        const formData = new FormData(document.getElementById('brew-form'));
        
        // Get tasting notes as array
        const tastingNote = formData.get('tastingNote');
        const tastingNotes = tastingNote ? tastingNote.split(',').map(note => note.trim()) : [];
        
        // Get rating from radio buttons
        const rating = formData.get('rating') ? parseInt(formData.get('rating')) : null;
        
        // Create brew data object with all fields
        const brewData = {
            coffee_id: parseInt(formData.get('brewCoffee')),
            dripper_id: parseInt(formData.get('brewDripper')),
            grinder_id: parseInt(formData.get('brewGrinder')),
            grinder_setting: formData.get('grinderSetting') || null,
            recipe_link: formData.get('recipeLink') || null,
            temperature: formData.get('brewTemperature') ? parseInt(formData.get('brewTemperature')) : null,
            water_amount: formData.get('waterAmount') ? parseInt(formData.get('waterAmount')) : null,
            coffee_amount: formData.get('coffeeAmount') ? parseInt(formData.get('coffeeAmount')) : null,
            bloom_time: formData.get('bloomTime') ? parseInt(formData.get('bloomTime')) : null,
            brew_time_minutes: formData.get('brewMinute') ? parseInt(formData.get('brewMinute')) : null,
            brew_time_seconds: formData.get('brewSecond') ? parseInt(formData.get('brewSecond')) : null,
            beverage_amount: formData.get('beverageAmount') ? parseInt(formData.get('beverageAmount')) : null,
            tasting_notes: tastingNotes,
            rating: rating,
            general_notes: formData.get('note') || null
        };

        // Add brew to database
        const newBrew = await addBrew(brewData);
        if (newBrew) {
            // Update UI
            updateBrewSection();
            updateStatistics();
            
            // Close dialog
            const dialog = document.getElementById('add-brew-dialog');
            if (dialog) {
                dialog.setAttribute('aria-hidden', 'true');
            }
            
            // Reset form
            document.getElementById('brew-form').reset();
            
            console.log('Brew added successfully:', newBrew);
        }
    } catch (error) {
        console.error('Error submitting brew form:', error);
    }
}

// Delete functions for UI
async function deleteCoffeeUI(id) {
    const success = await deleteCoffee(id);
    if (success) {
        updateCoffeeSection();
        updateStatistics();
    }
}

async function deleteGadget(type, id) {
    let success = false;
    if (type === 'dripper') {
        success = await deleteDripper(id);
    } else if (type === 'grinder') {
        success = await deleteGrinder(id);
    }
    
    if (success) {
        updateGadgetSection();
        updateStatistics();
    }
}

// Gadget delete function
async function deleteGadgetUI(type, id) {
    const success = await deleteGadget(type, id);
    if (success) {
        updateGadgetSection();
        updateStatistics();
    }
}

// Brew delete function
async function deleteBrewUI(id) {
    const success = await deleteBrew(id);
    if (success) {
        updateBrewSection();
        updateStatistics();
    }
}

// Make functions globally available
window.deleteCoffee = deleteCoffeeUI;
window.deleteGadget = deleteGadget;
window.deleteBrew = deleteBrewUI;

// Initialize the app
document.addEventListener('DOMContentLoaded', async function() {
    await loadData();
    
    // Update the UI after loading data
    updateCoffeeSection();
    updateGadgetSection();
    updateBrewSection();
    updateStatistics();
    updateBrewFormSelect();
    
    // Setup form handlers
    setupFormHandlers();
    
    // Setup delete button event listeners
    setupDeleteListeners();
    
    setTimeout(() => {
        applyColorThiefEffects();
        const carouselList = document.querySelector("#gadget-carousel");
        if (carouselList && carouselList.children.length > 0) {
            reinitializeCarousel();
        } else {
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
    (async () => {
        await loadData();
        
        updateCoffeeSection();
        updateGadgetSection();
        updateBrewSection();
        updateStatistics();
        updateBrewFormSelect();
        
        setTimeout(() => {
            applyColorThiefEffects();
            const carouselList = document.querySelector("#gadget-carousel");
            if (carouselList && carouselList.children.length > 0) {
                reinitializeCarousel();
            } else {
                const carousel = document.querySelector(".glide");
                if (carousel) {
                    carousel.style.visibility = "hidden";
                }
            }
        }, 100);
    })();
}
