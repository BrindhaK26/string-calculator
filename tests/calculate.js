const StringCalculator =  require("../lib/calculate");
const expect = require("chai").expect;

describe('Testing the Add Functions', function() {
    let stringCalculator;
    before(()=>{
        stringCalculator = new StringCalculator();
    })
    it("1. Add accepts n no.of inputs serperated by ',' as delimiter", function(done) {
        expect(stringCalculator.add("1,2,6,3,6,,7")).to.equal(25);
        done();
    });
    it("1. return 0 when empty string is passed", function(done) {
        expect(stringCalculator.add("")).to.equal(0);
        done();
    });
})