/*!
 * stringify-keys <https://github.com/doowb/stringify-keys>
 *
 * Copyright (c) 2014-2018, Brian Woodward.
 * Released under the MIT License.
 */

'use strict';

var typeOf = require('kind-of');

/**
 * Stringify the nested keys of `object` into dot-notation
 * object paths.
 *
 * @param  {Object} `object` The object to stringify
 * @param  {Object|String} `options` Options with `separator` to use. Default is `.`.
 * @return {Array} Returns an array of object paths.
 */

module.exports = function(target, options) {
  if (typeof options === 'string') {
    options = { separator: options };
  }

  var opts = Object.assign({ separator: '.' }, options);
  var sep = opts.separator;
  var acc = [];

  function stringify(obj, prev) {
    var keys = Object.keys(obj);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var val = obj[key];
      var type = typeOf(val);

      key = (prev ? prev + sep : '') + escape(key, opts);

      if (type === 'object' || type === 'array') {
        stringify(val, key);
      }
      acc.push(key);
    }
  }

  stringify(target);
  return acc;
};

function escape(key, options) {
  if (typeof options.escape === 'function') {
    return options.escape(key, options);
  }
  return key.split(options.separator).join('\\' + options.separator);
}
