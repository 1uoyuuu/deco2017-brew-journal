// the first form is adding coffee
// here I will set up variables for HTML elements with DOM selection
const coffeeForm = document.getElementById("coffee-form");
const coffeeList = document.querySelector("#coffee-list > ul");


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

// setup localstorage to store the coffee array
let coffeeArray = localStorage.getItem('coffees') ? JSON.parse(localStorage.getItem('coffees')) : [];

// add event listener to the submit button
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
    addNewCoffee(coffee);

    //reset the form
    coffeeForm.reset();
});

function addNewCoffee(coffee){
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
    coffeeList.appendChild(li);
}



// // Setting up variables for our HTML elements using DOM selection
// const form = document.getElementById("taskform");
// const tasklist = document.getElementById("tasklist");

// form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     console.log(form.elements.taskType.value)

//     addTask(
//         form.elements.taskName.value,
//         form.elements.taskType.value,
//         form.elements.taskRate.value,
//         form.elements.taskTime.value,
//         form.elements.taskClient.value,
//     )
//     console.log(taskList)
// })

// function displayTask(task) {
//     let item = document.createElement("li");
//     item.setAttribute("data-id", task.id);
//     item.innerHTML = `<p><strong>${task.name}</strong><br>${task.type}</p>`;

//     tasklist.appendChild(item);

//     // Clear the value of the input once the task has been added to the page
//     form.reset();

//     // Setup delete button DOM elements
//     let delButton = document.createElement("button");
//     let delButtonText = document.createTextNode("Delete");
//     delButton.appendChild(delButtonText);
//     item.appendChild(delButton); // Adds a delete button to every task

//     // Listen for when the delete button is clicked
//     delButton.addEventListener("click", function (event) {

//         taskList.forEach(function (taskArrayElement, taskArrayIndex) {
//             if (taskArrayElement.id == item.getAttribute('data-id')) {
//                 taskList.splice(taskArrayIndex, 1)
//             }
//         })

//         // Make sure the deletion worked by logging out the whole array
//         console.log(taskList)

//         item.remove(); // Remove the task item from the page when button clicked
//         // Because we used 'let' to define the item, this will always delete the right element

//     })


// }




// Create an object called 'task'
// Populate the properties based on the provided data model

// Commented out now the object creation is included in the function

// var task = {
//   name: "Initial Sketches",
//   type: "Concept Ideation",
//   id: Date.now(),
//   date: new Date().toISOString(),
//   rate: 50,
//   time: 5,
//   client: "Google"
// }

// console.log(task);


// // Create an array called 'taskList'
// var taskList = [];

// // Create a function called 'addTask'
// // Give the function input parameters for: name, type, rate, time, client
// // Paste your object definition from above in the function
// // Replace the property values with the input paramaters
// // Add the object to the taskList array

// function addTask(name, type, rate, time, client) {

//     // Creating the object with the usual property:value syntax
//     // Create task object 
//     // let task = {
//     //   name: name,
//     //   type: type,
//     //   id: Date.now(),
//     //   date: new Date().toISOString(),
//     //   rate: rate,
//     //   time: time,
//     //   client: client
//     // }

//     // Creating the object, directly passing in the input parameters
//     let task = {
//         name,
//         type,
//         id: Date.now(),
//         date: new Date().toISOString(),
//         rate,
//         time,
//         client
//     }

//     taskList.push(task);
//     displayTask(task);

// }

// // Call the function with test values for the input paramaters
// addTask("Initial Sketches", "Concept Ideation", 50, 5, "Google");

// // Log the array to the console.
// console.log(taskList);