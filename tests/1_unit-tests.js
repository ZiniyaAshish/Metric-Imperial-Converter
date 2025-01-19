const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite('Function convertHandler.getNum(input)', function () {
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
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach((unit, i) => {
        assert.equal(convertHandler.getReturnUnit(unit), expected[i]);
      });
    });

    test('Return error for invalid return unit', function () {
      assert.equal(convertHandler.getReturnUnit('invalidUnit'), 'invalid unit');
    });

    test('Correctly spell out each valid unit', function () {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const expected = [
        'gallons',
        'liters',
        'miles',
        'kilometers',
        'pounds',
        'kilograms',
      ];
      input.forEach((unit, i) => {
        assert.equal(convertHandler.spellOutUnit(unit), expected[i]);
      });
    });

    test('Correctly convert gal to L', function () {
      assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.0001);
    });

    test('Correctly convert L to gal', function () {
      assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.0001);
    });

    test('Correctly convert mi to km', function () {
      assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.0001);
    });

    test('Correctly convert km to mi', function () {
      assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.0001);
    });

    test('Correctly convert lbs to kg', function () {
      assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.0001);
    });

    test('Correctly convert kg to lbs', function () {
      assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.0001);
    });
  });
});
