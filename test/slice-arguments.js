"use strict";

var should = require('should');
var rarity = require('../lib/');

describe('rarity.slice()', function() {
  var EXPECTED_RESULT = "expectedResult";

  var shittyFunction = function(cb) {
    process.nextTick(function() {
      cb(null, EXPECTED_RESULT, "useless", "evenMoreUseless");
    });
  };

  var noop = function() {};

  it("should reduce argument number", function(done) {
    shittyFunction(rarity.slice(2, function(err, result) {
      should(err).eql(null);
      result.should.eql(EXPECTED_RESULT);
      arguments.should.have.lengthOf(2);
      done();
    }));
  });

  for(var i = 0; i < 4; i += 1) {
    it("rarity.slice(" + i + ", cb)", function(done) {
      shittyFunction(rarity.slice(i, function() {
        arguments.should.have.lengthOf(i);
        done();
      }));
    });
  }

  it("should work with not enough argument", function(done) {
    shittyFunction(rarity.slice(200, function(err, result) {
      should(err).eql(null);
      result.should.eql(EXPECTED_RESULT);
      arguments.should.have.lengthOf(4);
      done();
    }));
  });

  it("should fail with non-integer value", function(done) {
    try {
      shittyFunction(rarity.slice(4.023, noop));
    }
    catch(e) {
      e.toString().should.containDeep('must be a positive integer');
      return done();
    }

    done(new Error("Should not be working"));
  });

  it("should fail with negative value", function(done) {
    try {
      shittyFunction(rarity.slice(-4, noop));
    }
    catch(e) {
      e.toString().should.containDeep('must be a positive integer');
      return done();
    }

    done(new Error("Should not be working"));
  });

  it("should fail without function as second argument", function(done) {
    try {
      rarity.slice(4, 4);
    }
    catch(e) {
      e.toString().should.containDeep('must be a function');
      return done();
    }

    done(new Error("Should not be working"));
  });
});
