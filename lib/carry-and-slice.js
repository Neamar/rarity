"use strict";

var rarity = require('./');

module.exports = function rarityCarryAndSlice(defaultArgs, qty, cb) {
  return rarity.carry(defaultArgs, rarity.slice(qty, cb));
};
