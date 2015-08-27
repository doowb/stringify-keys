/*!
 * stringify-keys <https://github.com/doowb/stringify-keys>
 *
 * Copyright (c) 2014-2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var isObject = require('is-plain-object');

module.exports = function stringifyKeys(obj, sep) {
  return stringify(obj, sep || '.');
};

/**
 * Stringify the nested keys of `object` into dot-notation
 * object paths.
 *
 * @param  {Object} `object` The object to recurse
 * @param  {String} `separator` Separator to use. Default is `.`
 * @return {Array} Returns an array of object paths.
 */

function stringify(obj, sep, res, prev) {
  res = res || [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var val = obj[key];
      if (prev) key = (prev + sep + escape(key, sep));
      if (!prev) key = escape(key, sep);

      if(isObject(val)) {
        stringify(val, sep, res, key);
      }
      res.push(key);
    }
  }
  return res;
}

function escape(key, sep) {
  return key.split(sep).join('\\' + sep);
}
