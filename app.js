const StringCalculator = require("./lib/calculate")
const prompt = require('prompt-sync')();

const stringCalc = new StringCalculator();
const userInput = prompt("Please enter string of Integers:");
console.log(typeof userInput);
try{
  console.log("Sum of all the integers in the given string is : ", stringCalc.add(userInput))
}catch(e){
  console.log("Error performing addition",e)
}
