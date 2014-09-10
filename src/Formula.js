/**
 * A formula is a calculation, it acts on one or more cells and
 * stores the result in a target cell.
 */

/**
 * Create a new forumla objec
 * @param Cell targetCell          the Cell to store the result of the calculation
 * @param [Cell] watchedCells        array of Cells to use in the calculation
 * @param string|function calculationFunction the calculation function, can be a string
 * for an existing function. Or a function variable.
 */
function Formula(targetCell, watchedCells, calculationFunction) {
  this.watchedCells = [];
  this.targetCell = null;
  this.calculationFunction = null;

  this.init(targetCell, watchedCells, calculationFunction);
};

/**
 * Initialise the object, set up the cells, function etc.
 *
 * @param Cell targetCell          the Cell to store the result of the calculation
 * @param [Cell] watchedCells        array of Cells to use in the calculation
 * @param string|function calculationFunction the calculation function, can be a string
 * for an existing function. Or a function variable.
 * @return void
 */
Formula.prototype.init = function(targetCell, watchedCells, calculationFunction) {
  this.targetCell = targetCell;
  this.watchedCells = watchedCells;

  this.setCalculationFunction(calculationFunction);

  var self = this;
  for (var i = 0; i < this.watchedCells.length; i++) {
    this.watchedCells[i].addListener(self);
  }

  //finally, perform a calculation so the target
  this.calculate();
};

/**
 * Sets the calculation function used on the cells
 *
 * @param string|function calculationFunction the calculation function to use.
 */
Formula.prototype.setCalculationFunction = function(calculationFunction) {
  //if it's a string, get from our calculations
  if (typeof calculationFunction === 'function') {
    this.calculationFunction = calculationFunction;
  } else {
    this.calculationFunction = Calculations[calculationFunction];
  }
};

/**
 * This is the function that is called by the Cell when it changes
 */
Formula.prototype.targetChanged = function(cell) {
  //since we already set this up, we don't really care about the cell
  this.calculate();
};

/**
 * Performs the calculation and sets the value of the target cell
 * @return {[type]} [description]
 */
Formula.prototype.calculate = function() {
  var value = this.calculationFunction(this.watchedCells);
  this.targetCell.setValue(value);
};