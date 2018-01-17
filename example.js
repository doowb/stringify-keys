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
