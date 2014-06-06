rarity
======
[![Build Status](https://travis-ci.org/Neamar/rarity.png?branch=master)](https://travis-ci.org/Neamar/rarity)
[![Dependency Status](https://gemnasium.com/Neamar/rarity.png)](https://gemnasium.com/Neamar/rarity)
[![Coverage Status](https://coveralls.io/repos/Neamar/rarity/badge.png?branch=master)](https://coveralls.io/r/Neamar/rarity?branch=master)
[![NPM version](https://badge.fury.io/js/rarity.png)](http://badge.fury.io/js/rarity)

Sometime, you need to control the arity of your callbacks.

## 1 - Slice arguments
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
someShittyFunction(rarity(1, cb));
```

### Documentation
`rarity(maxNumberOfArgumentsToForward, cb)`

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
        // Slice after the two first arguments
        someShittyFunction(rarity(2, cb));
    },
    function handleResults(result, cb) {
        stuff();
        cb();
    }
], process.exit);
```

## 2 - Pad arguments
When using some shitty-backported lib, for instance `factory-lady`, you'll need to pad your queries with a first additional argument representing a fake error, making it compatible with all the node ecosystem.

The following code:
```js
someShittyFunction(function(result) {
    cb(null, result);
});
```

Now becomes:
```js
// Wraps cb with a new function, sending null as the first argument.
someShittyFunction(rarity.pad([null], cb));
```

### Documentation
`rarity.pad(arrayOfArgumentsToPad, cb)`

## 3 - Carry arguments
Here is some cumbersome code:

```js
function(cb) {
    var aVar = 1;
    someFunction(function(err, result) {
        cb(err, aVar, result);
    })
}
```

This is shitty to write. Here is some improved version:

```js
function(cb) {
    var aVar = 1;
    someFunction(rarity.carry([aVar], cb));
}
```

Arguments passed in the array will be carried between the first argument of the original callback (the error) and all the others.

### Documentation
`rarity.carry(arrayOfArgumentsToAddBetweenErrorAndOriginal, cb)`

## Installation
```sh
npm install rarity
```

You're done. Now go write some shitty code.

## Why the shitty name?
`rarity` is short for `reduce arity`.
Also, arity was already created on npm.
