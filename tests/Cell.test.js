describe("Cell", function(){

  var cell = new Cell();

  beforeEach(function(){
    spyOn(cell, 'init').andCallThrough();
    spyOn(cell, 'changed').andCallThrough();
  });

  afterEach(function(){
    cell = new Cell();
  });

  it('should be able to initialise', function(){
    expect(cell.init).toBeDefined();
    cell.init();
    expect(cell.init).toHaveBeenCalled();
  });

  it('should set value on initialise', function(){
    cell.init(100);
    expect(cell.getValue()).toEqual(100);
  });

  it('should set value', function(){
    cell.init(100);
    cell.setValue(200);
    expect(cell.getValue()).toEqual(200);
  });

  it('should set value and notify', function(){
    cell.init(10);
    cell.setValue(200);
    expect(cell.changed).toHaveBeenCalled();
  });

  it('should add a listener', function(){
    cell.init('');
    var listeners = cell.listeners.length;
    cell.addListener({name: 'test'});
    expect(cell.listeners.length).toEqual(listeners + 1);
  });

  it('should be able to use a formatter', function(){
    cell.init(1000);
    cell.setFormatter('number');
    expect(cell.getFormattedValue()).toEqual('1,000');
    cell.setFormatter('currency');
    expect(cell.getFormattedValue()).toEqual('£1,000.00');
    //custom formatters
    cell.setFormatter(function(value) {
      return 'Test' + value;
    });
    expect(cell.getFormattedValue()).toEqual('Test1000');
    //customer formattters with options
    cell.setFormatter(function(value, options){
      return options.prefix + value + options.suffix;
    }, {
      prefix: 'Test',
      suffix: 'Boo'
    });
    expect(cell.getFormattedValue()).toEqual('Test1000Boo');
  });

});