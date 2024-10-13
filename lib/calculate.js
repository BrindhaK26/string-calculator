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
      let numList = this.splitNumbers(str, delimiters);
      return numList.reduce((sum, n) => sum + n);
    }
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