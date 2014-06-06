"use strict";

var should = require('should');
var rarity = require('../lib/');

describe('rarity.carry()', function() {
  var EXPECTED_RESULT = "expectedResult";

  var noop = function() {};

  it("should fail with non array", function(done) {
    try {
      rarity.carry("nope", noop);
    }
    catch(e) {
      e.toString().should.containDeep('must be an array');
      return done();
    }

    done(new Error("Should not be working"));
  });

  it("should fail without function as second argument", function(done) {
    try {
      rarity.carry([], 4);
    }
    catch(e) {
      e.toString().should.containDeep('must be a function');
      return done();
    }

    done(new Error("Should not be working"));
  });

  it("should carry arguments", function(done) {
    var original = function(cb) {
      cb('error', EXPECTED_RESULT);
    };

    original(rarity.carry(['carry'], function(c1, c2, c3) {
      c1.should.eql('error');
      c2.should.eql('carry');
      c3.should.eql(EXPECTED_RESULT);
      arguments.should.have.lengthOf(3);
      done();
    }));
  });

  it("should carry arguments when cb only send err", function(done) {
    var original = function(cb) {
      cb('error');
    };

    original(rarity.carry(['carry'], function(c1, c2) {
      c1.should.eql('error');
      c2.should.eql('carry');
      arguments.should.have.lengthOf(2);

      done();
    }));
  });

  it("should carry arguments when cb don't send anything", function(done) {
    var original = function(cb) {
      cb();
    };

    original(rarity.carry(['carry'], function(c1, c2) {
      should(c1).eql(null);
      c2.should.eql('carry');
      arguments.should.have.lengthOf(2);

      done();
    }));
  });
});
