function ConvertHandler() {
  const units = {
    gal: { returnUnit: 'L', factor: 3.78541, fullName: 'gallons' },
    L: { returnUnit: 'gal', factor: 1 / 3.78541, fullName: 'liters' },
    lbs: { returnUnit: 'kg', factor: 0.453592, fullName: 'pounds' },
    kg: { returnUnit: 'lbs', factor: 1 / 0.453592, fullName: 'kilograms' },
    mi: { returnUnit: 'km', factor: 1.60934, fullName: 'miles' },
    km: { returnUnit: 'mi', factor: 1 / 1.60934, fullName: 'kilometers' },
  };

  this.getNum = function(input) {
    let result;
    const numRegex = /^[0-9.\/]+/; // Matches numbers, decimals, and fractions
    const numMatch = input.match(numRegex);
  
    if (!numMatch) {
      return 1; // Default to 1 if no numerical input is provided
    }
  
    const numStr = numMatch[0];
  
    if (numStr.split('/').length > 2) {
      return 'invalid number'; // Double fraction error
    }
  
    try {
      result = eval(numStr); // Safely evaluate fraction or number
    } catch (e) {
      return 'invalid number';
    }
  
    return result;
  };  

  this.getUnit = function(input) {
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const unitRegex = /[a-zA-Z]+$/; // Matches the unit part at the end of input
    const unitMatch = input.match(unitRegex);
  
    if (!unitMatch) {
      return 'invalid unit';
    }
  
    const unit = unitMatch[0].toLowerCase();
    if (validUnits.includes(unit)) {
      return unit === 'l' ? 'L' : unit; // Return 'L' in uppercase
    }
  
    return 'invalid unit';
  };
  

  this.getReturnUnit = function (initUnit) {
    return units[initUnit]?.returnUnit || 'invalid unit';
  };

  this.spellOutUnit = function (unit) {
    return units[unit]?.fullName || 'invalid unit';
  };

  this.convert = function (initNum, initUnit) {
    const factor = units[initUnit]?.factor;
    if (!factor) return 'invalid unit';
    return parseFloat((initNum * factor).toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
