"use strict";

var should = require('should');
var rarity = require('../');

describe('Argument padder', function() {
  var EXPECTED_RESULT = "expectedResult";

  var shittyFunction = function(cb) {
    process.nextTick(function() {
      cb(EXPECTED_RESULT);
    });
  };

  it("should pad argument", function(done) {
    shittyFunction(rarity([null], function(err, result) {
      should(err).eql(null);
      result.should.eql(EXPECTED_RESULT);
      arguments.should.have.lengthOf(2);
      done();
    }));
  });

  it("should pad multiple arguments", function(done) {
    shittyFunction(rarity([1, 2, 3], function(c1, c2, c3, result) {
      c1.should.eql(1);
      c2.should.eql(2);
      c3.should.eql(3);
      result.should.eql(EXPECTED_RESULT);
      arguments.should.have.lengthOf(4);
      done();
    }));
  });
});
