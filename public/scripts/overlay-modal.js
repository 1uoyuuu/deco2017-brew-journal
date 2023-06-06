import A11yDialog from 'a11y-dialog';

const dialogContainers = document.querySelectorAll(".dialog-container");
let dialogs = [];
dialogContainers.forEach(element => {
    //create a new A11yDialog object for each entry
    let dialog = new A11yDialog(element);
    //push them into the dialog array
    dialogs.push(dialog);
})


//lock the scrolling when a dialog is open
dialogs.forEach(dialog => {
    dialog.on('show', () => (document.documentElement.style.overflowY = 'hidden'));
    dialog.on('hide', () => (document.documentElement.style.overflowY = ''));
});