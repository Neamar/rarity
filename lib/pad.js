"use strict";
var util = require('util');
var isFunction = require('./helpers/is-function');


module.exports = function rarityPad(arg, cb) {
  if(!isFunction(cb)) {
    throw new Error("Invalid rarity call (second parameter must be a function)");
  }

  if(util.isArray(arg)) {
    // rarity([null, 1], cb);
    // => cb(null, 1, ...arguments)
    var defaultArgs = arg;
    return function() {
      var args = Array.prototype.slice.call(arguments);
      cb.apply(this, defaultArgs.concat(args));
    };
  }
  else {
    // yay, yay, throwing is evil.
    // But this can only happen with invalid coding, not at runtime call.
    throw new Error("Invalid rarity call (first parameter must be an array");
  }
};
