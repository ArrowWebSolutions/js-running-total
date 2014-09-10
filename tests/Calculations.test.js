describe("Calculations", function(){

  var cells = [];
  var cell1 = new Cell();
  var cell2 = new Cell();
  var cell3 = new Cell();

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
    expect(Calculations.multiply).toBeDefined();
    expect(Calculations.divide).toBeDefined();
    expect(Calculations.power).toBeDefined();
    expect(Calculations.pow).toBeDefined();
    expect(Calculations.max).toBeDefined();
    expect(Calculations.min).toBeDefined();
  });

  it('should be able to sum', function(){
    expect(Calculations.sum(cells)).toEqual(60);
    expect(Calculations.sum([cell1, cell2])).toEqual(30);
  });

  it('should be able to subtract', function() {
    expect(Calculations.subtract(cells)).toEqual(-40);
    expect(Calculations.subtract([cell3, cell2, cell1])).toEqual(0);
    expect(Calculations.subtract([cell3, cell1])).toEqual(20);
  });

  it('should be able to multiply', function(){
    expect(Calculations.multiply(cells)).toEqual(6000);
    expect(Calculations.multiply([cell1, cell3])).toEqual(300);
  });

  it('should be able to divide', function(){
    expect(Calculations.divide([cell3, cell1])).toEqual(3);
    expect(Calculations.divide([cell1, cell2])).toEqual(0.5);
  });

  it('should be able to power', function(){
    expect(Calculations.power([cell2, cell1])).toEqual(10240000000000);
  });

  it('should be able to get the max', function(){
    expect(Calculations.max(cells)).toEqual(30);
  });

  it('should be able to get the min', function(){
    expect(Calculations.min(cells)).toEqual(10);
  });
});