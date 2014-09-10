describe("Calculations", function(){

  var cells = [];

  beforeEach(function(){
    cell1 = new Cell();
    cell2 = new Cell();
    cell3 = new Cell();

    cells = [cell1, cell2, cell3];

    cell1.setValue(10);
    cell2.setValue(20);
    cell3.setValue(30);
  });

  afterEach(function(){

  });

  it('should be available', function(){
    expect(Calculations).toBeDefined();
  });

  it('should include our base calculations', function(){
    expect(Calculations.sum).toBeDefined();
    expect(Calculations.subtract).toBeDefined();
  });

  it('should be able to sum', function(){
    expect(Calculations.sum(cells)).toEqual(60);
  });
});