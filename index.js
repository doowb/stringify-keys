/*!
 * stringify-keys <https://github.com/doowb/stringify-keys>
 *
 * Copyright (c) 2014-present, Brian Woodward.
 * Released under the MIT License.
 */

'use strict';

/**
 * Stringify the nested keys of `object` into dot-notation object paths.
 *
 * @param  {Object} `object` The object to stringify
 * @param  {Object|String} `options` Options with `separator` to use. Default is `.`.
 * @return {Array} Returns an array of object paths.
 */

module.exports = function(target, options) {
  if (typeof options === 'string') {
    options = { separator: options };
  }

  let opts = Object.assign({ separator: '.' }, options);
  let sep = opts.separator;
  let values = {};
  let keys = [];

  function stringify(obj, prev) {
    for (let key of Object.keys(obj)) {
      let val = obj[key];
      key = (prev ? prev + sep : '') + esc(key, opts);

      if (Array.isArray(val) || val !== null && typeof val === 'object') {
        stringify(val, key);
      } else {
        keys.push(key);
        values[key] = val;
      }
    }
  }

  stringify(target);
  return opts.values ? values : keys;
};

function esc(key, options) {
  if (typeof options.escape === 'function') {
    return options.escape(key, options);
  }
  return key.split(options.separator).join('\\' + options.separator);
}
