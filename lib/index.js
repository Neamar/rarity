"use strict";
var isFunction = require('./helpers/is-function');

module.exports = function rarity(arg, cb) {
  if(!isFunction(cb)) {
    // yay, yay, throwing is evil.
    // But this can only happen with invalid coding, not at runtime call.
    throw new Error("Invalid rarity call (second parameter must be a function)");
  }

  if(!isNaN(arg) && arg > 0 && Math.round(arg) === arg) {
    // rarity(1, cb);
    // => cb(arguments[0])
    return function() {
      var args = Array.prototype.slice.call(arguments, 0, Math.round(arg));
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
