// define the class Coffee to better organise the data (I'm more used to work with OOP)
class Coffee {
    constructor(name, type, roastLevel, roastDate, roaster, process, origin, weight, price, flavour) {
        //attributes of basic information
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
    constructor(name, material, brand, image) {
        this.name = name;
        this.material = material;
        this.brand = brand;
        this.image = image;
    }
}
class Grinder {
    constructor(name, burr, brand, image) {
        this.name = name;
        this.burr = burr;
        this.brand = brand;
        this.image = image;
    }
}
const setUnknown = value => value === "" ? "Unknown" : value.trim();

//for number input, if it is optional and user omits it, then set it at 0 by default
const setZero = value => value === "" ? 0 : value;
// the first form is adding coffee
// here I will set up variables for HTML elements with DOM selection
let coffeeForm = document.getElementById("coffee-form");
let gadgetForm = document.getElementById("gadget-form");

// setup localstorage to store the all the informations
// if there is no such element, create a new array
// there will be three parts of information stored in the local storage
// they are coffees, gadgets(drippers,grinders), brews
let coffeeArray = localStorage.getItem('coffees') ? JSON.parse(localStorage.getItem('coffees')) : [];
let dripperArray = localStorage.getItem('drippers') ? JSON.parse(localStorage.getItem('drippers')) : [];
let grinderArray = localStorage.getItem('grinders') ? JSON.parse(localStorage.getItem('grinders')) : [];

let coffeeImageArray = localStorage.getItem('coffeeImages') ? JSON.parse(localStorage.getItem('coffeeImages')) : [];
let grinderImageArray = localStorage.getItem('grinderImages') ? JSON.parse(localStorage.getItem('grinderImages')) : [];
let dripperImageArray = localStorage.getItem('dripperImages') ? JSON.parse(localStorage.getItem('dripperImages')) : [];

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
    let flavours = JSON.parse(document.getElementById("coffeeFlavour").value).map(tag => tag.value.trim());

    let newCoffee = new Coffee(
        coffeeForm.elements.coffeeName.value.trim(), //required
        coffeeForm.elements.coffeeType.value, //required
        coffeeForm.elements.roastLevel.value.trim(), //required
        //the default will generate yyyy-mm-dd, but we here at australia prefer dd--mm--yyyy
        //this simple one line function will help reverse the date
        coffeeForm.elements.roastDate.value.split("-").reverse().join("-"), //required
        roaster, //reqruied
        coffeeForm.elements.processingMethod.value.trim(), //required
        origin, //reqruied
        setZero(coffeeForm.elements.coffeeWeight.value),
        setZero(coffeeForm.elements.coffeePrice.value),
        flavours //array of strings
    );
    getBase64(coffeeForm.elements.coffeeImage.files[0],e=>{
        coffeeImageArray.push(e);
        localStorage.setItem('coffeeImages', JSON.stringify(coffeeImageArray));
    });


    //push the new added coffee into localstorage
    coffeeArray.push(newCoffee);
    localStorage.setItem('coffees', JSON.stringify(coffeeArray));
    //reset the form
    coffeeForm.reset();

    //update the section when the form is submitted
    updateCoffeeSection();

});
gadgetForm.addEventListener("submit", event => {
    event.preventDefault();

    if (gadgetForm.elements.gadgetType.value === "Grinder") {
        let newGrinder = new Grinder(
            gadgetForm.elements.grinderName.value,
            gadgetForm.elements.burrType.value,
            gadgetForm.elements.grinderBrand.value);
        getBase64(gadgetForm.elements.grinderImage.files[0],e=>{
            grinderImageArray.push(e);
            localStorage.setItem('grinderImages', JSON.stringify(grinderImageArray));
        });
        grinderArray.push(newGrinder);
        localStorage.setItem('grinders', JSON.stringify(grinderArray));
        createNewGadget();

    } else if (gadgetForm.elements.gadgetType.value === "Dripper") {
        let newDripper = new Dripper(
            gadgetForm.elements.dripperName.value,
            gadgetForm.elements.dripperMaterial.value,
            gadgetForm.elements.dripperBrand.value,
            gadgetForm.elements.dripperImage.files[0]);

        getBase64(gadgetForm.elements.dripperImage.files[0],e=>{
                dripperImageArray.push(e);
                localStorage.setItem('dripperImages', JSON.stringify(dripperImageArray));
            });
        dripperArray.push(newDripper);
        localStorage.setItem('drippers', JSON.stringify(dripperArray));
        createNewGadget();
    }
    gadgetForm.reset();

});




updateCoffeeSection();



//----------------------------------------- HELPER FUNCTION ----------------------------------------
//add html content to the coffee, this will create a li element

function createNewGadget(gadget) {
    //select the carousel container
    const gadgetCarousel = document.getElementById("gadget-carousel");
    //create a new li element
    const li = document.createElement("li");
    li.className = "glide__slide";
    const div = document.createElement("div");
    div.className = "carousel-item";
    if (gadget instanceof Dripper) {
        div.innerHTML = `<div class="flex-row">
                        <p>${gadget.material}</p>
                        <p>Dripper</p>
                    </div>
                    <img class="color-thief-images" src="src/images/dripper-v60.png"
                        alt="a silver metal v60 dripper">
                    <div class="flex-row">
                        <p>${gadget.name}</p>
                        <p>${gadget.brand}</p>
                    </div>`
    } else if (gadget instanceof Grinder) {
        div.innerHTML = `<div class="flex-row">
                        <p>${gadget.burr}</p>
                        <p>Grinder</p>
                    </div>
                    <img class="color-thief-images" src="src/images/dripper-v60.png"
                        alt="a silver metal v60 dripper">
                    <div class="flex-row">
                        <p>${gadget.name}</p>
                        <p>${gadget.brand}</p>
                    </div>`
    }
    li.appendChild(div);
    gadgetCarousel.appendChild(li);
    console.log(li);
}

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
    const div = document.createElement("div");

    //create tags for flavours
    let tempDiv = document.createElement("div");
    let flavourDiv = document.createElement("div");
    flavourDiv.className = "special-row-2";
    let titileSpan = document.createElement("span");
    titileSpan.className = "info-item-label";
    titileSpan.innerHTML = "Flavours:"
    flavourDiv.appendChild(titileSpan);
    for (let i = 0; i < coffee.flavour.length; i++) {
        let tag = document.createElement("span");
        tag.className = "chips info-item-value";
        tag.innerHTML = coffee.flavour[i];
        flavourDiv.appendChild(tag);
    }
    tempDiv.appendChild(flavourDiv);
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
                                <img src="${coffeeImageArray[index]}" alt="a photo of ${coffee.name}">
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
                    </div>`
    return div;
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

    // Retrieve the favourite countries from localStorage
    let coffees = JSON.parse(localStorage.getItem('coffees'));

    // iterate through all the coffee entries when it's not null
    if (coffees !== null) {
        coffees.forEach((coffee,index) => {
            let item = createCoffeeListItem(coffee);
            let description = createCoffeeDescription(coffee,index);
            //prepend the item as the first entry for both coffeeList and coffeeInfo
            coffeeList.prepend(item);
            coffeeInfo.prepend(description);
        });
    };
    toggleDisplay();


};


// when user click on each coffee item, a full description will be shown on the left
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
            console.log(i);
            //only display the item that is being clicked
            coffeeInfos.forEach((item, index) => {
                if (index === i) {
                    console.log("running: " + i);
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


function getBase64(file, callback) {

    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
}