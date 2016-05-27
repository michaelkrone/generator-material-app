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

  it('should be a constant object', function () {
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
    output.str.should.equal(input.str);
    output.obj.should.equal(input.obj);
    output.nested.should.equal(input.nested);

    output.date.should.eql(now);
    output.nested.date.should.eql(now);
  });

});
