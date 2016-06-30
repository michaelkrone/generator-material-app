'use strict';

describe('Constant: DateInterceptor', function () {

  // load the constant's module
  beforeEach(module('<%= scriptAppName %>'));

  // instantiate service
  var constant;

  beforeEach(inject(function (_DateInterceptor_) {
    constant = _DateInterceptor_;
  }));

  it('should be defined', function () {
    Should.exist(constant);
  });

  it('should convert ISO string to date', function () {
    var normalString = 'normal string';
    var normalObject = {normal: 'object'};

    var now = new Date();
    var input = {
      str: normalString,
      obj: normalObject,
      date: now.toISOString(),
      nested: {
        date: now.toISOString(),
      }
    };
    var output = constant(input);

    output.should.equal(input);
    output.str.should.equal(normalString);
    output.obj.should.equal(normalObject);

    output.date.should.eql(now);
    output.nested.date.should.eql(now);
  });

  it('should not convert normal string containing numbers to date', function () {
    var normalStringWithNumbers = 'no2r3m4a5l string';

    var input = {
      str: normalStringWithNumbers,
    };
    var output = constant(input);
    output.str.should.equal(normalStringWithNumbers);
  });

});
