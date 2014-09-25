describe("Total", function(){

  var cells = [];
  var a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, d1, d2, d3, d4;

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
    d1 = new Cell();
    d2 = new Cell();
    d3 = new Cell();
    d4 = new Cell();
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

  it('should be able to do more than one row total', function() {
    a1.setValue(100);
    a2.setValue(50);
    a3.setValue(20);
    b1.setValue(10);
    b2.setValue(-10);
    b3.setValue(20);
    c1.setValue(30);
    c2.setValue(20);
    c3.setValue(10);

    var rowA = [a1, a2, a3];
    var rowB = [b1, b2, b3];
    var rowC = [c1, c2, c3];

    var formulaA = new Formula(a4, rowA, 'subtract');
    var formulaB = new Formula(b4, rowB, 'sum');
    var formulaC = new Formula(c4, rowC, 'sum');


    expect(a4.getValue()).toEqual(30);
    expect(b4.getValue()).toEqual(20);
    expect(c4.getValue()).toEqual(60);
  });

  it('should be able to total totals', function() {
    a1.setValue(100);
    a2.setValue(50);
    a3.setValue(20);
    b1.setValue(10);
    b2.setValue(-10);
    b3.setValue(20);
    c1.setValue(30);
    c2.setValue(20);
    c3.setValue(10);

    var d4a = new Cell();

    var rowA = [a1, a2, a3];
    var rowB = [b1, b2, b3];
    var rowC = [c1, c2, c3];
    var rowD = [d1, d2, d3];
    var col1 = [a1, b1, c1];
    var col2 = [a2, b2, c2];
    var col3 = [a3, b3, c3];
    var col4 = [a4, b4, c4];

    var formulaA = new Formula(a4, rowA, 'sum');
    var formulaB = new Formula(b4, rowB, 'sum');
    var formulaC = new Formula(c4, rowC, 'sum');
    var formula1 = new Formula(d1, col1, 'sum');
    var formula2 = new Formula(d2, col2, 'sum');
    var formula3 = new Formula(d3, col3, 'sum');
    //total totals - test horizontally and vertically
    var formulaD = new Formula(d4, rowD, 'sum');
    var formula4 = new Formula(d4a, col4, 'sum');

    expect(a4.getValue()).toEqual(170);
    expect(b4.getValue()).toEqual(20);
    expect(c4.getValue()).toEqual(60);
    expect(d1.getValue()).toEqual(140);
    expect(d2.getValue()).toEqual(60);
    expect(d3.getValue()).toEqual(50);
    expect(d4.getValue()).toEqual(250);
    expect(d4a.getValue()).toEqual(250);
    expect(d4.getValue()).toEqual(d4a.getValue());

    c1.setValue(50);
    expect(c4.getValue()).toEqual(80);
    expect(d1.getValue()).toEqual(160);
    expect(d4.getValue()).toEqual(270);
    expect(d4a.getValue()).toEqual(270);
  });

});

describe("Total, resource checking", function(){
  var cells = [];
  var a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, d1, d2, d3, d4, d4a;

  beforeEach(function() {
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
    d1 = new Cell();
    d2 = new Cell();
    d3 = new Cell();
    d4 = new Cell();
    d4a = new Cell();

    spyOn(d1, 'setValue').andCallThrough();
    spyOn(d2, 'setValue').andCallThrough();
    spyOn(d3, 'setValue').andCallThrough();
    spyOn(d4, 'setValue').andCallThrough();
    spyOn(d4a, 'setValue').andCallThrough();
    spyOn(a4, 'setValue').andCallThrough();
    spyOn(b4, 'setValue').andCallThrough();
    spyOn(c4, 'setValue').andCallThrough();
  });

  it('should not call at the start', function(){
    expect(d1.setValue.calls.length).toEqual(0);
    expect(d2.setValue.calls.length).toEqual(0);
    expect(d3.setValue.calls.length).toEqual(0);
    expect(d4.setValue.calls.length).toEqual(0);
    expect(d4a.setValue.calls.length).toEqual(0);
  });

  it('should not call too many times', function(){
    a1.setValue(100);
    a2.setValue(50);
    a3.setValue(20);
    b1.setValue(10);
    b2.setValue(-10);
    b3.setValue(20);
    c1.setValue(30);
    c2.setValue(20);
    c3.setValue(10);

    var rowA = [a1, a2, a3];
    var rowB = [b1, b2, b3];
    var rowC = [c1, c2, c3];
    var rowD = [d1, d2, d3];
    var col1 = [a1, b1, c1];
    var col2 = [a2, b2, c2];
    var col3 = [a3, b3, c3];
    var col4 = [a4, b4, c4];

    var formulaA = new Formula(a4, rowA, 'sum');
    var formulaB = new Formula(b4, rowB, 'sum');
    var formulaC = new Formula(c4, rowC, 'sum');
    var formula1 = new Formula(d1, col1, 'sum');
    var formula2 = new Formula(d2, col2, 'sum');
    var formula3 = new Formula(d3, col3, 'sum');
    //total totals - test horizontally and vertically
    var formulaD = new Formula(d4, rowD, 'sum');
    var formula4 = new Formula(d4a, col4, 'sum');

    expect(d1.setValue.calls.length).toEqual(1);
    expect(d2.setValue.calls.length).toEqual(1);
    expect(d3.setValue.calls.length).toEqual(1);
    expect(d4.setValue.calls.length).toEqual(1);
    expect(d4a.setValue.calls.length).toEqual(1);

    c1.setValue(50);

    expect(d1.setValue.calls.length).toEqual(2);
    expect(d2.setValue.calls.length).toEqual(1);
    expect(c4.setValue.calls.length).toEqual(2);
    expect(d4.setValue.calls.length).toEqual(2);
    expect(d4a.setValue.calls.length).toEqual(2);

    a3.setValue(200);

    expect(a4.setValue.calls.length).toEqual(2);
    expect(d3.setValue.calls.length).toEqual(2);
    expect(d4.setValue.calls.length).toEqual(3);
    expect(d4a.setValue.calls.length).toEqual(3);
    expect(b4.setValue.calls.length).toEqual(1);
    expect(d2.setValue.calls.length).toEqual(1);
  });
});