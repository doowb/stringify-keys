# stringify-keys [![NPM version](https://badge.fury.io/js/stringify-keys.svg)](http://badge.fury.io/js/stringify-keys)  [![Build Status](https://travis-ci.org/doowb/stringify-keys.svg)](https://travis-ci.org/doowb/stringify-keys) 

> Build an array of key paths from an object.

## Install with [npm](npmjs.org)

```bash
npm i stringify-keys --save
```

## Running tests
Install dev dependencies.

```bash
npm i -d && npm test
```

## Usage

```js
var stringify = require('stringify-keys');
```

## API
### [stringify](./index.js#L34)

Build an array of key paths from an object.

* `base` **{String}**: Base to add to the path (used in recursion)    
* `obj` **{Object}**: Object to use    
* `sep` **{String}**: Use a different seperator than '.'    
* `returns` **{Array}**: Array of key paths  

```js
var stringify = require('stringify-keys');
var obj = {
  a: 'A',
  b: {
    c: 'C'
  }
};
var keys = stringify(obj);
//=> ['a', 'b', 'b.c']
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/doowb/stringify-keys/issues)

## Author

**Brian Woodward**
 
+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/doowb) 

## License
Copyright (c) 2015 Brian Woodward  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on March 21, 2015._