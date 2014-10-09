/**
 * Stores all the built in calculations we perform.
 */

var Calculations = new function() {
  /* Base calculation that performs some maths on the cells */
  this._simple = function(cells, operand) {
    if (cells.length <= 0) return 0;
    //clone cells so we don't shift them
    var nCells = cells.slice(0);
    //our cells will either store a numeric value, or string.
    //since we are doing maths, assume numeric
    var total = parseFloat(nCells.shift().getValue());
    //correct, since it's a maths value
    //TODO: See if there is a better / more appropriate way to
    //deal with errors, rather than setting to 0
    total = isNaN(total) ? 0 : total;
    for (var i = 0; i < nCells.length; i++) {
      var value = parseFloat(nCells[i].getValue());
      switch (operand) {
        case '+':
          total += value;
          break;
        case '-':
          total -= value;
          break;
        case '*':
          total *= value;
          break;
        case '/':
          total /= value;
          break;
        case '^':
          total = Math.pow(total, value);
          break;
        case 'min':
          total = Math.min(total, value);
          break;
        case 'max':
          total = Math.max(total, value);
          break;
      }
    }

    return total;
  };
  this.sum = function(cells) {
    return this._simple(cells, '+');
  };
  this.subtract= function(cells) {
    return this._simple(cells, '-');
  };
  this.multiply= function(cells) {
    return this._simple(cells, '*');
  };
  this.divide = function(cells) {
    return this._simple(cells, '/');
  };
  this.power = function(cells) {
    return this._simple(cells, '^');
  };
  this.pow = function(cells) {
    return this.power(cells);
  };
  this.max = function(cells) {
    return this._simple(cells, 'max');
  };
  this.min = function(cells) {
    return this._simple(cells, 'min');
  };
};