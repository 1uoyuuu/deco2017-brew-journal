// This script is used to control the show/hide of the coffee information
// when user click on each coffee item, a full description will be shown on the left

// select all the coffee list items
const coffeeItems = document.querySelectorAll("a.coffee-item");
// select all the corresponding info descriptions
const coffeeInfos = document.querySelectorAll(".coffee-item-info");

console.log(coffeeInfos);
console.log(coffeeItems);
// select the hint text displayed at initial state
const hintText = document.querySelector("#hint-text");
// they correspond into pairs
coffeeInfos.forEach(item => item.classList.add("is-hidden"));

for (let i = 0; i < coffeeItems.length; i++) {
    coffeeItems[i].addEventListener("click", event => {
        //hide the hint text as well, if a coffee item is clicked
        if(!hintText.classList.contains("is-hidden")){
            hintText.classList.add("is-hidden");
        }
        //hide all the coffee-info-items 
        coffeeInfos.forEach(item => item.classList.add("is-hidden"));
        //only display the item that is being clicked
        coffeeInfos[i].classList.remove("is-hidden");
    })
}

//by default all of information will be hidden
// coffeeInfos.forEach(item => item.classList.add("is-hidden"));

// coffeeItems.forEach((item, index) => {
//     item.addEventListener("click", () => {
//         let currentInfo = coffeeInfos[index];

//         coffeeInfos.forEach(item => item.classList.add("is-hidden"));
//         if(currentInfo.classList.contains("is-hidden")){
//             currentInfo.classList.remove("is-hidden");
//         };
//         console.log(currentInfo.className);
//         if (!currentInfo.classList.contains("is-hidden")) {
//             currentInfo.style.display = "flex";
//             window.setTimeout(function () {
//                 currentInfo.style.opacity = 1;
//                 currentInfo.style.transform = 'scale(1)';
//             }, 0);
//         }else {
//             currentInfo.style.opacity = 0;
//             currentInfo.style.transform = 'scale(0)';
//             window.setTimeout(function () {
//                 currentInfo.style.display = 'none';
//             }, 300); // timed to match animation-duration
//         }
//     });
// })