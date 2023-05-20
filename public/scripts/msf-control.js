//select dom element of all .form-page
const msfPages = document.getElementsByClassName("form-page");

//select progress buttons to change their flex behaviour
const progressBtns = document.getElementsByClassName("progress-button");
//arrow function to display or hide the page
const showPage = (element) => {
    element.classList.add("msf-show");
    element.classList.remove("msf-hide");
}
const hidePage = (element) => {
    element.classList.add("msf-hide");
    element.classList.remove("msf-show");
}


//declare the total page count of the form
//it should start with the first item in the msfPage array
let msfIndex = 0;
//show the current activated page
let currentPage = msfPages[msfIndex];
showPage(currentPage);
//get all the buttons
const backBtns = document.getElementsByName("back");
const nextBtns = document.getElementsByName("next");
//remove the back button for the first page, and the next button for the last page

console.log(backBtns);
console.log(nextBtns);
backBtns[0].classList.add("msf-hide");
nextBtns[msfPages.length - 1].classList.add("msf-hide");


//add click event for all the buttons respectively
backBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        //prevent  automatically refreshing the page
        event.preventDefault();
        hidePage(currentPage);
        if(msfIndex !== 0){
            //decrement the page index
            msfIndex--;
        }
        //change the current page
        currentPage = msfPages[msfIndex];
        showPage(currentPage);
    });
});

nextBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        event.preventDefault();
        hidePage(currentPage);
        if(msfIndex !== msfPages.length-1 ){
            //increment the page index
            msfIndex++;
        }
        //change the current page
        currentPage = msfPages[msfIndex];
        showPage(currentPage);
        });
});
