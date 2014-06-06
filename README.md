rarity
======

Sometime, you need to control the arity of your callbacks to avoid sending more parameters than you strictly need.

## Slice arguments
Did you ever find yourself writing code such as this one:

```js
someShittyFunction(function(err, uselessArgument, anotherUselessArgument) {
    cb(err);
});
```

To minimize the quantity of arguments sent to your next function?

`rarity` allow you to easily control this behavior:

```js
// Generate a wrapper function around cb, only forwarding the first parameter.
someShittyFunction(rarity(1, cb));
});
```

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
