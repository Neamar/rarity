"use strict";

require('should');
var rarity = require('../');

describe('rarity()', function() {
  var noop = function() {};

  it("should take function as second argument", function(done) {
    try {
      rarity(4, 4);
    }
    catch(e) {
      e.toString().should.containDeep('must be a function');
      return done();
    }

    done(new Error("Should not be working"));
  });

  it("should fail on non integer for first argument", function(done) {
    try {
      rarity("nope", noop);
    }
    catch(e) {
      e.toString().should.containDeep('must be a positive integer');
      return done();
    }

    done(new Error("Should not be working"));
  });
});
