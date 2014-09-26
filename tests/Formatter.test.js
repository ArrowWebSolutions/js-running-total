describe("Format", function(){

  var cells = [];
  var cell1, cell2, cell3, cell4, cell5, targetCell;

  cell1 = new Cell();
  cell2 = new Cell();
  cell3 = new Cell();
  cell4 = new Cell();
  cell5 = new Cell();
  targetCell = new Cell();

  cells = [cell1, cell2, cell3, cell4, cell5];

  beforeEach(function(){

    cell1.setValue(10);
    cell2.setValue(20);
    cell3.setValue(30);
    cell4.setValue(40);
    cell5.setValue(50);

  });

  afterEach(function(){

  });

  it('should be available', function(){
    expect(Formatter).toBeDefined();
    expect(Formatter.format).toBeDefined();
  });

  it('should format a number', function(){
    expect(Formatter.format(1000, 'number')).toEqual('1,000');
    expect(Formatter.format(1000, 'number', {precision: 2})).toEqual('1,000.00');
    expect(Formatter.format(1000, 'number', {thousandsSeparator: '.', decimalPoint: ',', precision: 3})).toEqual('1.000,000');
    expect(Formatter.format(10000000, 'number')).toEqual('10,000,000');

    //alternative format
    expect(Formatter.number(10000)).toEqual('10,000');
    //rounding
    expect(Formatter.number(99.99)).toEqual('100');
  });

  it('should format currency', function() {
    expect(Formatter.format(1000, 'currency')).toEqual('£1,000.00');
    expect(Formatter.format('1000', 'currency', {precision: 0})).toEqual('£1,000');
    expect(Formatter.format(1000000, 'currency', {currencySymbol: '$'})).toEqual('$1,000,000.00');

    //alternative format
    expect(Formatter.currency(54321)).toEqual('£54,321.00');
    //rounding
    expect(Formatter.currency(99.99)).toEqual('£99.99');
    expect(Formatter.currency(99.999)).toEqual('£100.00');
  });

  it('should format percentage', function() {
    expect(Formatter.format(0.1, 'percentage')).toEqual('10%');
    expect(Formatter.format('1.2', 'percentage')).toEqual('120%');
    expect(Formatter.format(1.234, 'percentage', {precision: 2})).toEqual('123.40%');
    expect(Formatter.format(10, 'percentage', {percentageMultiplyer: 1})).toEqual('10%');

    //rounding
    expect(Formatter.percentage(0.9999)).toEqual('100%');
    expect(Formatter.percentage(0.9999, {precision: 2})).toEqual('99.99%');
  });

  it('should display an nice result when the actual result is invalid', function() {
    expect(Formatter.format(NaN, 'number')).toEqual(0);
    expect(Formatter.format(NaN, 'percentage')).toEqual('0%');
  });

});