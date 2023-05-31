// the first form is adding coffee
// here I will set up variables for HTML elements with DOM selection
const coffeeForm = document.getElementById("coffee-form");


// define the class Coffee to better organise the data (I'm more used to work with OOP)
class Coffee {
    constructor(name,type,roastLevel,roastDate,roaster,process,origin,weight,price,image,flavour){
        //attributes of basic information
        this.name = name; //String
        this.type =type; //String
        this.process = process; //String
        this.price = price;  //Number
        this.weight = weight; //Number
        this.image = image; //String(url)
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
    constructor(name,country){
        this.name = name; //String
        this.country = country; //String
    }
}
class Origin {
    constructor(country,region,farm,producer,elevation,varietal){
        this.country = country; //String
        this.region = region; //String
        this.farm = farm; //String
        this.producer = producer; //String
        this.elevation = elevation; //Number
        this.varietal = varietal; //String
    }
}

// setup localstorage to store the all the informations
// if there is no such element, create a new array
// there will be three parts of information stored in the local storage
// they are coffees, gadgets, brews
let coffeeArray = localStorage.getItem('coffees') ? JSON.parse(localStorage.getItem('coffees')) : [];
let gadgetArray = localStorage.getItem('gadgets') ? JSON.parse(localStorage.getItem('gadgets')) : [];
// adding a new coffee to the local storage after submiting the form
coffeeForm.addEventListener("submit", event => {
    //prevent the defualt action of submitting the form
    event.preventDefault();
    //retrieve all the input from the coffee form and create a new new coffee object
    let roaster = new Roaster(
        coffeeForm.elements.roasterName.value,
        coffeeForm.elements.roasterCountry.value,
    );
    let origin = new Origin(
        coffeeForm.elements.originCountry.value,
        coffeeForm.elements.originRegion.value,
        coffeeForm.elements.originFarm.value,
        coffeeForm.elements.producerName.value,
        coffeeForm.elements.elevation.value,
        coffeeForm.elements.varietal.value
    );
    let coffee = new Coffee(
        coffeeForm.elements.coffeeName.value,
        coffeeForm.elements.coffeeType.value,
        coffeeForm.elements.roastLevel.value,
        coffeeForm.elements.roastDate.value,
        roaster,
        coffeeForm.elements.processingMethod.value,
        origin,
        coffeeForm.elements.coffeeWeight.value,
        coffeeForm.elements.coffeePrice.value,
        coffeeForm.elements.coffeeImage.value,
        coffeeForm.elements.coffeeFlavour.value,

    );

    //push the new added coffee into localstorage
    coffeeArray.push(coffee);
    //update the value of key "coffees" in the localstorage
    localStorage.setItem('coffees', JSON.stringify(coffeeArray));

    //reset the form
    coffeeForm.reset();

    //update the coffeeList display on the webpage
    updateCoffeeList();
});


//----------------------------------------- UPDATE LOCAL STORAGE VALUES ----------------------------------------
//update all the information stored in the local storage
//it includes coffee list, gadget list, brew list
updateCoffeeList();




//----------------------------------------- HELPER FUNCTION ----------------------------------------
//add html content to the coffee, this will create a li element
function createCoffeeContent(coffee){
    const li = document.createElement("li");
    li.classList.add("coffee-item");
    li.innerHTML = `
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
    </div>`;
    return li;
}

function updateCoffeeList(){
    const coffeeList = document.querySelector("#coffee-list > ul");
    //reset the content in the coffeeList
    //this will prevent the repetition of writing content into html
    //as we go through all the index of the localstorage obejct everytime we call it
    // coffeeList.innerHTML = "";

    // Retrieve the favourite countries from localStorage
    let coffees = JSON.parse(localStorage.getItem('coffees'));

    // iterate through all the coffee entries when it's not null
    if(coffees !== null){
        coffees.forEach(coffee => {
            let item = createCoffeeContent(coffee);
            //prepend the item as the first entry
            coffeeList.prepend(item);
        });
    };
    
};
