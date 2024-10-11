const _ =  require("lodash");

class StringCalculator{
  constructor(){}

  add(str){
    let result = 0;
    if(typeof str != "string"){
      throw new Error("Unexpected Type : Expected String as arugument");
    }
    else {
      if(str.length == 0){
        return result;
      }
      let sum=0;
      let num="";
      for ( let char in str){
        if(str[char]!= ","){
          num += (str[char]);
        }else{
          if(!_.isEmpty(num)){
            sum += parseInt(num);
            num = "";
          }
        }
      }
      if(!_.isEmpty(num)){
        sum += parseInt(num);
      }         
      result = sum;
    }
    return result;
  }
}

module.exports = StringCalculator;