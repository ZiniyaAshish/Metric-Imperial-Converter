const chai = require('chai');
const assert = chai.assert; // Ensure assert is defined
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite('Function convertHandler', function () {
      test('Correctly read a whole number input', function () {
        assert.equal(convertHandler.getNum('32L'), 32);
      });
  
      test('Correctly read a decimal number input', function () {
        assert.equal(convertHandler.getNum('3.14kg'), 3.14);
      });
  
      test('Correctly read a fractional input', function () {
        assert.equal(convertHandler.getNum('1/2km'), 0.5);
      });
  
      test('Correctly read a fractional input with a decimal', function () {
        assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8);
      });
  
      test('Return error for double fraction', function () {
        assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
      });
  
      test('Default to 1 when no numerical input provided', function () {
        assert.equal(convertHandler.getNum('kg'), 1);
      });
  
      test('Correctly read each valid input unit', function () {
        ['gal', 'L', 'mi', 'km', 'lbs', 'kg'].forEach((unit) =>
          assert.equal(convertHandler.getUnit(unit), unit)
        );
      });
  
      test('Return error for invalid input unit', function () {
        assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
      });
  
      test('Correctly return returnUnit for valid input unit', function () {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
      });
  
      test('Correctly convert gal to L', function () {
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
      });
    });
  });
  