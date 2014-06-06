"use strict";

var should = require('should');
var rarity = require('../');

describe('Argument slicer', function() {
  var EXPECTED_RESULT = "expectedResult";

  var shittyFunction = function(cb) {
    process.nextTick(function() {
      cb(null, EXPECTED_RESULT, "useless", "evenMoreUseless");
    });
  };

  it("should reduce argument number", function(done) {
    shittyFunction(rarity(2, function(err, result) {
      should(err).eql(null);
      result.should.eql(EXPECTED_RESULT);
      arguments.should.have.lengthOf(2);
      done();
    }));
  });
});
