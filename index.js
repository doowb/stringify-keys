/*!
 * stringify-keys <https://github.com/doowb/stringify-keys>
 *
 * Copyright (c) 2014 Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = stringify;

/**
 * Build an array of key paths from an object.
 *
 * ```js
 * var stringify = require('stringify-keys');
 * var obj = {
 *   a: 'A',
 *   b: {
 *     c: 'C'
 *   }
 * };
 * var keys = stringify(obj);
 * //=> ['a', 'b', 'b.c']
 * ```
 *
 * @param  {String} `base` Base to add to the path (used in recursion)
 * @param  {Object} `obj`  Object to use
 * @param  {String} `sep`  Use a different seperator than '.'
 * @return {Array} Array of key paths
 * @api public
 */

function stringify(base, obj, sep) {
  if (typeof base === 'object') {
    sep = obj;
    obj = base;
    base = '';
  }
  sep = sep || '.';
  var results = [];
  var keys = Object.keys(obj);
  var len = keys.length;
  var i = 0;
  while (len--) {
    var key = keys[i++];
    results.push((base.length === 0 ? key : base + sep + key));
    if (typeof obj[key] === 'object') {
      results = results.concat(stringify((base.length === 0 ? key : base + sep + key), obj[key], sep));
    }
  }
  return results;
}
