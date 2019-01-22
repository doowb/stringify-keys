const stringify = require('./');
const setValue = require('set-value');

const unstringify = obj => {
  let result = {};
  for (let key of Object.keys(obj)) {
    setValue(result, key, obj[key]);
  }
  let walk = (target, parent) => {
    if (typeOf(target) !== 'object') {
      return target;
    }
    let keys = Object.keys(target);
    if (keys.every((k, i) => +k === i)) {
      return Object.values(target).map(v => walk(v));
    }
    for (let key of keys) {
      target[key] = walk(target[key]);
    }
    return target;
  };
  return walk(result);
};

function typeOf(value) {
  if (value === null) return 'null';
  if (value === void 0) return 'undefined';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

let obj1 = { a: 'a', b: { c: { d: { e: 'f' } } } };
console.log(stringify(obj1));
//=> [ 'a', 'b.c.d.e' ]
console.log(stringify(obj1, { values: true }));
//=> { a: 'a', 'b.c.d.e': 'f' }
console.log(unstringify(stringify(obj1, { values: true })));

let obj2 = { 'a.b.c': { d: 'e' } };
console.log(stringify(obj2));
//=> [ 'a\\.b\\.c.d' ]
console.log(stringify(obj2, { values: true }));
//=> { 'a\\.b\\.c.d': 'e' }
console.log(unstringify(stringify(obj2, { values: true })));

let obj3 = { 'a.b.c': { d: 'e' } };
console.log(stringify(obj3, { separator: '/' }));
//=>  [ 'a.b.c/d' ]
console.log(stringify(obj3, { separator: '/', values: true }));
//=>  { 'a.b.c/d': 'e' }

let obj4 = { 'a.b.c': { d: 'e' } };
console.log(stringify(obj4, { escape: str => str.split('.').join('/') }));
//=>  [ 'a/b/c.d' ]
console.log(stringify(obj4, { escape: str => str.split('.').join('/'), values: true }));
//=>  { 'a/b/c.d': 'e' }

let obj5 = { a: 'a', b: [{ c: { d: 'e' } }, { f: { g: 'h' } }] };
console.log(stringify(obj5));
//=> [ 'a', 'b.0.c.d', 'b.1.f.g' ]
console.log(stringify(obj5, { values: true }));
//=> { a: 'a', 'b.0.c.d': 'e', 'b.1.f.g': 'h' }
console.log(unstringify(stringify(obj5, { values: true })));
//=> { a: 'a', b: [{ c: { d: 'e' } }, { f: { g: 'h' } }] };
