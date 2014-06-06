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

  var noop = function() {};


  it("should reduce argument number", function(done) {
    shittyFunction(rarity(2, function(err, result) {
      should(err).eql(null);
      result.should.eql(EXPECTED_RESULT);
      arguments.should.have.lengthOf(2);
      done();
    }));
  });

  for(var i = 0; i < 4; i += 1) {
    it("rarity(" + i + ", cb)", function(done) {
      shittyFunction(rarity(i, function() {
        arguments.should.have.lengthOf(i);
        done();
      }));
    });
  }

  it("should work with not enough argument", function(done) {
    shittyFunction(rarity(200, function(err, result) {
      should(err).eql(null);
      result.should.eql(EXPECTED_RESULT);
      arguments.should.have.lengthOf(4);
      done();
    }));
  });

  it("should fail with non-integer value", function(done) {
    try {
      shittyFunction(rarity(4.023, noop));
    }
    catch(e) {
      return done();
    }

    done(new Error("Should not be working"));
  });

  it("should fail with negative value", function(done) {
    try {
      shittyFunction(rarity(-4, noop));
    }
    catch(e) {
      return done();
    }

    done(new Error("Should not be working"));
  });
});
