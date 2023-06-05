
// here is where the code from: https://codepen.io/webDsign/pen/yLgVJqX

function createCustomSelect(){
    var x, i, j, l, ll, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select"); // HTML collection of all custom select container
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0]; // original select element
        ll = selElmnt.length;
        /*for each element, create a new DIV that will act as the selected item:*/
    
        //a serves as the select box, where user can click to choose different option and display current option
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        //set a's html to the same as the first option(default) inside the select element
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        //add a as the direct child of custom select container
        x[i].appendChild(a);
    
        /*for each element, create a new DIV that will contain the option list:*/
    
        b = document.createElement("DIV");
        //by default all the options will be hided
        b.setAttribute("class", "select-items select-hide");
        //it should starts with index 1, because the index 0 is the default option
        for (j = 1; j < ll; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
    
            //transfer the original html content into the newly created c(which the container to display each option)
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            //add event listener to detect each click of the c item
            c.addEventListener("click", function (e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h, sl, yl;
    
                //s is the same as the selElmnt above
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                 //this.parentNode is the div.select-items, which means it's the b
                 //so the h here is the div.select-selected, meaning it's the a
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        //transfer the selected item back to the original select box
                        s.selectedIndex = i;
                        //in order to trigger the change event for validation
                        //mannually adding a change event here to the original select box
                        // idea comes from Eric Phillips: https://stackoverflow.com/questions/71530866/custom-dropdown-not-taking-change-event
                        s.dispatchEvent(new Event('change'));
                        //change the selectedIndex or the original select box to correspond with custom select box
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
    
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
            this.classList.toggle("select-selected-bottom-square");
        });
    }
}

function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
            y[i].classList.remove("select-selected-bottom-square");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/

createCustomSelect();
document.addEventListener("click", closeAllSelect);




//when user click close button, it should generate a new custom select
//the reason i did this because the custom select doesnt reset after form.reset()
//so i mannually destroy and recreate a new one here
const closeBtns = document.querySelectorAll("input[name='close']");

closeBtns.forEach(btn => {
    btn.addEventListener("click", ()=> {
        deleteCustomSelect();
        createCustomSelect();
    });
})

function deleteCustomSelect(){
    let customSelect = document.getElementsByClassName("custom-select");
    for(let i = 0; i < customSelect.length; i++){
        let originalSel = customSelect[i].firstElementChild;
        //remove the html content
        customSelect[i].innerHTML = "";
        customSelect[i].appendChild(originalSel);
    }
}