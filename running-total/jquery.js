(function() {
	$.fn.runningTotal = function(options) {
		var settings = $.extend({
			cells: [],
			calculation: 'sum',
			filter: function(value) { return value; }
		}, options);

		this.each(function(){
			var total = $.fn.runningTotal.getCell.call($(this));
			var cells = [];

			$.each(settings.cells, function() {
				var cell = $.fn.runningTotal.getCell.call(this);
				cell.setValue($.fn.runningTotal.getValue.call(this, settings.filter));
				
				cells.push(cell);

				this.on('blur', function() {
					cell.setValue($.fn.runningTotal.getValue.call($(this, settings.filter)));
				});
			});
			
			var self = this;

			total.addCompleteListener({
				targetChanged: function () {
					var t = this.getValue();

					if (settings.format) {
						t = Format.format(t, settings.format);	
					}

					$.fn.runningTotal.setValue.call($(self), t);
				}
			});

			var formula = new Formula(cells, total, settings.calculation);
		});
	};

	$.fn.runningTotal.getValue = function(filter) {
		var str = '';
		var f = null;

		if (typeof filter == 'string') {
			f = Filter.filters[filter];
		} else if (typeof filter == 'function') {
			f = filter;
		} else if (filter != null) {
			f = filter.filter;
		}

		if (this.prop('tagName').toLowerCase() == 'input') {
			str = this.val();
		} else {
			str = this.text();
		}

		if (f !== null) str = f(str);

		if (!isNaN(parseFloat(str)) && isFinite(parseFloat(str))) {
			return parseFloat(str);
		} else {
			return str;
		}
	};

	$.fn.runningTotal.setValue = function(value) {
		if (this.prop('tagName').toLowerCase() == 'input') {
			this.val(value);
		} else {
			this.text(value);
		}
		return this;
	};

	$.fn.runningTotal.getCell = function() {
		if (this.data('runningTotal.cell') == null) {
			this.data('runningTotal.cell', new Cell());
		}
		return this.data('runningTotal.cell');
	};
})(jQuery);