"use strict";
var util = require('util');


module.exports = function rarity(arg, cb) {
  if(!(cb && cb.constructor && cb.call && cb.apply)) {
    // yay, yay, throwing is evil.
    // But this can only happen with invalid coding, not at runtime call.
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
  else if(!isNaN(arg)) {
    // rarity(1, cb);
    // => cb(arguments[0])
    return function() {
      var args = Array.prototype.slice.call(arguments, 0, arg);
      cb.apply(this, args);
    };
  }
  else {
    // yay, yay, throwing is evil.
    // But this can only happen with invalid coding, not at runtime call.
    throw new Error("Invalid rarity call (first parameter must be an array or an integer)");
  }
};
