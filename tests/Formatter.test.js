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
  });

  it('should format a number', function(){
    expect(Formatter.format(1000, 'number')).toEqual('1,000');
    expect(Formatter.format(1000, 'number', {precision: 2}).toEqual('1,000.00'));
    expect(Formatter.format(1000, 'number', {thousandsSeparator: '.', decimalPoint: ',', precision: 3})).toEqual('1.000,000');
  });

});