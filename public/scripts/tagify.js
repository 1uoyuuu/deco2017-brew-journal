import Tagify from '@yaireo/tagify';

let flavours = document.querySelector("input[name='coffeeFlavour']");
let tastingNote = document.querySelector("input[name='tastingNote']");
// init Tagify script on the above inputs
const tagify = new Tagify(flavours, {
    whitelist: [],
    maxTags: 8,
    dropdown: {
      maxItems: 20,           // <- mixumum allowed rendered suggestions
      classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
      enabled: 0,             // <- show suggestions on focus
      closeOnSelect: false    // <- do not hide the suggestions dropdown once an item has been selected
    }
});
const tagifyTwo = new Tagify(tastingNote, {
  whitelist: [],
  maxTags: 8,
  dropdown: {
    maxItems: 20,           // <- mixumum allowed rendered suggestions
    classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
    enabled: 0,             // <- show suggestions on focus
    closeOnSelect: false    // <- do not hide the suggestions dropdown once an item has been selected
  }
});