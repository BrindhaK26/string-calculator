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
})