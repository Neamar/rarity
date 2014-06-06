"use strict";

var should = require('should');
var rarity = require('../lib/');

describe('rarity.pad()', function() {
  var EXPECTED_RESULT = "expectedResult";

  var noop = function() {};
  var shittyFunction = function(cb) {
    process.nextTick(function() {
      cb(EXPECTED_RESULT);
    });
  };

  it("should fail with non array", function(done) {
    try {
      rarity.pad("nope", noop);
    }
    catch(e) {
      e.toString().should.containDeep('must be an array');
      return done();
    }

    done(new Error("Should not be working"));
  });

  it("should fail without function as second argument", function(done) {
    try {
      rarity.pad([], 4);
    }
    catch(e) {
      e.toString().should.containDeep('must be a function');
      return done();
    }

    done(new Error("Should not be working"));
  });

  it("should pad argument", function(done) {
    shittyFunction(rarity.pad([null], function(err, result) {
      should(err).eql(null);
      result.should.eql(EXPECTED_RESULT);
      arguments.should.have.lengthOf(2);
      done();
    }));
  });

  it("should pad multiple arguments", function(done) {
    shittyFunction(rarity.pad([1, 2, 3], function(c1, c2, c3, result) {
      c1.should.eql(1);
      c2.should.eql(2);
      c3.should.eql(3);
      result.should.eql(EXPECTED_RESULT);
      arguments.should.have.lengthOf(4);
      done();
    }));
  });
});
