var stringify = require('./');

var obj = { a: 'a', b: { c: { d: { e: 'f' } } } };
console.log(stringify(obj));
//=> [ 'a', 'b.c.d.e', 'b.c.d', 'b.c', 'b' ]

var obj = { 'a.b.c': { d: 'e' } };
console.log(stringify(obj));
//=> [ 'a\\.b\\.c.d', 'a\\.b\\.c' ]

var obj = { 'a.b.c': { d: 'e' } };
console.log(stringify(obj, { separator: '/' }));
//=>  [ 'a.b.c/d', 'a.b.c' ]

var obj = { 'a.b.c': { d: 'e' } };
console.log(stringify(obj, { escape: str => str.split('.').join('/') }));
//=>  [ 'a/b/c.d', 'a/b/c' ]

var obj = { a: 'a', b: [{ c: { d: 'e' } }, { f: { g: 'h' } }] };
console.log(stringify(obj));
//=> [ 'a', 'b.0.c.d', 'b.0.c', 'b.0', 'b.1.f.g', 'b.1.f', 'b.1', 'b' ]
