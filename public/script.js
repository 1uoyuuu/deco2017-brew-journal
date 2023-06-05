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
    constructor(coffee,image,dripper,grinder,grinderSetting,recipe,waterTemperature,coffeeAmount,waterAmount,timeMinute,timeSecond,bloomTime,beverageAmount,rating,tastingNote,note){
        this.id = Date.now();
        this.date = new Date().toLocaleDateString(); //generate today's date with the dd/mm/yyyy format
        this.coffee = coffee; //store the coffee Object
        this.image = image;
        this.dripper = dripper.name; //only retrieve the dripper name
        this.grinder = grinder.name; //same for grinder
        this.grinderSetting = grinderSetting; //string
        this.recipe = recipe; //string(url)
        this.waterTemperature = waterTemperature;
        this.coffeeAmount = Number(coffeeAmount);
        this.waterAmount = Number(waterAmount);
        this.ratio = waterAmount/coffeeAmount;
        this.beverageAmount = beverageAmount;
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
let coffeeArray = localStorage.getItem('coffees') ? JSON.parse(localStorage.getItem('coffees')) : [];
let dripperArray = localStorage.getItem('drippers') ? JSON.parse(localStorage.getItem('drippers')) : [];
let grinderArray = localStorage.getItem('grinders') ? JSON.parse(localStorage.getItem('grinders')) : [];
let brewArray = localStorage.getItem('brews') ? JSON.parse(localStorage.getItem('brews')) : [];
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
    let flavours = JSON.parse(document.getElementById("coffeeFlavour").value).map(tag => tag.value.trim().toLowerCase());

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
    coffeeForm.reset();

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

//---------------------- UPDATE CONTENT ----------------------
updateCoffeeSection();
updateGadgetSection();
updateBrewFormSelect();

//---------------------- DELETE FUNCTION ----------------------
const deleteBtns = document.querySelectorAll("input[name='delete']");

deleteBtns.forEach(btn => {
    btn.addEventListener("click", e => {
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

                    window.location.reload(true);
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

                    window.location.reload();
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
                    coffeeArray.splice(index,1);
                    //update the local storage
                    localStorage.setItem('coffees', JSON.stringify(coffeeArray));
                    localStorage.setItem('coffeeImages', JSON.stringify(coffeeImageArray));

                    window.location.reload();
                    return

                }
            })
        }
    })
});

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
            //prepend the item as the first entry for both coffeeList and coffeeInfo
            coffeeList.prepend(item);
            coffeeInfo.prepend(description);
        });
    };
    toggleDisplay();


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
}

//----------------------------------------- WRITING HTML CONTENT ----------------------------------------
function createNewGadget(gadget,index) {
    //create a new li element
    const li = document.createElement("li");
    li.className = "glide__slide";
    const div = document.createElement("div");
    div.className = "carousel-item";
    if (gadget.type === "Dripper") {
        console.log("running here");
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

    createSelectOption(coffeeArray,coffeeSelect);
    createSelectOption(grinderArray,grinderSelect);
    createSelectOption(dripperArray,dripperSelect);

}
//this function will generate an array of options based on its source
//and append all the options into the selectContainer
function createSelectOption(arr,selectContainer) { 
    if(arr !== null){
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

}


//----------------------------------------- HELPER FUNCTIONS ----------------------------------------
//this function will translate an image file into a based 64 string
function getBase64(file, callback) {

    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
}

