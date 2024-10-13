const StringCalculator =  require("../lib/calculate");
const expect = require("chai").expect;

describe("Testing the Add Functions", function() {
  let stringCalculator;
  beforeEach(()=>{
    stringCalculator = new StringCalculator();
  })
  it("should accept single input", (done) => {
    expect(stringCalculator.add("1")).to.equal(1);
    done();
  });
  
  it("should accept 2 inputs serperated by ',' as delimiter", (done) => {
    expect(stringCalculator.add("1,2")).to.equal(3);
    done();
  });

  it("should accept n no.of inputs serperated by ',' as delimiter", function(done) {
    expect(stringCalculator.add("1,2,6,3,6,,7")).to.equal(25);
    done();
  });

  it("return 0 when empty string is passed", function(done) {
    expect(stringCalculator.add("")).to.equal(0);
    done();
  });

  it("should count how many times Add() was called", (done) => {
    stringCalculator.add("1,2");
    stringCalculator.add("3,4");
    expect(stringCalculator.GetCalledCount()).to.equal(2);
    done();
  });

  it("should handle new lines as delimiters", () => {
    expect(stringCalculator.add('1\n2,3')).to.equal(6);
  });
  
  it("should support different delimiters", () => {
    expect(stringCalculator.add('//;\n1;2')).to.equal(3); // Test for custom single-character delimiter
  });

  it("should support delimiters of any length", () => {
    expect(stringCalculator.add('//[***]\n1***2***3')).to.equal(6);
  });

  it("should support multiple delimiters", () => {
    expect(stringCalculator.add('//[*][%]\n1*2%3')).to.equal(6);
  });

  it("should support multiple delimiters with length longer than one char", () => {
    expect(stringCalculator.add('//[**][%%]\n1**2%%3')).to.equal(6);
  });
  it("should throw an error for negative numbers", () => {
    expect(() => stringCalculator.add('1,-2')).to.throw('Negatives not allowed: -2');
  });

  it("should throw an error for multiple negative numbers", () => {
    expect(() => stringCalculator.add('1,-2,-3')).to.throw('Negatives not allowed: -2, -3');
  });

  it("should ignore numbers larger than 1000", () => {
    expect(stringCalculator.add('2,1001')).to.equal(2);
  });
  it("should throw an error for invalid input format with misplaced delimiters", () => {
    expect(() => stringCalculator.add('1,\n2')).to.throw('Invalid input format');
  });

  it("should throw an error if the input ends with a delimiter", () => {
    expect(() => stringCalculator.add('1,2,')).to.throw('Invalid input format');
    expect(() => stringCalculator.add('1\n2\n')).to.throw('Invalid input format');
  });
})