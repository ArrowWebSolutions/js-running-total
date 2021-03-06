var Formatter = new function() {
  this.defaultOptions = {
    thousandsSeparator: ',',
    decimalPoint: '.',
    precision: 0,
    currencySymbol: '£',
    percentageSymbol: '%',
    invalidValue: 0
  };

  /**
   * Formats a value
   * @param  {var} value   the value to format
   * @param  {string|function} type either a defined formatter as a string, or a custom function
   * @param  {object} options options to pass through to the formatter function
   * @return {var}         formatted object
   */
  this.format = function(value, type, options) {
    if (typeof type === 'function') {
      return type(value, options);
    } else {
      return this[type](value, options);
    }
  };

  this.number = function(value, options) {
    options = this._extend(this.defaultOptions, options);
    var number = parseFloat(value);
    if (isNaN(number) || !isFinite(number)) number = options.invalidValue;

    var fixed = this._toFixed(number, options.precision, options.decimalPoint);
    return this._addSeparators(fixed, options.thousandsSeparator, options.decimalPoint);
  };

  this.currency = function(value, options) {
    if (typeof options === 'undefined') options = {};
    if (typeof options.precision === 'undefined') options.precision = 2;

    var val = this.number(value, options);
    options = this._extend(this.defaultOptions, options);

    return options.currencySymbol + val;
  }

  this.percentage = function(value, options) {
    if (typeof options === 'undefined') options = {};
    if (typeof options.percentageMultiplyer === 'undefined') options.percentageMultiplyer = 100;
    var number = parseFloat(value);
    number = number * options.percentageMultiplyer;
    var val = this.number(number, options);
    options = this._extend(this.defaultOptions, options);

    return val + options.percentageSymbol;
  };

  this._toFixed = function(value, precision, decimalPoint) {
    if (typeof decimalPoint === 'undefined') decimalPoint = this.defaultOptions.decimalPoint;
    return value.toFixed(precision).replace('.', decimalPoint);
  }

  this._addSeparators = function(value, separator, decimalPoint) {
    if (typeof separator === 'undefined') separator = this.defaultOptions.thousandsSeparator;
    if (typeof decimalPoint === 'undefined') decimalPoint = this.defaultOptions.decimalPoint;

    value += '';
    var parts = value.split(decimalPoint);
    var integer = parts[0];
    var decimal = parts.length > 1 ? decimalPoint + parts[1] : '';
    var regEx = /(\d+)(\d{3})/;
    while (regEx.test(integer)) {
      integer = integer.replace(regEx, '$1' + separator + '$2');
    }
    return integer + decimal;
  };

  this._extend = function(obj1, obj2) {
    if (obj1 && obj2) {
      var o1 = {};
      for (var attrname in obj1) {
        o1[attrname] = obj1[attrname];
      }
      for (var attrname in obj2) {
        o1[attrname] = obj2[attrname];
      }
      return o1;
    }
    return obj1;
  };
};