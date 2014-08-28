/**
 * Basic cell class, holds a value and listeners.
 * It will notifiy listeners when a value is changed.
 * 
 * @param mixed value the initial value of the cell
 */
function Cell(value) {
	this.listeners = [];
	this.completeListeners = [];
	this.value = null;
	this.init(value);
};

/**
 * Initialisation function
 * 
 * @param mixed value the inital value of the cell
 */
Cell.prototype.init = function (value) {
	this.setValue(value);
};

/**
 * Sets the value of the cell
 * 
 * @param mixed value the value
 */
Cell.prototype.setValue = function (value) {
	this.value = value;
	this.changed();
};

/**
 * Returns the value of the cell.
 * 
 * @return mixed       the current value of the cell
 */
Cell.prototype.getValue = function () {
	return this.value;
};

/**
 * Adds a listener to the Cell. Mainly used to chain cells
 * so they can notify each other when they change values.
 * 
 * @param listener listener the listener to add
 */
Cell.prototype.addListener = function (listener) {
	for (var i = 0; i < this.listeners.length; i++) {
		if (this.listeners[i] == listener) return;
	}
	this.listeners.push(listener);
};

/**
 * Adds a completed listener to the Cell. These listeners 
 * are fired after the normal listeners and are usually
 * used for formatting - i.e. you only want to format when
 * all the other work is complete.
 * 
 * @param listener listener the listener to add
 */
Cell.prototype.addCompleteListener = function (listener) {
	for (var i = 0; i < this.completeListeners.length; i++) {
		if (this.completeListeners[i] == listener) return;
	}
	this.completeListeners.push(listener);
}

/**
 * Notify all al the listeners that this cells value has changed
 */
Cell.prototype.changed = function() {
	this.notify();
	//when we have notified them all, then call our complete function
	this.notifyComplete();
};

/**
 * Protected.
 *
 * Loop through the listeners and notify this cell has changed.
 */
Cell.prototype.notify = function () {
	for (var i = 0; i < this.listeners.length; i++) {
		this.listeners[i].targetChanged.call(this);
	}
};

/**
 * Protected.
 *
 * Loop through the completed listeners and notify this cell has changed.
 */
Cell.prototype.notifyComplete = function() {
	for (var i = 0; i < this.completeListeners.length; i++) {
		this.completeListeners[i].targetChanged.call(this);
	}
};

/**
 * A class that executes some formula on a collection of cells
 * returns the result and sets the value of the target cell. It 
 * also takes a calculation formula - this can be a string, or 
 * an anonymous function.
 * 
 * @param array cells               an array of cells for the calculation
 * @param cell targetCell          the result of the calculation is saved 
 * into the target cell. 
 * @param mixed calculationFunction either a string (referencing a function
 * in Formula.prototype.calculations) or an anonymous function
 */
function Formula(cells, targetCell, calculationFunction) {
	this.cells = [];
	this.targetCell = null;
	this.calculationFunction = null;

	this.init(cells, targetCell, calculationFunction);
};

/**
 * Protected.
 *
 * Initialisation function, called by the constructor.
 * 
 * @param array cells               an array of cells for the calculation
 * @param cell targetCell          the result of the calculation is saved 
 * into the target cell. 
 * @param mixed calculationFunction either a string (referencing a function
 * in Formula.prototype.calculations) or an anonymous function
 */
Formula.prototype.init = function (cells, targetCell, calculationFunction) {
	this.cells = cells;
	this.targetCell = targetCell;

	var cf;
	if (typeof calculationFunction == 'string') {
		cf = Formula.prototype.calculations[calculationFunction];
	} else {
		cf = calculationFunction;
	}

	this.calculationFunction = cf;

	this.calculate();

	var self = this;

	for (var i = 0; i < cells.length; i++) {
		cells[i].addListener({
			targetChanged: function() {
				self.calculate();
			}
		});
	}
};

/**
 * Performs the calculation, sets the value of the target cell
 */
Formula.prototype.calculate = function() {
	var value = this.calculationFunction(this.cells);
	this.targetCell.setValue(value);
};

/**
 * A collection of available calculation methods. You can add
 * to this list.
 * 
 * @type {Object}
 */
Formula.prototype.calculations = {
	sum: function(cells) {
		return Formula.prototype.calculations._simple(cells, '+');
	},
	subtract: function(cells) {
		return Formula.prototype.calculations._simple(cells, '-');
	},
	multiply: function(cells) {
		return Formula.prototype.calculations._simple(cells, '*');
	},
	divide: function(cells) {
		return Formula.prototype.calculations._simple(cells, '/');
	},
	power: function(cells) {
		return Formula.prototype.calculations._simple(cells, '^');
	},
	pow: function(cells) {
		return Formula.prototype.calculations.power(cells);
	},
	max: function(cells) {
		return Formula.prototype.calculations._simple(cells, 'max');
	},
	min: function(cells) {
		return Formula.prototype.calculations._simple(cells, 'min');
	},
	concatinate: function(cells) {
		var str = '';
		for (var i = 0; i < cells.length; i++) {
			str += cells[i].getValue();
		}
		return str;
	},
	_simple: function(cells, operand) {
		var nCells = cells.slice(0);
		var total = parseFloat(nCells.shift().getValue());
		if (isNaN(total)) total = 0;
		for (var i = 0; i < nCells.length; i++) {
			var value = parseFloat(nCells[i].getValue());
			if (value != '') {
				switch (operand) {
					case '/':
						total /= value;
						break;
					case '*':
						total *= value;
						break;
					case '-':
						total -= value;
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
					case '+':
					default:
						total += value;
						break;
				}
			}
		}
		return total;
	}
};

var Format = {
	format: function(value, options) {
		var formatter;
		if (typeof options == 'string') {
			formatter = this.formatters[options];
		} else if (typeof options == 'function') {
			formatter = options;
		} else {
			if (typeof options.format == 'string') {
				formatter = this.formatters[options.format];
			} else if (typeof options.format == 'function') {
				formatter = options.format;
			} else {
				formatter = function (value) { return value; };
			}
		}

		return formatter(value, options);
	},
	formatters: {
		number: function(value, options) {
			var settings = {
				decimalPlaces: 2,
				thousandsSeperator: ',',
				decimal: '.'
			};

			//merge our settings
			for (var attrname in options) { settings[attrname] = options[attrname]; }

			if (!(Format.formatters._isOk(value))) return "N/A";
			if (settings.decimalPlaces >= 0) value = value.toFixed(settings.decimalPlaces);
			//cannot get a regex that doesn't transform the decimal part of the number as well!
			if (value.toString().indexOf('.') >= 0) {
				var whole = value.toString().substring(0, value.toString().indexOf(settings.decimal));
				var decimal = value.toString().substring(value.toString().indexOf(settings.decimal) + 1);
				return whole.split(/(?=(?:\d{3})+(?:\.|$))/g).join(settings.thousandsSeperator) + settings.decimal + decimal;
			} else {
				return value.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(settings.thousandsSeperator);
			}
		},
		currency: function(value, options) {
			var n = Format.formatters.number(value, options);
			return isNaN(parseFloat(n)) ? n : '£' + n;
		},
		percentage: function(value, options) {
			value *= 100;
			var n = Format.formatters.number(value, options);
			return isNaN(parseFloat(n)) ? n : n + '%';
		},
		_isOk: function(value) {
			return isFinite(value);
		}
	}
};

var Filter = {
	filter: function(value, options) {
		var f;
		if (typeof options == 'string') {
			f = filter.filters[options];
		} else if (typeof options == 'function') {
			f = options;
		} else {
			f = options.filter;
		}

		return f(value, options);
	},
	filters: {
		number: function(value, options) {
			var matches = value.match(/[\d\,]+\.?[\d]*/);
			return (matches == null) ? 0 : matches[0].replace(',', '');
		}
	}
};