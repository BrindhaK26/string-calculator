 const _ =  require("lodash");

class StringCalculator{
  constructor() {
    this.calledCount = 0;
  }

  add(str){
    this.calledCount++;
    let result = 0;
    if(typeof str != "string"){
      throw new Error("Unexpected Type : Expected String as arugument");
    }
    else {
      if(!str){ // Empty String case
        return result;
      }
      let delimiters = [',', '\n'];
      let customDelimiters = str.match(/^\/\/(\[.*?\]|\D)\n/);
      if (customDelimiters) {
        const delimiterPart = customDelimiters[0];
        str = str.slice(delimiterPart.length);

        // Extracting custom delimiters (handle both single and multiple character delimiters)
        if (delimiterPart.startsWith('//[')) {
          delimiters = delimiterPart.match(/\[(.*?)\]/g).map(d => d.slice(1, -1));
        } else {
          delimiters = [delimiterPart[2]];  // Single character custom delimiter
        }
      }
      if (this.hasInvalidFormat(str)) {
        throw new Error('Invalid input format');
      }
      let numList = this.splitNumbers(str, delimiters);
      let negatives = numList.filter(n => n < 0);
      if (negatives.length > 0) {
        throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
      }
      return numList.reduce((sum, n) => sum + ( n < 1000 ? n : 0 ));// ignore numbers greater than 1000 
    }
  }
  hasInvalidFormat(numbers) {
    const invalidPattern = /[,|\n]$/;  // Ends with a comma or newline
    const misplacedDelimiters = /,\n|\n,/;  // Misplaced delimiter combinations

    return invalidPattern.test(numbers) || misplacedDelimiters.test(numbers);
  }

  splitNumbers(str, delimiters) {
    const delimiterRegex = new RegExp(`[${delimiters.map(d => this.escapeRegExp(d)).join('|')}]`);
    return str.split(delimiterRegex).map(n => parseInt(n) || 0);
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special regex chars
  }

  GetCalledCount() {
    return this.calledCount;
  }
}

module.exports = StringCalculator;