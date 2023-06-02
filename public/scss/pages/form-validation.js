//Validation uitility functions

//check if the input is empty
const isEmpty = value => value === "" ? true : false;

const setUnknown = value => value === "" ? "Unknown" : value;

console.log(setUnknown(""));


//Validate coffee form