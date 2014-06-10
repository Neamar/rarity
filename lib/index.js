"use strict";
var isFunction = require('./helpers/is-function');


// rarity(1, cb);
// => cb(arguments[0])
module.exports = function rarity(qty, cb) {
  if(!isFunction(cb)) {
    // yay, yay, throwing is evil.
    // But this can only happen with invalid coding, not at runtime call.
    throw new Error("Invalid rarity call (second parameter must be a function)");
  }

  if(!isNaN(qty) && qty > 0 && Math.round(qty) === qty) {
    return function() {
      var args = Array.prototype.slice.call(arguments, 0, qty);
      cb.apply(this, args);
    };
  }
  else {
    // yay, yay, throwing is evil.
    // But this can only happen with invalid coding, not at runtime call.
    throw new Error("Invalid rarity call (first parameter must be a positive integer)");
  }
};

module.exports.pad = require('./pad');
module.exports.carry = require('./carry');
module.exports.slice = module.exports;
