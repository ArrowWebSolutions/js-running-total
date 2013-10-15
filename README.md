Running Total
================

Keeps a running total in JavaScript. Includes various calculations, formatters and filters.

* Please note this project is in it's infancy, and the documentation is not up to scratch at the minute. Please feel free to play around however. :)*

## Usage

	var A1 = new Cell(100);
	var A2 = new Cell(200);
	var A3 = new Cell(300);

	//this is our total
	var A4 = new Cell();

	var sum = new Formula([A1, A2, A3], A4, 'sum');

	//outputs Total is: 600
	console.log('Total is: ' + A4.getValue());

	//change one of our cells
	A1.setValue(300);

	//outputs Total is: 800
	console.log('Total is: ' + A4.getValue());

This is a basic total, more complex useage is detailed below. But the most common use is to keep an eye on the DOM so we can update various elements when the user (or even programatically) updates elements.

The core.js file, is deliberately framework agnostic. You then use the supplied (only jQuery available at present!) files to plug it into your chosen framework.

## jQuery

For this example, we have four input elements #A1, #A2, #A3 and #A4

	$('#A4').runningTotal({
		cells: [
			$('#A1'),
			$('#A2'),
			$('#A3')
		],
		calculation: 'sum',
		format: 'currency',
		filter: 'number'
	});

This will now watch the input elements for changes and update #A4.

You can also chain these together, so you can use #A4 in a calculation:

	$('#A6').runningTotal({
		cells: [
			$('#A4'),
			$('#A5')
		],
		calculation: 'sum',
		format: 'currency',
		filter: 'number'
	});

Even when #A4 is updated programatically by our first function, A6 will get updated.

### filter
We introduced a new concept on the jQuery methods, filter; this is used to transform values read from the DOM. For example, our #A1 input box may have £100.00 as it's value - we can't use this in our calculation as such. So the 'number' filter transforms this to 100.00.
