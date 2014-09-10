describe("Formula", function(){

  var cells = [];
  var cell1, cell2, cell3, cell4, cell5, targetCell;

  cell1 = new Cell();
  cell2 = new Cell();
  cell3 = new Cell();
  cell4 = new Cell();
  cell5 = new Cell();
  targetCell = new Cell();

  cells = [cell1, cell2, cell3, cell4, cell5];

  var formula = new Formula(targetCell, cells, function() {return 10;});

  beforeEach(function(){

    cell1.setValue(10);
    cell2.setValue(20);
    cell3.setValue(30);
    cell4.setValue(40);
    cell5.setValue(50);


    spyOn(formula, 'init').andCallThrough();
  });

  afterEach(function(){
    formula = new Formula(targetCell, cells, function() {return 10;});
  });

  it('should be available', function(){
    expect(formula.init).toBeDefined();
    var fn = Calculations.sum;
    formula.init(targetCell, cells, Calculations.sum);
    expect(formula.init).toHaveBeenCalled();
  });

});