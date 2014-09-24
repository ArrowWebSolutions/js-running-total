var Formatter = new function() {
  this.defaultOptions = {
    thousandsSeparator: ',',
    decimalPoint: '.',
    precision: 0,
    currencySymbol: '£'
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
    if (isNaN(number)) return value;

    return this._addSeparators(number.toFixed(options.precision), options.thousandsSeparator);
  };

  this._addSeparators = function(value, separator) {
    if (typeof separator === 'undefined') separator = this.defaultOptions.thousandsSeparator;

    value += '';
    var parts = value.split('.');
    var integer = parts[0];
    var decimal = parts.length > 1 ? '.' + parts[1] : '';
    var regEx = /(\d+)(\d{3})/;
    while (regEx.test(integer)) {
      integer = integer.replace(regEx, '$1' + separator + '$2');
    }
    return integer + decimal;
  };

  this._extend = function(obj1, obj2) {
    if (obj1 && obj2) {
      for (var attrname in obj2) {
        obj1[attrname] = obj2[attrname];
      }
    }
    return obj1;
  };
};