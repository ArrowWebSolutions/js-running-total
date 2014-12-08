/**
 * Simple cell object, stores a value and notifies
 * it's listeners on a value change.
 * @param {var} value the value to initialise to
 */
function Cell(value)
{
  this.listeners = [];
  this.value = null;
  this.init(value);
  this.formatter = null;
}

/**
 * Initialisation function
 *
 * @param  {var} value the initial value
 * @return {void}
 */
Cell.prototype.init = function(value) {
  this.setValue(value);
};

/**
 * Sets the value for the cell.
 * @param {var} value the value to set
 * @return {object} returns the current object
 */
Cell.prototype.setValue = function(value) {
  this.value = value;
  this.changed();
  return this;
};

/**
 * Gets the cells current value
 * @return {var} The current value of the cell
 */
Cell.prototype.getValue = function() {
  return this.value;
};

/**
 * Adds a listener to the cell, these listeners are
 * called when the cells value is changed.
 *
 * @param {object} listener the listener object
 */
Cell.prototype.addListener = function(listener) {
  this.listeners.push(listener);
  return this;
};

/**
 * Function that is called when the cells value is changed.
 * This notifies all the listeners that the value has changed.
 *
 * @return {void}
 */
Cell.prototype.changed = function() {
  for (var i = 0; i < this.listeners.length; i++) {
    this.listeners[i].targetChanged(this);
  }
};

/**
 * Add a formatter to the cell
 * @param {string|function} formatter
 * @param {object} options   the options to pass to the formatter function
 */
Cell.prototype.setFormatter = function(formatter, options) {
  if (typeof formatter === 'function') {
    this.formatter = function(value) {
      return formatter(value, options);
    }
  } else {
    this.formatter = function(value) {
      return Formatter.format(value, formatter, options);
    };
  }
};


/**
 * Gets the formatted value for the cell
 * @return {var} the formatted value
 */
Cell.prototype.getFormattedValue = function() {
  if (this.formatter)
  {
    return this.formatter(this.getValue());
  }
  return this.getValue();
};