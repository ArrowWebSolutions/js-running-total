/**
 * Stores all the built in calculations we perform.
 */

var Calculations = {
  /* Base calculation that performs some maths on the cells */
  _simple: function(cells, operand) {
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
  },
  sum: function(cells) {
    return this._simple(cells, '+');
  },
  subtract: function(cells) {
    return this._simple(cells, '-');
  },
  multiply: function(cells) {
    return this._simple(cells, '*');
  },
  divide: function(cells) {
    return this._simple(cells, '/');
  },
  power: function(cells) {
    return this._simple(cells, '^');
  },
  pow: function(cells) {
    return this.power(cells);
  },
  max: function(cells) {
    return this._simple(cells, 'max');
  },
  min: function(cells) {
    return this._simple(cells, 'min');
  }
};