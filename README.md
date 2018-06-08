rarity
======
[![Build Status](https://travis-ci.org/Neamar/rarity.png?branch=master)](https://travis-ci.org/Neamar/rarity)
[![Coverage Status](https://coveralls.io/repos/Neamar/rarity/badge.png?branch=master)](https://coveralls.io/r/Neamar/rarity?branch=master)
[![NPM version](https://badge.fury.io/js/rarity.png)](http://badge.fury.io/js/rarity)

Continuation tools for callbacks arity.

## 1 - Carry arguments
Here is some shitty code:

```js
function(cb) {
    var aVar = 1;
    someFunction(function(err, result) {
        // Mix results from previous scope with new results
        cb(err, aVar, result);
    });
}
```

Here is some improved version, using rarity:

```js
function(cb) {
    var aVar = 1;
    someFunction(rarity.carry([aVar], cb));
}
```

Arguments passed in the array will be carried between the first argument of the original callback (the error, in node convention) and all the others.

### Documentation
`rarity.carry(arrayOfArgumentsToAddBetweenErrorAndOriginal, cb)`

> If you pass something else than an array, it will be automatically wrapped in an array: `rarity.carry(value, cb)` => `rarity.carry([value], cb)` => `cb(err, value, ...arguments)`

## 2 - Slice arguments
Did you ever find yourself writing shitty code such as this one:

```js
someShittyFunction(function(err, uselessArgument, anotherUselessArgument) {
    cb(err);
});
```

To minimize the quantity of arguments sent over to your next function (`async.waterfall` anyone?)

`rarity` allow you to easily control this behavior:

```js
// Generate a wrapper function around cb, only forwarding the first parameter.
someShittyFunction(rarity.slice(1, cb));
```

### Documentation
`rarity.slice(maxNumberOfArgumentsToForward, cb)`

#### Without rarity
```js
var async = require('async');

async.waterfall([
    function callShittyLib(cb) {
        someShittyFunction(cb);
    },
    function handleResults(result, uselessArgument, anotherUselessArgument, cb) {
        // When writing your function, you need to check the documentation regarding the number of arguments you'll receive.
        // Boring.
        stuff();
        cb();
    }
], process.exit);
```

#### With rarity
```js
var async = require('async');
var rarity = require('rarity');

async.waterfall([
    function callShittyLib(cb) {
        // Slice after the first two arguments (err and results), discard all others
        someShittyFunction(rarity.slice(2, cb));
    },
    function handleResults(result, cb) {
        // We only get result, not the other parameters (err was handled by the `async` lib)
        stuff();
        cb();
    }
], process.exit);
```

## 3 - Pad arguments
When using some shitty-backported lib, for instance `factory-lady`, you'll need to pad your queries with a first additional argument representing a fake error, making it compatible with all the node ecosystem.

The following code:
```js
someShittyFunction(function(result) {
    cb(null, result);
});
```

Will become, using rarity:
```js
// Wraps cb with a new function, sending null as the first argument.
someShittyFunction(rarity.pad([null], cb));
```

### Documentation
`rarity.pad(arrayOfArgumentsToPad, cb)`


## 4 - Carry and slice
Specific use case, combining `rarity.carry` and `rarity.slice`:

The following code:
```js
function(cb) {
    var aVar = 1;
    someFunction(function(err, result, useless) {
        cb(err, aVar, result);
    });
}
```

Will become, using rarity:
```js
function(cb) {
    var aVar = 1;
    someFunction(rarity.carryAndSlice([aVar], 3, cb));
}
```

### Documentation
`rarity.carryAndSlice(arrayOfArgumentsToAddBetweenErrorAndOriginal, maxNumberOfArgumentsToForward, cb)`


## Installation
```sh
npm install rarity
```

You're done. Now go write some shitty code.

## Why the shitty name?
`rarity` is short for `reduce arity`.
Also, arity was already created on npm.
