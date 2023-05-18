import A11yDialog from 'a11y-dialog';

const container = document.querySelector('#add-coffee-dialog');
const dialog = new A11yDialog(container);


//lock the scrolling when a dialog is open
dialog.on('show', () => (document.documentElement.style.overflowY = 'hidden'));
dialog.on('hide', () => (document.documentElement.style.overflowY = ''));