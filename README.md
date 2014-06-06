rarity
======

Sometime, you need to control the arity of your callbacks.

## 1 - Slice arguments
Did you ever find yourself writing shitty code such as this one:

```js
someShittyFunction(function(err, uselessArgument, anotherUselessArgument) {
    cb(err);
});
```

To minimize the quantity of arguments sent over to your next function?

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
someShittyFunction(rarity([null], cb));
```

### Documentation
`rarity(arrayOfArgumentsToPad, cb)`

## Installation
```sh
npm install rarity
```

You're done. Now go write some shitty code.
