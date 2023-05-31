//select dom element of all .form-page, it is a HTML collection
//turn the HTML collection into an array
const msfPages = Array.from(document.getElementsByClassName("form-page"));

//arrow function to display or hide the page
const showPage = (element) => {
    element.classList.add("msf-show");
    element.classList.remove("msf-hide");
}
const hidePage = (element) => {
    element.classList.add("msf-hide");
    element.classList.remove("msf-show");
}

//when add new button is clicked, the msf should be refreshed to the first page
//to do that, we need to select the add new button then add a event listener
const addNewBtns = document.querySelectorAll(".open-dialog-button");
//declare the total page count of the form and current page
let msfIndex = 0;
let currentPage = msfPages[msfIndex];
showPage(currentPage);

//get all the buttons
const backBtns = document.getElementsByName("back");
const nextBtns = document.getElementsByName("next");
const submitBtns = document.getElementsByName("submit");
const closeBtns = document.getElementsByName("close");

//remove the back button for the first page, and the next button for the last page
backBtns[0].classList.add("msf-hide");
nextBtns[msfPages.length - 1].classList.add("msf-hide");


//add click event for all the buttons respectively
backBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        //prevent automatically refreshing the page
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

//when user submit or close the dialog, the form will be reset to first page, and data will be cleared
//to clear the data in the form, we need to select the form as reference
const form = document.getElementsByTagName("form");
submitBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        //hide current page
        hidePage(currentPage);
        //reset the msf index to 0
        msfIndex = 0;
        //reset the current page to first page
        currentPage = msfPages[msfIndex];
        showPage(currentPage);

    });
})

closeBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        //hide current page
        hidePage(currentPage);
        //reset the msf index to 0
        msfIndex = 0;
        //reset the current page to first page
        currentPage = msfPages[msfIndex];
        showPage(currentPage);


    });
})
