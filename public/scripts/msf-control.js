



setupMSF(document.getElementById("coffee-form"));
setupMSF(document.getElementById("gadget-form"));
setupMSF(document.getElementById("brew-form"));





//this function will setup a multistep display for different form
//it require the form element as parameter and will generate relevant functioanlities
//such as simple validation, change page....
function setupMSF(form) {

    //toggle between different pages by adding/removing class name
    const showPage = (element) => {
        element.classList.add("msf-show");
        element.classList.remove("msf-hide");
    }
    const hidePage = (element) => {
        element.classList.add("msf-hide");
        element.classList.remove("msf-show");
    }

    
    let msfPages = document.querySelectorAll(`#${form.id} > .form-page`);
    //arrow function to display or hide the page
    //declare the total page count of the form and current page
    let msfIndex = 0;
    let currentPage = msfPages[msfIndex];
    showPage(currentPage);
    //get all the buttons
    const backBtns = document.querySelectorAll(`#${form.id}  input[name=back]`);
    const nextBtns = document.querySelectorAll(`#${form.id}  input[name=next]`);
    const submitBtns = document.querySelectorAll(`#${form.id}  input[name=submit]`);
    //remove the back button for the first page, and the next button for the last page
    backBtns[0].classList.add("msf-visually-hide");
    nextBtns[msfPages.length - 1].classList.add("msf-hide");
    //if the form is gadget form, then some magical tweak will be added,
    //cuz the gadget form will change to different page based on what user select


    let gadget; //signal for jumping to different page for gadget form
    if (form.id === "gadget-form") {
        //hide the second page next button as well.
        nextBtns[msfPages.length - 2].classList.add("msf-hide");
    }

    //get All the inputs and must-filled inputs
    let inputsAll = Array.from(form.elements);
    let inputsRequired = [];
    inputsAll.forEach(input => {
        if (input.required) {
            inputsRequired.push(input);
        }
    });
    //user can always goes back to the previous page without any problem
    //so the back buttons should work when user click it
    backBtns.forEach(btn => {
        btn.addEventListener("click", event => {
            //prevent automatically refreshing the page
            event.preventDefault();


            if (form.id === "gadget-form") {
                hidePage(currentPage);
                msfIndex = 0;
                //change the current page
                currentPage = msfPages[msfIndex];
                showPage(currentPage);
                nextBtns[msfIndex].disabled = false;
                //end the event for gadget form
                return;
            }
            hidePage(currentPage);
            if (msfIndex !== 0) {
                //decrement the page index
                msfIndex--;
            }
            nextBtns[msfIndex].disabled = false;
            //change the current page
            currentPage = msfPages[msfIndex];
            showPage(currentPage);
        });
    });

    //however, for going to next page or submit the form, it must pass some validations first
    //e.g. no empty values for all required field
    nextBtns.forEach((btn,index) => {
        btn.setAttribute("disabled","true");
        //create a eventlistener to listen when an input value changes
        //when an input changes, validate required inputs
        //if validation passes, activate the next button
        inputsAll.forEach(input => {
            input.addEventListener("change", e => {
                //if all the required inputs are filled in, only enable the current page next button
                if (validateInputs(inputsRequired, msfIndex) && msfIndex === index) {
                    btn.disabled = false;
                } 
                if(!validateInputs(inputsRequired,msfIndex)){
                    btn.disabled = true;
                }
            })
        });
        //goes to the next page when it is activated and clicked
        btn.addEventListener("click", event => {
            event.preventDefault();
            //special validation for the gadget form
            if (form.id === "gadget-form") {
                gadget = radioCheck("gadgetType");

                if (gadget === "Dripper") {
                    //change the required image based on the type
                    form.elements.dripperImage.required = true;
                    form.elements.grinderImage.required = false;
                    form.elements.grinderName.required = false;
                    form.elements.dripperName.required = true;
                    hidePage(currentPage);
                    msfIndex += 2;
                    //change the current page
                    currentPage = msfPages[msfIndex];
                    showPage(currentPage);
                } else if (gadget === "Grinder") {
                    //change the required image based on the type
                    form.elements.grinderImage.required = true;
                    form.elements.dripperImage.required = false;
                    form.elements.grinderName.required = true;
                    form.elements.dripperName.required = false;
                    hidePage(currentPage);
                    msfIndex += 1;
                    //change the current page
                    currentPage = msfPages[msfIndex];
                    showPage(currentPage);
                }
                return; // end the click event for gadget form


            }
            //check if it is qualified to go to next page
            if (validateInputs(inputsAll, msfIndex)) {
                //normal way to go to next page
                hidePage(currentPage);
                if (msfIndex !== msfPages.length - 1) {
                    //increment the page index
                    msfIndex++;
                }
                //change the current page
                currentPage = msfPages[msfIndex];
                showPage(currentPage);
            }
        });
    });

    //when user submit or close the dialog, the form will be reset to first page, and data will be cleared
    //to clear the data in the form, we need to select the form as reference
    submitBtns.forEach(btn => {
        //the submit button will be set as disabled, unless all the input get validated
        btn.setAttribute("disabled", "true");
        //create a eventlistener to check whehter all the required inputs are filled
        //if so, enable the submit button
        inputsAll.forEach(input => {
            input.addEventListener("change", e => {
                console.log(e.currentTarget.value);
                //first parameter determines whether all the reqruied input on current page is filled in
                //however we need to make sure we only unlock the submit button when it is not the first page
                if (validateInputs(inputsRequired, msfIndex) && msfIndex !== 0) {
                    btn.disabled = false;
                }else {
                    btn.disabled = true;
                }
            })
        });

        //when the submit button unlocked, it can be clicked
        btn.addEventListener("click", event => {
            //hide current page
            hidePage(currentPage);
            //reset the msf index to 0
            msfIndex = 0;
            //reset the current page to first page
            currentPage = msfPages[msfIndex];
            showPage(currentPage);

        });
    });

    const closeBtns = document.getElementsByName("close");
    //when close button is clicked it will reset the msf, back to the first page
    closeBtns.forEach(btn => {
        btn.addEventListener("click", event => {
            //hide current page
            hidePage(currentPage);
            //reset the msf index to 0
            msfIndex = 0;
            //reset the current page to first page
            currentPage = msfPages[msfIndex];
            showPage(currentPage);
            //reset the form once user close the modal
            form.reset();
            nextBtns.forEach(b => b.setAttribute("disabled","true"));
            submitBtns.forEach(b => b.setAttribute("disabled","true"));
        });
    })
}


//Validation Function to determine if it is ok to change to the next page/or submit the form
//before vaildation is sueccessful, the submit button will remain disabled
//this serves as the first layer of data validation
function validateInputs(inputs, index) {
    for (let i = 0; i < inputs.length; i++) {
        //i used a customised data attribute called data-group
        //to distinguish the inputs in different pages
        //if the data-group is equal to current page index, then validate the input
        if (inputs[i].getAttribute("data-group") === index.toString()) {
            //if they are required field, then validate them whether they have been filled correctly
            if (inputs[i].required) {
                //if thise is a radio input
                if (inputs[i].type === "radio") {
                    //if it is not checked, return false
                    if (radioCheck(inputs[i].name) === null) {
                        return false;
                    }
                } else if (inputs[i].type === "select-one") {
                    //if it is the default value 0, return false
                    if (inputs[i].selectedIndex === 0) {
                        return false;
                    }
                } else if (inputs[i].type === "file") {
                    //if user doesn't upload the file
                    if (inputs[i].files.length === 0) {
                        return false;
                    }

                } else {
                    //for the rest of required inputs, if they are empty, return false
                    if (emptyValueCheck(inputs[i].value)) {
                        return false;
                    };
                }
            }
        }
    }
    return true;
}

//check whether a input is empty
function emptyValueCheck(value) {
    return value === "" ? true : false;
}

//check whether a radio button is checked
function radioCheck(name) {
    let checked = document.querySelector(`input[name = "${name}"]:checked`);
    return checked !== null ? checked.value : null;
}


