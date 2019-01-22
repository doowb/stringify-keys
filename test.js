'use strict';

require('mocha');
const assert = require('assert');
const stringify = require('./');

describe('stringify-keys', () => {
  it('should return an array for a simple object', () => {
    let obj = { a: 'A', b: 'B', c: 'C' };
    assert.deepEqual(stringify(obj), ['a', 'b', 'c']);
  });

  it('should return an array for a single level object', () => {
    let obj = { a: 'A', b: { c: 'C' } };
    assert.deepEqual(stringify(obj), ['a', 'b.c']);
  });

  it('should return an array for a multi level object', () => {
    let obj = { a: 'A', b: { c: 'C' }, d: { e: { f: { g: 'G', h: 'H' } } } };
    assert.deepEqual(stringify(obj), ['a', 'b.c', 'd.e.f.g', 'd.e.f.h']);
  });

  it('should return an array for a multi level, multi key object', () => {
    let obj = { a: 'A', b: { c: 'C', c2: { d: 'D' }, c3: { d: 'D' } }, d: { e: { f: { g: 'G', h: 'H' } } } };
    assert.deepEqual(stringify(obj), ['a', 'b.c', 'b.c2.d', 'b.c3.d', 'd.e.f.g', 'd.e.f.h']);
  });

  it('should return an array for a nested object with custom seperator', () => {
    let obj = { a: 'A', b: { c: 'C', c2: { d: 'D' }, c3: { d: 'D' } }, d: { e: { f: { g: 'G', h: 'H' } } } };

    assert.deepEqual(stringify(obj, '-'), ['a', 'b-c', 'b-c2-d', 'b-c3-d', 'd-e-f-g', 'd-e-f-h']);
  });

  it('should return an array for a simple object that contains an array', () => {
    let obj = { a: 'A', b: 'B', c: 'C', d: [{ a: 123, b: 123, c: 123 }] };
    assert.deepEqual(stringify(obj), ['a', 'b', 'c', 'd.0.a', 'd.0.b', 'd.0.c']);
  });
});

describe('escaped results', () => {
  it('should return an array for a simple object with keys containing the seperator', () => {
    let obj = { 'A.a': 'A', 'B.b': 'B', 'C.c': 'c' };
    assert.deepEqual(stringify(obj), ['A\\.a', 'B\\.b', 'C\\.c']);
  });

  it('should return an array for a single level object with keys containing the seperator', () => {
    let obj = { 'A.a': 'A', 'B.b': { 'C.c': 'C' } };
    assert.deepEqual(stringify(obj), ['A\\.a', 'B\\.b.C\\.c']);
  });

  it('should return an array for a multi level object with keys containing the seperator', () => {
    let obj = { 'A.a': 'A', 'B.b': { 'C.c': 'C' }, 'D.d': { 'E.e': { 'F.f': { 'G.g': 'G', 'H.h': 'H' } } } };
    assert.deepEqual(stringify(obj), ['A\\.a', 'B\\.b.C\\.c', 'D\\.d.E\\.e.F\\.f.G\\.g', 'D\\.d.E\\.e.F\\.f.H\\.h']);
  });

  it('should return an array for a multi level, multi key object with keys containing the seperator', () => {
    let obj = {
      'A.a': 'A',
      'B.b': { 'C.c': 'C', 'C2.c2': { 'D.d': 'D' }, 'C3.c3': { 'D.d': 'D' } },
      'D.d': { 'E.e': { 'F.f': { 'G.g': 'G', 'H.h': 'H' } } }
    };
    assert.deepEqual(stringify(obj), [
      'A\\.a',
      'B\\.b.C\\.c',
      'B\\.b.C2\\.c2.D\\.d',
      'B\\.b.C3\\.c3.D\\.d',
      'D\\.d.E\\.e.F\\.f.G\\.g',
      'D\\.d.E\\.e.F\\.f.H\\.h'
    ]);
  });

  it('should return an array for a nested object with custom seperator with keys containing the seperator', () => {
    let obj = {
      'A-a': 'A',
      'B-b': { 'C-c': 'C', 'C2-c2': { 'D-d': 'D' }, 'C3-c3': { 'D-d': 'D' } },
      'D-d': { 'E-e': { 'F-f': { 'G-g': 'G', 'H-h': 'H' } } }
    };

    assert.deepEqual(stringify(obj, '-'), [
      'A\\-a',
      'B\\-b-C\\-c',
      'B\\-b-C2\\-c2-D\\-d',
      'B\\-b-C3\\-c3-D\\-d',
      'D\\-d-E\\-e-F\\-f-G\\-g',
      'D\\-d-E\\-e-F\\-f-H\\-h'
    ]);
  });
});
