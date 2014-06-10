"use strict";

var should = require('should');
var rarity = require('../lib/');

describe('rarity.sliceAndCarry()', function() {
  var EXPECTED_RESULT = "expectedResult";

  it("should fail without function as third argument", function(done) {
    try {
      rarity.carryAndSlice(4, [], "lol");
    }
    catch(e) {
      e.toString().should.containDeep('must be a function');
      return done();
    }

    done(new Error("Should not be working"));
  });

  it("should fail without number as second argument", function(done) {
    try {
      rarity.carryAndSlice([], 4);
    }
    catch(e) {
      e.toString().should.containDeep('must be a function');
      return done();
    }

    done(new Error("Should not be working"));
  });

  it("should carry arguments, and slice default arguments", function(done) {
    var original = function(cb) {
      cb('error', EXPECTED_RESULT, "nope");
    };

    original(rarity.carryAndSlice(['carry1'], 3, function(c1, c2, c3) {
      c1.should.eql('error');
      c2.should.eql('carry1');
      c3.should.eql(EXPECTED_RESULT);
      arguments.should.have.lengthOf(3);
      done();
    }));
  });

  it("should carry arguments, and slice in carried values", function(done) {
    var original = function(cb) {
      cb('error', EXPECTED_RESULT);
    };

    original(rarity.carryAndSlice(['carry1', 'carry2'], 2, function(c1, c2) {
      c1.should.eql('error');
      c2.should.eql('carry1');
      arguments.should.have.lengthOf(2);
      done();
    }));
  });
});
