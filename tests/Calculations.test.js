describe("Calculations", function(){

  var targetCell = new Cell();
  var watchedCells = [];

  beforeEach(function(){
    targetCell = new Cell();
    cell1 = new Cell();
    cell2 = new Cell();
    cell3 = new Cell();

    watchedCells = [cell1, cell2, cell3];

    cell1.setValue(10);
    cell2.setValue(20);
    cell3.setValue(30);
  });

  afterEach(function(){

  });

  it('should be available', function(){
    expect(Calculations).toBeDefined();
  });
});