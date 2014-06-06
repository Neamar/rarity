"use strict";
var util = require('util');
var isFunction = require('./helpers/is-function');


// rarity.carry([1, 2], cb);
// => cb(err, 1, 2, ...arguments)
module.exports = function rarityCarry(defaultArgs, cb) {
  if(!isFunction(cb)) {
    throw new Error("Invalid rarity call (second parameter must be a function)");
  }

  if(util.isArray(defaultArgs)) {
    return function() {
      var args = Array.prototype.slice.call(arguments);
      var err = args.shift() || null;
      cb.apply(this, [err].concat(defaultArgs, args));
    };
  }
  else {
    // yay, yay, throwing is evil.
    // But this can only happen with invalid coding, not at runtime call.
    throw new Error("Invalid rarity.carry call (first parameter must be an array");
  }
};
