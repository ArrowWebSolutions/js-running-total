describe("Total", function(){

  var cells = [];
  var a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4;

  beforeEach(function(){
    a1 = new Cell();
    a2 = new Cell();
    a3 = new Cell();
    a4 = new Cell();
    b1 = new Cell();
    b2 = new Cell();
    b3 = new Cell();
    b4 = new Cell();
    c1 = new Cell();
    c2 = new Cell();
    c3 = new Cell();
    c4 = new Cell();
  });

  afterEach(function(){

  });

  it('should be able to initialise', function(){
    expect(a1.init).toBeDefined();
  });

  it('should be able to do row totals', function(){
    a1.setValue(10);
    a2.setValue(30);
    a3.setValue(40);

    var rowA = [a1, a2, a3];
    formula = new Formula(a4, rowA, 'sum');

    expect(a4.getValue()).toEqual(80);
  });

});